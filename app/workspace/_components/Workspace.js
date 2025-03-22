"use client"
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function WorkspaceHeader() {
  return (
    <div className='p-4 flex justify-between shadow-md'>
        <Image src={'/logo.svg'} alt='logo' width={140} height={100}/>
        <div className= 'flex gap-2 items-center'>
          <Button>Save</Button>
       
        <UserButton/>
      </div>
    </div>
  )
}

