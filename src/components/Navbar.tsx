"use client"

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { useRouter } from 'next/navigation';
import { FaHome } from "react-icons/fa";
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  const {data: session} = useSession();

  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <div>
          <Link href='/'>
            <FaHome />
          </Link>
        </div>
        <div>
          {session ? (
            <Button className={buttonVariants()} onClick={() => signOut()}>
              Sair
            </Button>
          ) : (
            <Button className={buttonVariants()} onClick={() => router.push("/auth/sign-in")}>
              Entrar
            </Button>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
