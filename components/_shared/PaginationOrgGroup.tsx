interface PaginationProps {
  count: number;
  offset?: number;
  onPageChange?: (newOffset: number) => void;
}

export default function Pagination({
  count,
  offset,
  onPageChange,
}: PaginationProps) {
  if (!count) return null;

  const pageSize = 10;
  const currentPage = offset !== undefined ? Math.floor(offset / pageSize) : 0;
  const pageCount = Math.ceil(count / pageSize);
  const from = currentPage * pageSize + 1;
  const to = Math.min((currentPage + 1) * pageSize, count);

  const goToPage = (pageIndex: number) => {
    if (onPageChange) {
      onPageChange(pageIndex * pageSize);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 border-t border-eiti-bordersubtle pt-4 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-eiti-muted tabular-nums">
        Showing{" "}
        <strong className="font-bold text-eiti-ink">
          {from}&ndash;{to}
        </strong>{" "}
        of <strong className="font-bold text-eiti-ink">{count}</strong>{" "}
        datasets
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
