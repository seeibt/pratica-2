'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';

const FormSchema = z
  .object({
    username: z.string().min(1, 'Usuário é necessário').max(100),
    email: z.string().min(1, 'E-mail é necessário').email('E-mail inválido'),
    password: z
      .string()
      .min(1, 'Senha é necessária')
      .min(8, 'A senha precisa de no mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é necessária'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
    });

    if(response.ok) {
      router.push('/sign-in');
    } else {
      const data = await response.json();
      alert(data.message);
    }
    

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input placeholder='eduardos' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email@exemplo.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Digite sua senha'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirme sua senha'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
          Criar conta
        </Button>
      </form>
      <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        ou
      </div>
      <GoogleSignInButton>Criar conta com o Google</GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Se você já tem uma conta, por favor{' '}
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          cadastre-se
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
