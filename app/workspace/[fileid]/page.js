"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import WorkspaceHeader from '../_components/Workspace';
import PdfViewer from '../_components/PdfViewer';
import { api } from '@/convex/_generated/api';
// import { query ,  } from '@/convex/_generated/server';
import {useQuery} from 'convex/react'
import { useEffect } from 'react';
import TextEditor from '../_components/TextEditor';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";

function ResizeHandle() {
  return (
    <PanelResizeHandle className="w-2 hover:bg-gray-200 transition-colors duration-150">
      <div className="w-0.5 h-full mx-auto bg-gray-300"/>
    </PanelResizeHandle>
  );
}

function Workspace() {
    const {fileId} = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
      fileId: fileId
    });

    useEffect(() => {
      if (fileInfo) {
        console.log("File URL:", fileInfo.fileUrl);
      }
    }, [fileInfo]);

    if (!fileInfo) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col h-screen">
            <WorkspaceHeader/>
            <PanelGroup direction="horizontal" className="flex-1">
                <Panel defaultSize={50} minSize={30}>
                    <div className="h-full border rounded-lg">
                        <TextEditor/>
                    </div>
                </Panel>
                
                <ResizeHandle />
                
                <Panel defaultSize={50} minSize={30}>
                    <div className="h-full border rounded-lg overflow-hidden">
                        <PdfViewer fileUrl={fileInfo?.fileUrl}/>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    )
}

export default Workspace