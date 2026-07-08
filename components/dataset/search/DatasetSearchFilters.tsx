import { useState } from "react";
import MultiCheckbox from "@/components/_shared/MultiCheckbox";
import { useSearchState } from "./SearchContext";
import FacetCard from "@/components/_shared/FacetCard";
import {
  PackageFacetOptions,
  PackageSearchOptions,
} from "@/schemas/dataset.interface";
import {
  ChartBarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleStackIcon,
} from "@heroicons/react/20/solid";
import { classNames } from "primereact/utils";

export default function DatasetSearchFilters() {
  const [showFilters, setShowFilters] = useState(true);
  const [seeMoreOrgs, setSeeMoreOrgs] = useState(false);
  const [seeMoreGroups, setSeeMoreGroups] = useState(false);
  const {
    searchFacets,
    options,
    setOptions,
    packageSearchResults,
    visualizationsSearchResults,
  } = useSearchState();
  const maxPerView = 6;

  return (
    <div className="flex flex-col ">
      <button
        type="button"
        className="mb-4 flex w-full items-center justify-between gap-1 rounded-md border border-eiti-borderinput bg-white px-4 py-3 text-[13px] font-bold uppercase tracking-label text-accent lg:hidden"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "Hide" : "Show"} Filters
        {showFilters ? (
          <ChevronUpIcon width={14} />
        ) : (
          <ChevronDownIcon width={14} />
        )}
      </button>
      <div className={` ${showFilters ? "block" : "hidden"} lg:block`}>
        <FacetCard title="Type">
          <div className="text-eiti-ink space-y-[10px]">
            <DatasetTypeOption
              title="Datasets"
              Icon={CircleStackIcon}
              type="dataset"
              count={packageSearchResults?.count}
            />
            <DatasetTypeOption
              title="Visualizations"
              Icon={ChartBarIcon}
              type="visualization"
              count={visualizationsSearchResults?.count}
            />
          </div>
        </FacetCard>

        <FacetCard
          title="Country"
          showClear={options.orgs.length > 0}
          clearAction={() => {
            setOptions({
              orgs: [],
              offset: 0,
            });
          }}
        >
          <div>
            <div className="max-h-[400px] overflow-y-auto">
              {searchFacets.organization?.items
                ?.slice(
                  0,
                  seeMoreOrgs
                    ? searchFacets.organization?.items?.length
                    : maxPerView
                )
                .map((org: PackageFacetOptions) => (
                  <MultiCheckbox
                    name={"orgs"}
                    value={org.name}
                    label={org.display_name}
                    count={org.count}
                    key={org.name}
                  />
                ))}
            </div>

            {searchFacets.organization?.items?.length > maxPerView && (
              <button
                onClick={() => setSeeMoreOrgs(!seeMoreOrgs)}
                type="button"
                className="mt-2 rounded-md border border-eiti-borderinput bg-white px-3 py-2 text-xs font-bold uppercase tracking-label text-accent transition-colors hover:bg-accent hover:text-white hover:border-accent"
              >
                See {seeMoreOrgs ? "Less" : "More"}
              </button>
            )}
          </div>
        </FacetCard>
        {searchFacets.groups?.items.length > 0 && (
          <FacetCard
            title="Category"
            showClear={options.groups.length > 0}
            clearAction={() => {
              setOptions({
                groups: [],
                offset: 0,
              });
            }}
          >
            <div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchFacets.groups?.items
                  ?.slice(
                    0,
                    seeMoreGroups
                      ? searchFacets.groups?.items?.length
                      : maxPerView
                  )
                  .map((group: PackageFacetOptions) => {
                    return (
                      <MultiCheckbox
                        name={"groups"}
                        value={group.name}
                        label={group.display_name}
                        count={group.count}
                        key={group.name}
                      />
                    );
                  })}
              </div>
              {searchFacets.groups?.items?.length > maxPerView && (
                <button
                  onClick={() => setSeeMoreGroups(!seeMoreGroups)}
                  type="button"
                  className="mt-2 rounded-md border border-eiti-borderinput bg-white px-3 py-2 text-xs font-bold uppercase tracking-label text-accent transition-colors hover:bg-accent hover:text-white hover:border-accent"
                >
                  See {seeMoreGroups ? "Less" : "More"}
                </button>
              )}
            </div>
          </FacetCard>
        )}
        {searchFacets.tags?.items?.length > 0 && (
          <FacetCard
            title="Tags"
            showClear={options.tags.length > 0}
            clearAction={() => {
              setOptions({
                tags: [],
                offset: 0,
              });
            }}
          >
            <div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchFacets?.tags?.items.map((tag: PackageFacetOptions) => (
                  <MultiCheckbox
                    name={"tags"}
                    value={tag.name}
                    label={tag.display_name}
                    key={tag.name}
                    count={tag.count}
                  />
                ))}
              </div>
            </div>
          </FacetCard>
        )}
        {searchFacets.res_format?.items?.length > 0 && (
          <FacetCard
            title="Format"
            showClear={options.resFormat.length > 0}
            clearAction={() => {
              setOptions({
                resFormat: [],
                offset: 0,
              });
            }}
          >
            <div>
              <div className="max-h-[400px] overflow-y-auto">
                {searchFacets?.res_format?.items.map(
                  (format: PackageFacetOptions) => (
                    <MultiCheckbox
                      name={"resFormat"}
                      value={format.name}
                      label={format.display_name}
                      key={format.name}
                      count={format.count}
                    />
                  )
                )}
              </div>
            </div>
          </FacetCard>
        )}
      </div>
    </div>
  );
}

function DatasetTypeOption({
  Icon,
  title,
  type,
  count,
}: {
  Icon: React.FC<{ className?: string }>;
  title: string;
  type: string;
  count?: number;
}) {
  const {
    options,
    setOptions,
    packageSearchResults,
    visualizationsSearchResults,
  } = useSearchState();
  const isActive = options.type === type;

  return (
    <button
      onClick={() => {
        const hasResults = !!(
          type === "visualization"
            ? visualizationsSearchResults
            : packageSearchResults
        )?.results?.length;
        const newOptions: Partial<PackageSearchOptions> = { type, offset: 0 };
        if (!hasResults) {
          Object.assign(newOptions, {
            resFormat: [],
            tags: [],
            groups: [],
            orgs: [],
            query: ""
          });
        }
        setOptions(newOptions);
      }}
      className={classNames(
        "flex items-center justify-between w-full ",
        !isActive && "font-normal",
        "hover:opacity-100 transition-all"
      )}
    >
      <div className={`flex items-center gap-3 ${isActive ? "font-bold text-accent" : ""}`}>
        <Icon className={classNames("w-5 h-5")} />{" "}
        {title}
      </div>
      {!!count && (
        <span className="ml-auto text-xs font-medium text-eiti-muted tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
