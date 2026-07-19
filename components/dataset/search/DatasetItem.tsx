import Link from "next/link";
import { Dataset } from "@portaljs/ckan";
import ResourcesBadges from "../_shared/ResourcesBadges";
import { getTimeAgo } from "@/lib/utils";

export default function DatasetItem({
  dataset,
  showOrg = true,
}: {
  dataset: Dataset;
  showOrg?: boolean;
}) {
  return (
    <Link
      href={`/@${dataset.organization.name}/${dataset.name}`}
      className="group block rounded-lg border border-eiti-border bg-white p-5 transition-all hover:border-eiti-borderinput hover:shadow-sm"
    >
      <div className="text-[17px] font-extrabold leading-snug text-accent break-words">
        <span className="border-b-2 border-transparent group-hover:border-eiti-amber">
          {dataset.title}
        </span>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-eiti-muted">
        {dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "") || "No description"}
      </p>
      <div className="mt-3 flex flex-col gap-1 text-xs font-semibold text-eiti-muted md:flex-row md:flex-wrap md:items-center md:gap-x-4">
        {showOrg && dataset.organization?.title && (
          <span className="font-bold text-accent">
            {dataset.organization.title}
          </span>
        )}
        {dataset.metadata_modified && (
          <span className="tabular-nums">
            Updated {getTimeAgo(dataset.metadata_modified)}
          </span>
        )}
        {!!dataset.groups?.length && (
          <span className="line-clamp-1">
            {dataset.groups.map((g) => g.display_name || g.name).join(", ")}
          </span>
        )}
      </div>
      <div className="mt-3">
        <ResourcesBadges resources={dataset.resources} />
      </div>
    </Link>
  );
}
