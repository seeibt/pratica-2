

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

const Admin =  async () => {
  const session = await getServerSession(authOptions)
  const ultimaTemperatura = 25;

  if(!session?.user){
    return ( 
      <>
        <h2>Acesso Negado, você precisa estar logado para acessar essa página!</h2>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Voltar
        </Link>
      </>
    )
  }

  return  (
    <>
      <div className='w-full text-center text-lg'>
        <h1>Bem vindo de volta, <b>{session?.user.username}!</b></h1>
        <h2>A temperatura da água no momento está em {ultimaTemperatura} ºC</h2>
        <Link href="/dashboard/logs" className="text-blue-500 hover:underline">
          Verificar LOGs de Funcionamento
        </Link>
      </div>
    </>
  ) 
}





export default Admin