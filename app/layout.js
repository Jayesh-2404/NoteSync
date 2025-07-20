import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Outfit} from 'next/font/google'
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "NoteSync",
  description: "NoteSync revolutionizes how you interact with PDFs",
};

const outfit = Outfit({subsets:['latin']})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={outfit.className}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
