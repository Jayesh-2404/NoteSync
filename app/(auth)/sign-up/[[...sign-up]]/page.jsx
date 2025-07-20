import { SignUp } from '@clerk/nextjs';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-primary">NoteSync</span>
          </Link>
          <p className="text-muted-foreground">Create an account to start syncing your notes.</p>
        </div>
        <div className="bg-background shadow-lg rounded-lg p-8 w-full border">
          <SignUp afterSignUpUrl="/dashboard" redirectUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
}
