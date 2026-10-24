"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FileQuestion, Loader2 } from "lucide-react";
import WorkspaceHeader from "../_components/Workspace";
import PdfViewer from "../_components/PdfViewer";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import TextEditor from "../_components/TextEditor";
import { Button } from "@/components/ui/button";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function ResizeHandle({ direction }) {
  const isVertical = direction === "vertical";

  return (
    <PanelResizeHandle
      className={
        isVertical
          ? "flex h-2 w-full items-center justify-center transition-colors duration-150 hover:bg-muted"
          : "flex w-2 items-center justify-center transition-colors duration-150 hover:bg-muted"
      }
    >
      <div
        className={
          isVertical
            ? "h-0.5 w-full bg-border"
            : "h-full w-0.5 bg-border"
        }
      />
    </PanelResizeHandle>
  );
}

function WorkspaceShell({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <WorkspaceHeader />
      {children}
    </div>
  );
}

function Workspace() {
  const { fileid } = useParams();
  const isMobile = useIsMobile();
  const direction = isMobile ? "vertical" : "horizontal";

  // undefined while the query is in flight, null when no document matches
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileid,
  });

  if (fileInfo === undefined) {
    return (
      <WorkspaceShell>
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading document...
        </div>
      </WorkspaceShell>
    );
  }

  if (fileInfo === null) {
    return (
      <WorkspaceShell>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold">Document not found</h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            This document may have been deleted, or the link is incorrect.
          </p>
          <Button asChild className="mt-2">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell>
      <PanelGroup
        key={direction}
        direction={direction}
        className="flex-1"
      >
        <Panel defaultSize={50} minSize={30}>
          <div className="h-full overflow-hidden border">
            <TextEditor />
          </div>
        </Panel>

        <ResizeHandle direction={direction} />

        <Panel defaultSize={50} minSize={30}>
          <div className="h-full overflow-hidden border">
            <PdfViewer fileUrl={fileInfo.fileUrl} />
          </div>
        </Panel>
      </PanelGroup>
    </WorkspaceShell>
  );
}

export default Workspace;
