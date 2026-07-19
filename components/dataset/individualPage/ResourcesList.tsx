import { Resource } from "@/schemas/resource.interface";
import Link from "next/link";
import { RiDownload2Fill, RiEyeLine } from "react-icons/ri";
import ResourcesBadges from "../_shared/ResourcesBadges";

interface ResourcesListProps {
  resources: Array<Resource>;
  orgName: string;
  datasetName: string;
}
export default function ResourcesList({
  resources,
  orgName,
  datasetName,
}: ResourcesListProps) {
  return (
    <div className="flex w-full flex-col gap-3 py-6">
      {resources.map((resource: Resource) => (
        <div
          key={resource.id}
          className="flex w-full flex-col gap-4 rounded-lg border border-eiti-border bg-white px-5 py-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="min-w-0 grow">
            <h4 className="text-[15px] font-bold leading-snug text-accent line-clamp-3 break-words">
              {resource.name || "No title"}
            </h4>
            {resource.description ? (
              <p className="mt-1 line-clamp-2 text-sm text-eiti-muted">
                {resource.description}
              </p>
            ) : (
              <p className="mt-1 text-sm text-eiti-muted">
                <span className="opacity-40">&mdash;</span> No description
              </p>
            )}
            <div className="mt-2">
              <ResourcesBadges resources={[resource]} />
            </div>
          </div>
          <div className="flex flex-none gap-2 pt-2 sm:pt-0">
            {(["csv", "pdf", "xlsx", "xls", "geojson"].includes(
              (resource.format ?? "").toLowerCase()
            ) ||
              resource?.iframe) && (
              <Link
                href={`/@${orgName}/${datasetName}/r/${resource.id}`}
                className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-eiti-borderinput bg-white px-4 text-xs font-bold uppercase tracking-label text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                <RiEyeLine />
                <span>Preview</span>
              </Link>
            )}
            {resource.url && (
              <Link
                href={resource.url}
                className="flex h-9 items-center justify-center gap-1.5 rounded-md border border-accent bg-accent px-4 text-xs font-bold uppercase tracking-label text-white transition-colors hover:bg-eiti-navy2"
              >
                <RiDownload2Fill />
                <span>Download</span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
