import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to transform your note-taking?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Join thousands of students, researchers, and professionals who
              have improved their productivity with NoteSync.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/sign-up">
              <Button size="lg" className="gap-1">
                Get started for free
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Schedule a demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
