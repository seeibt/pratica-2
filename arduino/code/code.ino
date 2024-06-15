#include <ESP8266WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char* ssid = "SEIBT";
const char* password = "050420003";

const char* serverAddress = "https://pratica-2.vercel.app/api/logs";

OneWire oneWire(4);
DallasTemperature sensors(&oneWire);
DeviceAddress sensorAddress;

unsigned long previousMillis = 0;
unsigned long previousMillisAerador = 0;
unsigned long previousMillisTratador = 0;
const long intervalAerador = 3600000;   // Intervalo de 1 hora para horarioAerador (em milissegundos)
const long intervalTratador = 7200000;  // Intervalo de 2 horas para horarioTratador (em milissegundos)

void setup() {
  Serial.begin(9600);
  
  sensors.begin();

  pinMode(4, INPUT_PULLUP);

  Serial.println("Buscando dispositivos...");
  if (!sensors.getAddress(sensorAddress, 0)) {
    Serial.println("Dispositivo não encontrado!");
  } else {
    Serial.println("Dispositivo encontrado!");
  }
  
  Serial.print("Conectando-se a ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Conectado à rede Wi-Fi!");

  // Inicializa o tempo anterior para Aerador, Tratador e para o envio da requisição
  previousMillis = millis();
  previousMillisAerador = millis();
  previousMillisTratador = millis();
}

void loop() {
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
 
  if (tempC != DEVICE_DISCONNECTED_C) {
    Serial.print("Temperatura: ");
    Serial.print(tempC);
    Serial.println(" °C");

    // Verifica o tempo decorrido para horarioAerador (1 hora)
    unsigned long currentMillis = millis();
    if (currentMillis - previousMillisAerador >= intervalAerador) {
      previousMillisAerador = currentMillis;  // Atualiza o tempo anterior
      enviarDados(tempC, 1, 0); // Envia para horarioAerador com valor 1 e horarioTratador com valor 0
    }

    // Verifica o tempo decorrido para horarioTratador (2 horas)
    if (currentMillis - previousMillisTratador >= intervalTratador) {
      previousMillisTratador = currentMillis;  // Atualiza o tempo anterior
      enviarDados(tempC, 0, 1); // Envia para horarioAerador com valor 0 e horarioTratador com valor 1
    }
    
    // Verifica o tempo decorrido para envio da requisição (1 minuto)
    if (currentMillis - previousMillis >= 60000) {
      previousMillis = currentMillis;  // Atualiza o tempo anterior
      enviarDados(tempC, 0, 0); // Envia para horarioAerador com valor 0 e horarioTratador com valor 0
    }
    
  } else {
    Serial.println("Falha ao ler a temperatura!");
  }
  
  delay(1000);  // Aguarda 1 segundo antes de verificar novamente
}

void enviarDados(float tempC, int horarioAerador, int horarioTratador) {
  // Construir JSON
  String json = "{\"horarioTemperatura\":1,\"grausTemp\":\"" + String(tempC) + "\",\"horarioAerador\":" + String(horarioAerador) + ",\"horarioTratador\":" + String(horarioTratador) + "}";

  // Iniciar conexão com o servidor
  WiFiClientSecure client;
  HTTPClient http;

  client.setInsecure();
  
  http.begin(client, serverAddress); // Usar a variável serverAddress
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(json);

  if (httpResponseCode > 0) {
    Serial.print("Resposta HTTP code: ");
    Serial.println(httpResponseCode);

    String response = http.getString();
    Serial.println(response);
  } else {
    Serial.print("Erro na requisição HTTP: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
