"use client"
import React from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { ClerkProvider } from "@clerk/nextjs";

<<<<<<< HEAD
function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
=======
function Provider({children}) {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
        throw new Error(
            "NEXT_PUBLIC_CONVEX_URL is not set - make sure you've run `npx convex dev` or set the URL manually"
        );
    }
    const convex = new ConvexReactClient(convexUrl);
    return (
        <ConvexProvider client={convex}>{children}</ConvexProvider>
    )
>>>>>>> 842f85ffeca8b950758a04502953ec2bad82c773
}

export default Provider;