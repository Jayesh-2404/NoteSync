"use client"
import React from 'react'
import {ConvexReactClient} from 'convex/react'
import {ConvexProvider} from 'convex/react'

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
}

export default Provider