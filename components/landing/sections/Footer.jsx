import Link from "next/link";
import { FileText, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex gap-2 items-center text-lg font-semibold">
          <FileText className="h-5 w-5" />
          <span>NoteSync</span>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} NoteSync. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
