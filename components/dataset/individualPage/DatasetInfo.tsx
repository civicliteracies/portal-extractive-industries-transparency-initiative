import Link from "next/link";
import { Resource, Tag } from "@portaljs/ckan";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { getTimeAgo } from "@/lib/utils";
import { Dataset } from "@/schemas/dataset.interface";
import { RiExternalLinkLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import MarkdownRenderer from "@/components/_shared/MarkdownRenderer";

function uniqueFormat(resources) {
  const formats = resources.map((item: Resource) => item.format);
  return [...new Set(formats)];
}

function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-eiti-bordersubtle py-2 text-sm last:border-b-0">
      <span className="text-xs font-bold uppercase tracking-label text-eiti-muted">
        {label}
      </span>
      <span className="text-right font-semibold text-eiti-ink tabular-nums">
        {value}
      </span>
    </div>
  );
}

export default function DatasetInfo({ dataset }: { dataset: Dataset }) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const description = dataset.notes?.replace(/<\/?[^>]+(>|$)/g, "");

  const metaFormats = [
    { format: "jsonld", label: "JSON-LD" },
    { format: "rdf", label: "RDF" },
    { format: "ttl", label: "TTL" },
  ];

  const dmsUrl = process.env.NEXT_PUBLIC_DMS || "";
  const { dmsBaseUrl, dmsDatasetName } = (() => {
    if (!dmsUrl) {
      return { dmsBaseUrl: "", dmsDatasetName: dataset.name };
    }

    try {
      const url = new URL(dmsUrl);
      const orgPath = url.pathname.replace(/^\/+|\/+$/g, "");
      const orgName = orgPath.startsWith("@") ? orgPath.slice(1) : orgPath;

      return {
        dmsBaseUrl: url.origin,
        dmsDatasetName: orgName ? `${orgName}--${dataset.name}` : dataset.name,
      };
    } catch {
      return { dmsBaseUrl: dmsUrl, dmsDatasetName: dataset.name };
    }
  })();

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      requestAnimationFrame(() => {
        setIsTruncated(el.scrollHeight > el.clientHeight);
      });
    }
  }, [dataset.notes]);

  return (
    <div className="rounded-lg border border-eiti-border bg-white p-5">
      {dataset.type === "visualization" && !!dataset.external_url && (
        <a
          href={dataset.external_url}
          className="mb-3 flex items-center gap-1 text-sm font-bold text-accent hover:text-eiti-navy2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiExternalLinkLine className="h-4 w-4" />
          Access visualization
        </a>
      )}
      <div>
        {!!dataset.resources.length && (
          <MetaRow label="Files" value={dataset.resources.length} />
        )}
        {!!dataset.resources.length && (
          <MetaRow
            label="Formats"
            value={uniqueFormat(dataset.resources).join(", ")}
          />
        )}
        {dataset.metadata_created && (
          <MetaRow label="Created" value={getTimeAgo(dataset.metadata_created)} />
        )}
        {dataset.metadata_modified && (
          <MetaRow
            label="Updated"
            value={getTimeAgo(dataset.metadata_modified)}
          />
        )}
      </div>
      {dataset.source && dataset.source.length > 0 && (
        <div className="mt-4 text-sm">
          <span className="text-xs font-bold uppercase tracking-label text-eiti-muted">
            Source{dataset.source.length > 1 ? "s" : ""}
          </span>
          <div className="mt-1 flex flex-col gap-1.5">
            {dataset.source.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 break-all text-accent transition hover:text-eiti-navy2"
              >
                <RiExternalLinkLine className="h-4 w-4 flex-shrink-0" />
                <span className="underline">{url}</span>
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 border-t border-eiti-bordersubtle pt-4">
        {description ? (
          <>
            <div
              ref={textRef}
              className={`text-sm text-eiti-muted transition-all ${
                !showFullDescription ? "line-clamp-4" : ""
              }`}
            >
              <MarkdownRenderer content={description} />
            </div>
            {isTruncated && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-sm font-semibold text-accent hover:text-eiti-navy2"
              >
                {showFullDescription ? (
                  <span className="flex items-center">
                    Read less <ChevronUpIcon className="w-4" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Read more <ChevronDownIcon className="w-4" />
                  </span>
                )}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm text-eiti-muted">
            <span className="opacity-40">&mdash;</span> No description provided
          </p>
        )}
      </div>
      {!!dataset.tags?.length && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {dataset.tags.map((tag: Tag) => (
            <span
              className="rounded-full border border-eiti-borderinput bg-white px-3 py-1 text-xs font-semibold text-accent"
              key={tag.id}
            >
              {tag.display_name}
            </span>
          ))}
        </div>
      )}
      <div className="mt-4 border-t border-eiti-bordersubtle pt-4">
        <span className="text-xs font-bold uppercase tracking-label text-accent">
          Export metadata
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          {metaFormats.map((item) => (
            <Link
              key={item.format}
              href={`${dmsBaseUrl}/dataset/${dmsDatasetName}.${item.format}`}
              className="rounded-full border border-eiti-borderinput bg-white px-3 py-1 text-xs font-semibold text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
