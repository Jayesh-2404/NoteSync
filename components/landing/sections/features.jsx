import { FileText, Code, PenTool, Sparkles } from "lucide-react";

export default function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
    >
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
              Our powerful features help you capture, organize, and enhance your
              notes while studying PDF documents.
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
                View your PDF documents alongside your notes for seamless
                reference and study. Scroll, zoom, and navigate with ease.
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
                Format your notes with bold text, colorful highlighting, and
                multiple heading levels to organize your thoughts.
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
                Insert pre-defined code snippets and templates with syntax
                highlighting for programming notes and documentation.
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
                Select text and ask questions to get instant AI-powered
                insights, explanations, and suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
