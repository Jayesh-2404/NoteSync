import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div>
        <Image src={'../../../public/logo.svg'} alt ='logo' width={180} height={100}/>
    </div>
  )
}

export default WorkspaceHeader