import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='absolute flex justify-between w-[100vw] text-white p-[30px]'>
            <Link href="/" className='text-[24px] font-bold cursor-pointer'>CSA</Link>
            <nav>
                <ul className='flex gap-[10px]'>
                    <Link href='/login' className='cursor-pointer hover:text-[#4891f3]'>
                        Login
                    </Link>
                    <Link href='/signup' className='cursor-pointer hover:text-[#4891f3]'>
                        Sign up
                    </Link>
                </ul>
            </nav>
        </header>
    )
}
