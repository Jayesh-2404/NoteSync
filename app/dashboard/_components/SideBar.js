"use client"
import { Button } from '@/components/ui/button'
import { Progress } from "@/components/ui/progress"
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { FileText, Layout, Shield } from 'lucide-react'
import Link from 'next/link'
import UploadPdfDialog from './UploadPdfDialog'

function SideBar() {
    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    console.log("User Email:", userEmail);

    const fileList = useQuery(api.fileStorage.GetUserFiles, {
      userEmail: userEmail
    });

    if (!user) {
        return <div>Loading...</div>;
    }

    const maxFiles = 5;
    const fileCount = fileList?.length || 0;
    return (
        <div className='shadow-md h-screen p-4 md:p-7 relative'>
            <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm mb-4">
                <Link href="/" className="flex items-center gap-2 h-14 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                        <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold text-primary">NoteSync</span>
                </Link>
            </header>

            <div className='mt-5'>
                <UploadPdfDialog maxFiles={maxFiles} fileCount={fileCount}>
                    <Button className='w-full' disabled={fileCount >= maxFiles}>+ Upload PDF</Button>
                </UploadPdfDialog>

                <div className='flex flex-col gap-2 mt-5'>
                    <div className='flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg cursor-pointer'>
                        <Layout/>
                        <h2 className='text-sm'>Workspace</h2>
                    </div>
                    <div className='flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg cursor-pointer'>
                        <Shield/>
                        <h2 className='text-sm'>Upgrade</h2>
                    </div>
                </div>

            </div>
            <div className='absolute bottom-10  w-[80%]'>
                <Progress value={(fileCount / maxFiles) * 100} />
                <p className='text-sm mt-1'>{fileCount} / {maxFiles}</p>
                <p className='text-sm text-gray-400 mt-2'>Upgrade to Upload more PDFs</p>
            </div>
        </div>
    )
}

export default SideBar
