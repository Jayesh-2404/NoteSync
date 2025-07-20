import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Code, Sparkles } from "lucide-react";

export default function Demo() {
  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              See NoteSync in action
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Experience how our application transforms your PDF note-taking
              workflow.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl py-12">
          <div className="rounded-xl border bg-background shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 border-b">
              <div className="border-r p-4 flex flex-col">
                <div className="text-sm font-medium mb-2 pb-2 border-b">
                  PDF Document
                </div>
                <div className="flex-1 bg-muted/30 rounded-md overflow-hidden">
                  <Image
                    src="/note.png?height=600&width=500"
                    width={500}
                    height={600}
                    alt="PDF document view"
                    className="w-full h-full object-cover"
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-yellow-500"
                    >
                      <span className="font-medium">H</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 bg-muted/20 rounded-md p-3 text-left">
                  <h3 className="text-lg font-bold mb-2">Chapter 3 Notes</h3>
                  <p className="mb-2">
                    The key concepts from this chapter include:
                  </p>
                  <ul className="list-disc pl-5 mb-3 space-y-1">
                    <li>Data structures and their applications</li>
                    <li>Time complexity analysis</li>
                    <li className="bg-yellow-100 px-1 rounded">
                      Important: O(n log n) sorting algorithms
                    </li>
                  </ul>
                  <div className="bg-muted/40 p-2 rounded-md font-mono text-sm mb-3">
                    <div className="text-green-600">
                      {"// Example quicksort implementation"}
                    </div>
                    <div>{"function quickSort(arr) {"}</div>
                    <div className="pl-4">
                      {"if (arr.length <= 1) return arr;"}
                    </div>
                    <div>{"}"}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 border-t pt-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      Ask AI
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Select text to ask questions
                    </span>
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
                  <p className="font-medium">
                    You asked: "Explain the difference between quicksort and
                    mergesort"
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Quicksort and mergesort are both efficient O(n log n)
                    sorting algorithms, but they work differently. Quicksort
                    uses a divide-and-conquer approach with a pivot element,
                    while mergesort divides the array in half recursively and
                    then merges the sorted halves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
