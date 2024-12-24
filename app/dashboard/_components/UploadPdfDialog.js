"use client"
import React, { Children, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { DialogClose } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2 } from 'lucide-react'
  
function UploadPdfDialog({children}) {
    const generateUploadUrl=useMutation(api.fileStorage.generateUploadUrl);
    const [file , setFile] = useState();

    const [loading , setLoading] = useState(false);
    const OnFileSelect=(event)=>{  
        setFile(event.target.files[0]);
    }

    const OnUpload=async()=>{
        setLoading(true);

         // Step 1: Get a short-lived upload URL
         const postUrl = await generateUploadUrl();
         // Step 2: POST the file to the URL
         const result = await fetch(postUrl, {
             method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
        });
         const { storageId } = await result.json();
        console.log('StorageId', storageId);


        setLoading(false);

    }



  return (
    <Dialog>
      <DialogTrigger asChild>
          {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Pdf File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className='mt-4'>
                <p className="text-sm text-muted-foreground mb-2">Select a file to Upload</p>
                <input 
                  type="file" 
                  accept='application/pdf' 
                  onChange={(event)=>OnFileSelect(event)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className='mt-4 space-y-2'>
                <label className="text-sm font-medium">File Name *</label>
                <input 
                  placeholder="File Name"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload} >
            {loading?
                <Loader2 className='animate-spin'/>:'Upload'
            }
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadPdfDialog