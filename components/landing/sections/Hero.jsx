import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (

    <section className="relative w-full py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full bg-primary/10 blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[50rem] rounded-full bg-purple-500/10 blur-3xl -z-10" />

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center gap-12">
          <div className="flex flex-col items-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                Where Your Documents and Thoughts Converge
              </h1>

              <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
                NoteSync revolutionizes how you interact with PDFs. Upload
                documents, take rich-text notes side-by-side, and harness AI to
                find answers instantly.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="gap-1 shadow-lg shadow-primary/20 transition-transform hover:scale-105"
                >
                  Start for Free
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="transition-transform hover:scale-105"
                >
                  See it in Action
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Block */}
          <div className="w-full max-w-5xl">
            <div style={{ perspective: "1000px" }}>
              <div className="group transition-transform duration-500 ease-out hover:[transform:rotateX(5deg)]">
                <div className="relative rounded-xl shadow-2xl shadow-primary/10 border border-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl blur-lg" />
                  <Image
                    src="/home.png?height=720&width=1280"
                    width={1280}
                    height={720}
                    alt="App screenshot showing PDF and note-taking interface"
                    className="relative rounded-xl object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
