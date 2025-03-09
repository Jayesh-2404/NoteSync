"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import WorkspaceHeader from '../_components/Workspace';

function Workspace() {
    const {fileid} = useParams();

  return (
    <div>
        <WorkspaceHeader/>
    </div>
  )
}

export default Workspace