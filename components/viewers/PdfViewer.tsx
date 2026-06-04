import { useState, useRef, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

if (typeof URL.parse === 'undefined') {
  (URL as any).parse = (url: string, base?: string) => {
    try { return new URL(url, base); } catch { return null; }
  };
}

export interface PdfViewerProps {
  url: string;
  layout?: boolean;
  parentClassName?: string;
}

const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2];

export function PdfViewer({ url, parentClassName }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const containerWidth = containerRef.current?.clientWidth ?? 800;

  const scrollToPage = useCallback((n: number) => {
    const container = containerRef.current;
    const el = pageRefs.current[n - 1];
    if (!container || !el) return;
    const delta = el.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollBy({ top: delta, behavior: 'smooth' });
    setCurrentPage(n);
  }, []);

  // Track which page is visible as user scrolls
  useEffect(() => {
    if (!containerRef.current || numPages === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = pageRefs.current.indexOf(visible.target as HTMLDivElement);
          if (idx >= 0) setCurrentPage(idx + 1);
        }
      },
      { root: containerRef.current, threshold: 0.3 }
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setScale((s) => ZOOM_STEPS.find((z) => z > s) ?? s);
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => [...ZOOM_STEPS].reverse().find((z) => z < s) ?? s);
  }, []);

  return (
    <div className={`flex flex-col border rounded ${parentClassName ?? ''}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-3 py-2 border-b bg-gray-50 text-sm flex-shrink-0">
        <button
          className="px-2 py-0.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={currentPage <= 1}
          onClick={() => scrollToPage(currentPage - 1)}
          title="Previous page"
        >
          ‹
        </button>
        <span className="text-gray-600 whitespace-nowrap flex items-center gap-1">
          <input
            className="w-10 text-center border rounded px-1"
            value={currentPage}
            min={1}
            max={numPages || 1}
            type="number"
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (v >= 1 && v <= numPages) scrollToPage(v);
            }}
          />
          / {numPages}
        </span>
        <button
          className="px-2 py-0.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={currentPage >= numPages}
          onClick={() => scrollToPage(currentPage + 1)}
          title="Next page"
        >
          ›
        </button>

        <div className="w-px h-4 bg-gray-300 mx-1" />

        <button
          className="px-2 py-0.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={scale <= ZOOM_STEPS[0]}
          onClick={zoomOut}
          title="Zoom out"
        >
          −
        </button>
        <span className="text-gray-600 w-12 text-center">{Math.round(scale * 100)}%</span>
        <button
          className="px-2 py-0.5 border rounded bg-white hover:bg-gray-100 disabled:opacity-40"
          disabled={scale >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
          onClick={zoomIn}
          title="Zoom in"
        >
          +
        </button>
      </div>

      {/* PDF content — infinite scroll */}
      <div ref={containerRef} className="overflow-auto flex-1 bg-gray-100 flex flex-col items-center py-4 gap-3">
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => {
            setNumPages(numPages);
            pageRefs.current = new Array(numPages).fill(null);
          }}
          className="flex flex-col items-center gap-3"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              ref={(el) => { pageRefs.current[i] = el; }}
              className="shadow-md"
            >
              <Page
                pageNumber={i + 1}
                scale={scale}
                width={Math.min(containerWidth - 48, 900)}
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
