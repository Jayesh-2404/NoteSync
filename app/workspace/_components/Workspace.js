"use client"
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
export default function WorkspaceHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NoteSync</span>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Button>Save</Button>
          <UserButton />
        </div>
      </div>
    </header>
  )
}

