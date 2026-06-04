import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export interface PdfViewerProps {
  url: string;
  layout?: boolean;
  parentClassName?: string;
}

export function PdfViewer({ url, layout = false, parentClassName }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className={`overflow-auto ${parentClassName ?? ''}`}>
      <Document file={url} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {layout ? (
          Array.from({ length: numPages }, (_, i) => (
            <div key={i} className="mb-2">
              <Page pageNumber={i + 1} />
            </div>
          ))
        ) : (
          <Page pageNumber={pageNumber} />
        )}
      </Document>
      {!layout && numPages > 1 && (
        <div className="flex items-center gap-2 p-2 text-sm">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
          >
            Previous
          </button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
