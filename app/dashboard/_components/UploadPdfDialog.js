"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

function UploadPdfDialog({ maxFiles, fileCount }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const AddFileEntryToDb = useMutation(api.fileStorage.AddFileEntryToDb);
  const embeddingDocument = useAction(api.myAction.ingest);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    if (!file || !user?.primaryEmailAddress?.emailAddress) return;

    setLoading(true);
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': file?.type },
        body: file,
      });
      const { storageId } = await result.json();
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId: storageId });
      await AddFileEntryToDb({
        fileId: fileId,
        storageId: storageId,
        fileName: fileName || 'Untitled File',
        fileUrl: fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      const ApiResp = await axios.get('/api/pdf-loader?pdfUrl=' + encodeURIComponent(fileUrl));
      await embeddingDocument({
        splitText: ApiResp.data.result,
        fileId: fileId,
      });
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} disabled={fileCount >= maxFiles}>+ Upload PDF File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Pdf File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Select a file to Upload</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => OnFileSelect(event)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">File Name *</label>
                <input
                  placeholder="File Name"
                  onChange={(e) => setFileName(e.target.value)}
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
          <Button onClick={OnUpload} disabled={loading || fileCount >= maxFiles || !file}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              'Upload'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
