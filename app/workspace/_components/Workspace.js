"use client"
import { UserButton } from '@clerk/nextjs'
import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Check, Copy, FileText } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function WorkspaceHeader() {
  const { fileid } = useParams();
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (!fileid || typeof window === 'undefined') return '';
    return `${window.location.origin}/workspace/${fileid}`;
  }, [fileid]);

  const copyShareLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error('Failed to copy share link:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-3xl font-semibold tracking-tight">NoteSync</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyShareLink} className="gap-2 text-sm">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Share Link'}
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  )
}
