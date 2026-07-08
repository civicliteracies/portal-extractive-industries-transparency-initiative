import { useSearchState } from "./SearchContext";

export default function Pagination({ count }: { count: number }) {
  const { options, setOptions } = useSearchState();

  if (!count) return null;

  const pageSize = options.limit || 10;
  const pageCount = Math.ceil(count / pageSize);
  // options.offset can be stale relative to a shrunken result set; clamp so
  // the pager never displays a page beyond the last one.
  const currentPage = Math.min(
    Math.floor(options.offset / pageSize),
    pageCount - 1
  );
  const from = currentPage * pageSize + 1;
  const to = Math.min((currentPage + 1) * pageSize, count);

  const goToPage = (page: number) => {
    setOptions({ ...options, offset: page * pageSize });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-3 border-t border-eiti-bordersubtle pt-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-eiti-muted tabular-nums">
        Showing{" "}
        <strong className="font-bold text-eiti-ink">
          {from}&ndash;{to}
        </strong>{" "}
        of <strong className="font-bold text-eiti-ink">{count}</strong> results
      </span>
      <div className="flex items-center gap-2">
        <button
          className="h-9 rounded-md border border-transparent px-4 text-sm font-semibold text-accent transition-colors hover:border-eiti-borderinput hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-transparent"
          disabled={currentPage === 0}
          onClick={() => goToPage(currentPage - 1)}
        >
          &larr; Previous
        </button>
        <span className="px-2 text-sm font-bold text-accent tabular-nums">
          Page {currentPage + 1} of {pageCount}
        </span>
        <button
          className="h-9 rounded-md border border-transparent px-4 text-sm font-semibold text-accent transition-colors hover:border-eiti-borderinput hover:bg-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-transparent disabled:hover:bg-transparent"
          disabled={currentPage >= pageCount - 1}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}
