"use client"
import React from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { ClerkProvider } from "@clerk/nextjs";

function Provider({ children }) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);
  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
}

export default Provider;