import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, Transparent Pricing
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Start for free. Upgrade when you're ready.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-muted-foreground">
                Perfect for getting started
              </p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $0
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Up to 5 documents</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Basic PDF viewing & notes</span>
              </li>
            </ul>
            <Link href="/sign-up" className="w-full">
              <Button className="mt-8 w-full" variant="outline">
                Get started
              </Button>
            </Link>
          </div>
          <div className="flex flex-col rounded-xl border-2 border-primary bg-background p-6 shadow-sm relative">
            <div className="absolute top-4 right-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Coming Soon
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Pro</h3>
              <p className="text-muted-foreground">
                For students & researchers
              </p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              $9.99
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Unlimited documents</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Advanced AI assistance</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Folder organization</span>
              </li>
            </ul>
            <Button className="mt-8" disabled>
              Get started
            </Button>
          </div>
          <div className="flex flex-col rounded-xl border bg-background p-6 shadow-sm relative">
            <div className="absolute top-4 right-4 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Coming Soon
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <p className="text-muted-foreground">For teams & organizations</p>
            </div>
            <div className="mt-4 flex items-baseline text-3xl font-bold">
              Custom
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Team collaboration</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Priority support</span>
              </li>
            </ul>
            <Button className="mt-8" variant="outline" disabled>
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
