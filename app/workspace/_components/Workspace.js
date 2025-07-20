"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function WorkspaceHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">

      <div className="container relative flex h-16 items-center justify-end">


        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NoteSync</span>
          </Link>
        </div>
        <div className="flex items-center">
          <UserButton />
        </div>

      </div>
    </header>
  )
}
