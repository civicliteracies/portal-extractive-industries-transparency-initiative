import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchForm: React.FC<{ datasetCount?: number }> = ({ datasetCount }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    router.push({
      pathname: "/search",
      query: { q: searchQuery },
    });
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="items-center flex flex-row gap-3"
    >
      <input
        id="search-form-input"
        type="search"
        name="search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder={
          datasetCount
            ? `Search ${datasetCount} datasets…`
            : "Search datasets…"
        }
        aria-label="Search datasets"
        className="w-full rounded-md bg-white py-3.5 px-4 leading-none text-eiti-ink placeholder-gray-500 border border-transparent focus:outline-none focus:ring-[3px] focus:ring-eiti-amber/50"
      />
      {/* Amber surfaces carry navy text: white on amber fails WCAG AA. */}
      <button
        type="submit"
        className="rounded-md bg-eiti-amber text-eiti-navy text-[13px] font-bold uppercase tracking-label px-4 py-4 md:px-8 leading-none transition-colors hover:bg-[#E09804]"
      >
        <MagnifyingGlassIcon width={20} className="sm:hidden" />
        <span className="hidden sm:block">Search</span>
      </button>
    </form>
  );
};

export default SearchForm;
