import { useState } from "react";
import { useSearchState } from "./SearchContext";

export default function DatasetSearchForm() {
  const { setOptions, options } = useSearchState();
  const [q, setQ] = useState(options.query ?? "");
  const handleSubmit = (e) => {
    e.preventDefault();
    setOptions({
      query: q,
    });
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 p-5 lg:flex-row">
        <input
          type="text"
          placeholder="Type in a keyword…"
          className="h-12 grow rounded-md border border-eiti-borderinput bg-white px-4 text-[15px] text-eiti-ink placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/10"
          name="query"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search datasets"
        />
        <button
          className="h-12 rounded-md border border-accent bg-accent px-8 text-[13px] font-bold uppercase tracking-label text-white transition-colors hover:bg-eiti-navy2"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}
