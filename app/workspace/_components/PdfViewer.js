import React from "react";

function PdfViewer({ fileUrl }) {
  if (!fileUrl) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No PDF attached to this document.
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <iframe
        src={`${fileUrl}#toolbar=0`}
        title="PDF document"
        className="h-full w-full border-0"
      />
    </div>
  );
}

export default PdfViewer;
