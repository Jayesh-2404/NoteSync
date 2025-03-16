import React from 'react'

function PdfViewer({fileUrl}) {
  if (!fileUrl) {
    return <div>Loading...</div>
  }
  
  return (
    <div className="h-screen">
        <iframe 
          src={`${fileUrl}#toolbar=0`} 
          width="100%" 
          height="100%" 
          className='h-[90vh]'
        />
    </div>
  )
}

export default PdfViewer