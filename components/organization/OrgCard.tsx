import { Organization } from "@portaljs/ckan";
import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";

type OrgCardProps = Pick<
  Organization,
  "display_name" | "image_display_url" | "description" | "name"
> & { packageCount?: number };

function orgInitials(displayName: string): string {
  const words = displayName.replace(/^EITI\s+/i, "").split(/\s+/);
  const initials =
    words.length > 1 ? words.map((w) => w[0]).join("") : words[0] ?? "";
  return initials.slice(0, 2).toUpperCase();
}

export default function OrgCard({
  display_name,
  image_display_url,
  description,
  name,
  packageCount,
}: OrgCardProps) {
  const url = image_display_url ? new URL(image_display_url) : undefined;
  const hasCustomImage =
    image_display_url &&
    url &&
    (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname);
  return (
    <Link
      href={`/@${name}`}
      className="flex h-full items-center gap-4 rounded-lg border border-eiti-border bg-white px-5 py-4 transition-all hover:border-eiti-borderinput hover:shadow-sm"
    >
      {hasCustomImage ? (
        <Image
          src={image_display_url}
          alt=""
          width="40"
          height="40"
          className="flex-none rounded-md object-contain"
        />
      ) : (
        <span className="grid h-10 w-10 flex-none place-items-center rounded-md bg-accent text-[13px] font-extrabold text-white">
          {orgInitials(display_name || name)}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[15px] font-extrabold leading-snug text-accent">
          {display_name}
        </span>
        {typeof packageCount === "number" ? (
          <span className="mt-0.5 block text-xs text-eiti-muted tabular-nums">
            {packageCount} {packageCount === 1 ? "dataset" : "datasets"}
          </span>
        ) : (
          description && (
            <span className="mt-0.5 block truncate text-xs text-eiti-muted">
              {description}
            </span>
          )
        )}
      </span>
      <span className="ml-auto flex-none text-accent/40">&rarr;</span>
    </Link>
  );
}
