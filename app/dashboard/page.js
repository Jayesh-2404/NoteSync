"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FileText, ArrowRight, Files } from "lucide-react"; // <-- Import new icons
import UploadPdfDialog from "./_components/UploadPdfDialog"; // <-- Import the dialog
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const fileList = useQuery(
    api.fileStorage.GetUserFiles,
    userEmail ? { userEmail } : "skip"
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const fileCount = fileList?.length || 0;
  const maxFiles = 5; // Should match what's in SideBar.js

  return (
    <div className="p-4 md:p-6">
      {/* 1. New Structured Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{`${getGreeting()}, ${user?.firstName || "User"}!`}</h1>
          <p className="text-muted-foreground mt-1">
            Your document workspace is ready.
          </p>
        </div>
        {/* Hide button on small screens to avoid clutter, sidebar button is still there */}
        <div className="hidden sm:block">
          <UploadPdfDialog maxFiles={maxFiles} fileCount={fileCount} />
        </div>
      </div>

      {/* Loading State */}
      {fileList === undefined && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl h-48 bg-background"
              >
                <Skeleton height="100%" />
              </div>
            ))}
        </div>
      )}

      {/* 2. Redesigned File List */}
      {fileList && fileList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fileList.map((file) => (
            <Link key={file._id} href={`/workspace/${file.fileId}`}>
              <div className="group flex flex-col justify-between border bg-background rounded-xl p-5 h-48 transition-all hover:shadow-md hover:-translate-y-1">
                <div className="flex-1">
                  <FileText className="h-8 w-8 text-primary mb-3" />
                  <h2 className="font-semibold text-lg break-words leading-tight">
                    {file.fileName}
                  </h2>
                </div>
                <div className="flex justify-between items-end text-sm text-muted-foreground">
                  <span>
                    {new Date(file._creationTime).toLocaleDateString()}
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 3. New Engaging Empty State */}
      {fileList && fileList.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 mt-10 border-2 border-dashed rounded-xl bg-muted/40">
          <Files className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold">Your workspace is empty</h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
            Upload your first PDF to start taking smart notes and get answers
            from your documents.
          </p>
          <UploadPdfDialog maxFiles={maxFiles} fileCount={fileCount}>
            <Button size="lg">Upload First Document</Button>
          </UploadPdfDialog>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
