import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";

export default function DatasetNavCrumbs({
  datasetType = "dataset",
  datasetsLinkHref = "/search",
  org,
  dataset,
}: {
  datasetType: string;
  datasetsLinkHref: string;
  org: { name?: string; title?: string };
  dataset: { name: string; title: string };
}) {
  return (
    <nav className="custom-container mx-auto">
      <span className="inline-flex max-w-full flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap text-xs font-bold uppercase tracking-label text-accent">
        <Link href="/" className="hover:border-b hover:border-eiti-amber">
          Home
        </Link>
        <span className="opacity-40">&rsaquo;</span>
        <Link
          href={datasetsLinkHref}
          className="hover:border-b hover:border-eiti-amber"
        >
          {capitalizeFirstLetter(datasetType)}s
        </Link>
        {org.name && (
          <>
            <span className="opacity-40">&rsaquo;</span>
            <Link
              href={`/@${org.name}`}
              className="hover:border-b hover:border-eiti-amber"
            >
              {org.title || org.name}
            </Link>
          </>
        )}
        <span className="opacity-40">&rsaquo;</span>
        <span className="font-bold normal-case tracking-normal text-eiti-muted">
          {dataset.title || dataset.name}
        </span>
      </span>
    </nav>
  );
}
