import {
  FileText,
  PenTool,
  Sparkles,
  Users,
  MessageSquare,
  Share2,
} from "lucide-react";

const featureItems = [
  {
    title: "Real-Time Collaboration",
    description:
      "Work together in the same note at the same time with live cursors and presence indicators.",
    icon: Users,
  },
  {
    title: "Inline Discussion Comments",
    description:
      "Leave comments on selected text, resolve discussion threads, and keep review feedback organized.",
    icon: MessageSquare,
  },
  {
    title: "Shareable Workspace Links",
    description:
      "Share a workspace instantly so teammates can join the same document and notes context.",
    icon: Share2,
  },
  {
    title: "Side-by-Side PDF Viewing",
    description:
      "Read PDFs and write notes in one workspace for faster context switching and deeper focus.",
    icon: FileText,
  },
  {
    title: "Rich Text Note Editing",
    description:
      "Structure content with headings, formatting, highlights, and lists while notes auto-save in the background.",
    icon: PenTool,
  },
  {
    title: "AI-Powered Q&A",
    description:
      "Select content and ask questions to generate contextual answers directly from the document.",
    icon: Sparkles,
  },
];

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
              NoteSync combines collaboration, AI, and structured note-taking
              so your team can learn and ship faster from long documents.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {featureItems.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border bg-background p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
