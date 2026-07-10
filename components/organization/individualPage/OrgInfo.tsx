import getConfig from "next/config";
import Image from "next/image";
import { Tag } from "ckan";
import { Organization } from "ckan";
import { getTimeAgo, parseUrl } from "@/lib/utils";

function orgInitials(displayName: string): string {
  const words = displayName.replace(/^EITI\s+/i, "").split(/\s+/);
  const initials =
    words.length > 1 ? words.map((w) => w[0]).join("") : words[0] ?? "";
  return initials.slice(0, 2).toUpperCase();
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

export default function OrgInfo({ org }: { org: Organization }) {
  const url = parseUrl(org.image_display_url);
  const hasCustomImage =
    org.image_display_url &&
    url &&
    (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname);

  const description = org.description?.replace(/<\/?[^>]+(>|$)/g, "");

  return (
    <div className="rounded-lg border border-eiti-border bg-white p-5">
      <div className="flex items-center gap-4">
        {hasCustomImage ? (
          <Image
            width={56}
            height={56}
            src={org.image_display_url}
            alt=""
            className="rounded-md object-contain"
          />
        ) : (
          <span className="grid h-14 w-14 flex-none place-items-center rounded-md bg-accent text-lg font-extrabold text-white">
            {orgInitials(org.title || org.name || "")}
          </span>
        )}
        <span className="text-base font-extrabold text-accent">
          {org.title || org.name}
        </span>
      </div>
      <div className="mt-4">
        <MetaRow label="Datasets" value={org.package_count || 0} />
        {org.created && (
          <MetaRow label="Created" value={getTimeAgo(org.created)} />
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
      {!!org.tags?.length && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {org.tags.map((tag: Tag) => (
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
