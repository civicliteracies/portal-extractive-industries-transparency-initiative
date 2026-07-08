import Pagination from "./Pagination";
import { useRouter } from "next/router";

import { useSearchState } from "./SearchContext";
import { XMarkIcon } from "@heroicons/react/20/solid";
import DatasetItem from "./DatasetItem";

export default function ListOfDatasets() {
  return (
    <div className="grid grid-cols-1 gap-[13px] homepage-padding">
      <ListItems />
    </div>
  );
}

function ListItems() {
  const { options, setOptions, searchResults, isLoading } = useSearchState();

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row md:items-center flex-wrap gap-3">
        <div className="flex gap-2">
          <h2 className="text-[15px] font-normal text-eiti-ink">
            <span className="text-[19px] font-extrabold text-accent tabular-nums">
              {searchResults?.count}
            </span>{" "}
            {options.type === "visualization" ? "visualizations" : "datasets"}{" "}
            matched
          </h2>
        </div>
        <div className="flex gap-2 cursor-pointer">
          <div className="flex items-center gap-2 text-[13px] text-eiti-muted">
            Sort by
            <select
              className="h-9 rounded-md border border-eiti-borderinput bg-white px-3 text-[13px] font-bold text-accent focus:outline-none focus:border-accent"
              aria-label="Sort datasets by"
              value={options.sort ?? "score desc"}
              onChange={(e) => {
                const value = e.target.value;
                setOptions({ sort: value, offset: 0 });
              }}
            >
              <option value="score desc">Most relevant</option>
              <option value="title_string asc">Name ascending</option>
              <option value="title_string desc">Name descending </option>
              <option value="metadata_modified desc">Last updated</option>
            </select>
          </div>
        </div>
      </div>

      <FilterBadges />
      <div className="flex flex-col gap-3 mt-4">
        {searchResults?.datasets?.map((dataset) => (
          <DatasetItem key={dataset.id} dataset={dataset} />
        ))}
      </div>

      <div className="mt-10">
        <PackagePagination
          isLoading={isLoading}
          count={searchResults?.count}
        />
      </div>
    </>
  );
}

function FilterBadges() {
  const { options, setOptions, searchFacets } = useSearchState();

  const getActiveFilters = (optionKey: string, facetKey: string) => {
    if (
      options.hasOwnProperty(optionKey) &&
      searchFacets.hasOwnProperty(facetKey)
    ) {
      const activeFilters = options[optionKey]
        .map((af) =>
          searchFacets[facetKey].items.find((item) => item.name === af)
        )
        .filter((item) => !!item);
      return activeFilters ?? [];
    }
    return [];
  };

  const filters = {
    resFormat: getActiveFilters("resFormat", "res_format"),
    orgs: getActiveFilters("orgs", "organization"),
    groups: getActiveFilters("groups", "groups"),
    tags: getActiveFilters("tags", "tags"),
  };

  const activeFiltersCount = Object.keys(filters)
    .map((fk) => filters[fk]?.length ?? 0)
    .reduce((a, v) => {
      return a + v;
    }, 0);

  return (
    <div className="border-b border-eiti-bordersubtle pb-2">
      {!!activeFiltersCount && (
        <span className="text-xs  text-gray-800 mb-2 inline-block">
          Applied Filters{" "}
          <span className="font-[600]">
            ({activeFiltersCount}
            ):
          </span>
        </span>
      )}

      <div className="flex gap-2 flex-wrap">
        {filters.orgs.length > 0 &&
          filters.orgs.map((org) => (
            <ActiveFilter
              key={org.name}
              label={org.display_name}
              onClick={() => {
                setOptions({
                  orgs: options.orgs.filter((item) => item !== org.name),
                });
              }}
            />
          ))}

        {filters.groups.length > 0 &&
          filters.groups.map((g) => (
            <ActiveFilter
              key={g.name}
              label={g.display_name}
              onClick={() => {
                setOptions({
                  groups: options.groups.filter((item) => item !== g.name),
                });
              }}
            />
          ))}

        {filters.tags.length > 0 &&
          filters.tags.map((t) => (
            <ActiveFilter
              key={t.name}
              label={t.display_name}
              onClick={() => {
                setOptions({
                  tags: options.tags.filter((item) => item !== t.name),
                });
              }}
            />
          ))}

        {filters.resFormat.length > 0 &&
          filters.resFormat.map((f) => (
            <ActiveFilter
              key={f.name}
              label={f.display_name}
              onClick={() => {
                setOptions({
                  resFormat: options.resFormat.filter(
                    (item) => item !== f.name
                  ),
                });
              }}
            />
          ))}

        {(!!activeFiltersCount) && (
          <span
            onClick={() => {
              setOptions({
                resFormat: [],
                groups: [],
                orgs: [],
                tags: []
              });
            }}
            className="inline-flex h-fit w-fit cursor-pointer ml-auto items-center gap-x-1 rounded-full border border-eiti-borderinput bg-white px-3 py-1 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            clear all
            <button
              type="button"
              className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
            >
              <XMarkIcon width={14} />
              <span className="absolute -inset-1"></span>
            </button>
          </span>
        )}
      </div>
    </div>
  );
}

function PackagePagination({ isLoading, count }) {
  if (isLoading) return null;

  if (count > 0) {
    return <Pagination count={count} />;
  }

  return <ResultsNotFound />;
}

function ResultsNotFound() {
  const router = useRouter();

  const clearFilters = () => {
    router.push("/search", undefined, { shallow: true });
  };
  return (
    <div className="mt-5 flex flex-col items-center rounded-lg border border-eiti-border bg-white gap-4 px-8 py-14 md:px-20">
      <div className="flex flex-col items-center gap-2">
        <span className="text-accent font-extrabold text-[18px] leading-[23px]">
          No datasets found
        </span>
        <span className="text-eiti-muted text-center font-normal text-[15px] leading-[20px] max-w-[52ch]">
          No datasets match your current search. Try removing filters or
          broadening your search terms.
        </span>
      </div>
      <button
        onClick={clearFilters}
        type="button"
        className="rounded-md bg-accent hover:bg-eiti-navy2 transition-colors px-6 h-[44px] flex items-center justify-center text-white text-[13px] font-bold uppercase tracking-label"
      >
        Clear filters
      </button>
    </div>
  );
}

function ActiveFilter({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <span
      onClick={() => {
        onClick();
      }}
      className="inline-flex items-center cursor-pointer gap-x-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-eiti-navy2"
    >
      {label}
      <button
        type="button"
        className="group relative -mr-1 size-3.5 rounded-sm hover:bg-gray-500/20"
      >
        <XMarkIcon width={14} />
        <span className="absolute -inset-1"></span>
      </button>
    </span>
  );
}
