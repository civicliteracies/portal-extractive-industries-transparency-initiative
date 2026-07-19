import { Group } from "@portaljs/ckan";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import { Dataset } from "@/schemas/dataset.interface";
import { getTimeAgo } from "@/lib/utils";
import ResourcesBadges from "@/components/dataset/_shared/ResourcesBadges";

function SectionHead({
  title,
  allHref,
  allLabel,
}: {
  title: string;
  allHref?: string;
  allLabel?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-5">
      <h2 className="text-2xl md:text-[26px] font-extrabold text-accent">
        {title}
      </h2>
      {allHref && (
        <Link
          href={allHref}
          className="flex items-center gap-1 text-[13px] font-bold uppercase tracking-label text-accent border-b-2 border-transparent hover:border-eiti-amber"
        >
          {allLabel} <ArrowLongRightIcon width={16} />
        </Link>
      )}
    </div>
  );
}

function groupInitials(displayName: string): string {
  return displayName
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const howItWorks = [
  {
    n: "01",
    title: "Search the catalogue",
    description:
      "Reports and data files from every member country — filter by country, category or file format.",
  },
  {
    n: "02",
    title: "Preview before you download",
    description:
      "Tables render in the browser, so you can check the shape of the data first.",
  },
  {
    n: "03",
    title: "Export and reuse",
    description:
      "Download files directly or pull metadata as JSON-LD, RDF and TTL.",
  },
];

export default function MainSection({
  groups,
  datasets,
}: {
  groups: Array<Group>;
  datasets: Array<Dataset>;
}) {
  return (
    <section className="custom-container homepage-padding mx-auto">
      <section className="pt-16">
        <SectionHead
          title="Browse by category"
          allHref="/categories"
          allLabel="All categories"
        />
        <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-eiti-border bg-eiti-bordersubtle">
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/categories/${group.name}`}
              className="flex items-center justify-between gap-4 bg-white px-5 py-4 transition-colors hover:bg-eiti-bg"
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-md bg-accent text-[13px] font-extrabold text-white">
                  {groupInitials(group.display_name || group.name)}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-extrabold text-accent">
                    {group.display_name}
                  </span>
                  {group.description && (
                    <span className="mt-0.5 block truncate text-[13px] text-eiti-muted">
                      {group.description}
                    </span>
                  )}
                </span>
              </span>
              <span className="flex flex-none items-center gap-4 text-[13px]">
                {"package_count" in group &&
                  typeof (group as { package_count?: number })
                    .package_count === "number" && (
                    <span className="font-semibold text-eiti-muted tabular-nums">
                      {
                        (group as unknown as { package_count: number })
                          .package_count
                      }{" "}
                      datasets
                    </span>
                  )}
                <span className="text-accent/40">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {datasets.length > 0 && (
        <section className="pt-16">
          <SectionHead
            title="Recently updated"
            allHref="/search"
            allLabel="All datasets"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {datasets
              .filter((dataset) => dataset.organization?.name)
              .slice(0, 3)
              .map((dataset) => (
              <Link
                key={dataset.id}
                href={`/@${dataset.organization?.name}/${dataset.name}`}
                className="flex min-h-[128px] min-w-0 flex-col justify-between rounded-lg border border-eiti-border border-l-2 border-l-eiti-amber bg-white px-5 py-4 transition-all hover:border-eiti-borderinput hover:shadow-sm"
              >
                <div className="min-w-0">
                  {dataset.metadata_modified && (
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-label text-eiti-amberink">
                      Updated {getTimeAgo(dataset.metadata_modified)}
                    </div>
                  )}
                  <div className="text-base font-extrabold leading-snug text-accent break-words">
                    {dataset.title || dataset.name}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs text-eiti-muted">
                    <ResourcesBadges resources={dataset.resources} />
                    {dataset.organization?.title}
                  </span>
                  <span className="text-accent/40">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="pt-16">
        <SectionHead title="How the portal works" />
        <div className="grid gap-8 md:grid-cols-3">
          {howItWorks.map((item) => (
            <div key={item.n}>
              <span className="text-[13px] font-extrabold text-eiti-amberink tabular-nums">
                {item.n}
              </span>
              <h3 className="mt-2 text-[17px] font-extrabold text-accent">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-eiti-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
