import getConfig from "next/config";
import Image from "next/image";
import { Tag } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import { getTimeAgo, parseUrl } from "@/lib/utils";

function groupInitials(displayName: string): string {
  return displayName
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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

export default function GroupInfo({ group }: { group: Group }) {
  const url = parseUrl(group.image_display_url);
  const hasCustomImage =
    group.image_display_url &&
    url &&
    (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname);

  const description = group.description?.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="rounded-lg border border-eiti-border bg-white p-5">
      <div className="flex items-center gap-4">
        {hasCustomImage ? (
          <Image
            width={56}
            height={56}
            src={group.image_display_url}
            alt=""
            className="rounded-md object-contain"
          />
        ) : (
          <span className="grid h-14 w-14 flex-none place-items-center rounded-md bg-accent text-lg font-extrabold text-white">
            {groupInitials(group.title || group.name || "")}
          </span>
        )}
        <span className="text-base font-extrabold text-accent">
          {group.title || group.name}
        </span>
      </div>
      <div className="mt-4">
        <MetaRow label="Datasets" value={group.package_count || 0} />
        {group.created && (
          <MetaRow label="Created" value={getTimeAgo(group.created)} />
        )}
      </div>
      <div className="mt-4">
        {description ? (
          <p className="line-clamp-4 text-sm text-eiti-muted">{description}</p>
        ) : (
          <p className="text-sm text-eiti-muted">
            <span className="opacity-40">&mdash;</span> No description provided
          </p>
        )}
      </div>
      {!!group.tags?.length && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {group.tags.map((tag: Tag) => (
            <span
              className="rounded-full border border-eiti-borderinput bg-white px-3 py-1 text-xs font-semibold text-accent"
              key={tag.id}
            >
              {tag.display_name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
