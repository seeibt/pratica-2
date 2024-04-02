"use client"

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar = () => {
  const router = useRouter();
  return (
    <div className='bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <div>
          <Link href='/'>
            <HandMetal />
          </Link>
        </div>
        <div>
          <Button className={buttonVariants()} onClick={() => router.push("/auth/sign-in")}>
            Sign In
          </Button>
          <Button className={buttonVariants()} onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
