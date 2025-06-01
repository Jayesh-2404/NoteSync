"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Code, PenTool, Sparkles, ChevronRight, Check, Github, Twitter } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
            >
              Features
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="#demo"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
            >
              Demo
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary relative group"
            >
              Pricing
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden md:inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Sign in
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="hidden md:inline-flex">
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu - Hidden by default */}
      <div className="hidden md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="fixed top-0 right-0 h-full w-3/4 max-w-sm border-l bg-background p-6 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2 items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NoteSync</span>
            </div>
            <Button variant="ghost" size="icon" aria-label="Close Menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>
          <nav className="flex flex-col space-y-6">
            <Link
              href="#features"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#demo"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Demo
            </Link>
            <Link
              href="#pricing"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <div className="pt-4 border-t">
              <Link
                href="/sign-in"
                className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Sign in
              </Link>
            </div>
            <Link href="/sign-up">
              <Button className="w-full mt-2">Get Started</Button>
            </Link>
          </nav>
        </div>
      </div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                    Take smarter notes alongside your PDF documents
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    NoteSync combines PDF viewing with powerful note-taking tools and AI assistance to help you study,
                    research, and learn more effectively.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up">
                    <Button size="lg" className="gap-1">
                      Start for free
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    View demo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-xl">
                  <Image
                    src="/home.png?height=720&width=1280"
                    width={1280}
                    height={720}
                    alt="App screenshot showing PDF and note-taking interface"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need for effective note-taking
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our powerful features help you capture, organize, and enhance your notes while studying PDF documents.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Side-by-side PDF Viewing</h3>
                  </div>
                  <p className="text-muted-foreground">
                    View your PDF documents alongside your notes for seamless reference and study. Scroll, zoom, and
                    navigate with ease.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <PenTool className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Rich Text Formatting</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Format your notes with bold text, colorful highlighting, and multiple heading levels to organize
                    your thoughts.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Code className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Code Templates</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Insert pre-defined code snippets and templates with syntax highlighting for programming notes and
                    documentation.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">AI-Powered Assistance</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Select text and ask questions to get instant AI-powered insights, explanations, and suggestions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">See NoteSync in action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Experience how our application transforms your PDF note-taking workflow.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <div className="rounded-xl border bg-background shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 border-b">
                  <div className="border-r p-4 flex flex-col">
                    <div className="text-sm font-medium mb-2 pb-2 border-b">PDF Document</div>
                    <div className="flex-1 bg-muted/30 rounded-md">
                      <Image
                        src="/note.png?height=600&width=500"
                        width={500}
                        height={600}
                        alt="PDF document view"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="p-4 flex flex-col">
                    <div className="text-sm font-medium mb-2 pb-2 border-b flex justify-between items-center">
                      <span>Notes</span>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <span className="font-bold">B</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500">
                          <span className="font-medium">H</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 bg-muted/20 rounded-md p-3 text-left">
                      <h3 className="text-lg font-bold mb-2">Chapter 3 Notes</h3>
                      <p className="mb-2">The key concepts from this chapter include:</p>
                      <ul className="list-disc pl-5 mb-3 space-y-1">
                        <li>Data structures and their applications</li>
                        <li>Time complexity analysis</li>
                        <li className="bg-yellow-100 px-1 rounded">Important: O(n log n) sorting algorithms</li>
                      </ul>
                      <div className="bg-muted/40 p-2 rounded-md font-mono text-sm mb-3">
                        <div className="text-green-600">// Example quicksort implementation</div>
                        <div>function quickSort(arr) {"{"}</div>
                        <div className="pl-4">if (arr.length {"<="} 1) return arr;</div>
                        <div>{"}"}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 border-t pt-2">
                        <Button size="sm" variant="outline" className="gap-1">
                          <Sparkles className="h-3 w-3" />
                          Ask AI
                        </Button>
                        <span className="text-sm text-muted-foreground">Select text to ask questions</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 text-sm">
                      <p className="font-medium">You asked: "Explain the difference between quicksort and mergesort"</p>
                      <p className="mt-2 text-muted-foreground">
                        Quicksort and mergesort are both efficient O(n log n) sorting algorithms, but they work
                        differently. Quicksort uses a divide-and-conquer approach with a pivot element, while mergesort
                        divides the array in half recursively and then merges the sorted halves. Quicksort is typically
                        faster in practice but has a worst-case time complexity of O(n²), whereas mergesort consistently
                        performs at O(n log n) but requires additional space.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that's right for you
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Free</h3>
                  <p className="text-muted-foreground">Perfect for getting started</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $0
                  <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic PDF viewing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Simple text notes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 5 documents</span>
                  </li>
                </ul>
                <Button className="mt-8" variant="outline">
                  Get started
                </Button>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm ring-2 ring-primary">
                <div className="space-y-2">
                  <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Popular
                  </div>
                  <h3 className="text-xl font-bold">Pro</h3>
                  <p className="text-muted-foreground">For serious students and researchers</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $9.99
                  <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced PDF viewing</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Rich text formatting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Code templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic AI assistance (100 queries/month)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited documents</span>
                  </li>
                </ul>
                <Button className="mt-8">Get started</Button>
              </div>
              <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">For teams and organizations</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $29.99
                  <span className="ml-1 text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced AI assistance (unlimited)</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="mt-8" variant="outline">
                  Contact sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to transform your note-taking?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of students, researchers, and professionals who have improved their productivity with
                  NoteSync.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1">
                  Get started for free
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
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
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

