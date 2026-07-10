import { Dispatch, SetStateAction } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function SearchHero({
  title,
  subtitle,
  searchValue,
  onChange,
}: {
  title: string;
  subtitle?: string;
  searchValue: string;
  onChange: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <section>
        <div className="custom-container mx-auto pt-12 pb-8">
          <span className="text-xs font-bold uppercase tracking-label text-accent">
            Home <span className="opacity-40">&rsaquo;</span> {title}
          </span>
          <h1 className="mt-2 text-3xl md:text-[44px] font-extrabold leading-[1.12] tracking-tight text-accent capitalize">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-[62ch] text-base text-eiti-muted">
              {subtitle}
            </p>
          )}
        </div>
      </section>
      <section className="custom-container mx-auto pb-8">
        <form
          className="relative max-w-[560px]"
          onSubmit={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <MagnifyingGlassIcon
            width={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-eiti-muted"
          />
          <input
            type="text"
            placeholder={`Find ${title.toLowerCase()}…`}
            className="h-12 w-full rounded-md border border-eiti-borderinput bg-white pl-11 pr-4 text-[15px] text-eiti-ink placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/10"
            id="search2"
            name="search"
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={searchValue}
            aria-label={`Search ${title}`}
          />
          <button type="submit" className="sr-only">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
