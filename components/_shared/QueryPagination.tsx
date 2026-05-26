import { Dispatch, SetStateAction } from "react";

export default function QueryPagination({
  count,
  limit,
  currentPage,
  subset,
  setOffset,
  setSubset,
}: {
  count: number;
  limit: number;
  currentPage: number;
  subset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  setSubset: Dispatch<SetStateAction<number>>;
}) {
  const totalPages = Math.ceil(count / limit);
  const pages = Array.from(Array(totalPages).keys()).slice(
    subset,
    subset + 5
  );

  return (
    <div className="flex gap-2 align-center">
      {subset !== 0 && (
        <button
          className="font-semibold flex items-center gap-2"
          onClick={() => setSubset(Math.max(subset - 5, 0))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Prev
        </button>
      )}
      {pages.map((page) => (
        <button
          key={page}
          className={`${
            page === currentPage ? "bg-orange-500 text-white" : ""
          } px-2 rounded font-semibold`}
          onClick={() => setOffset(page * limit)}
        >
          {page + 1}
        </button>
      ))}
      {subset + 5 < totalPages && (
        <button
          className="font-semibold flex items-center gap-2"
          onClick={() => setSubset(subset + 5)}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
