import getConfig from "next/config";
import Image from "next/image";
import Link from "next/link";
import { Group } from "@portaljs/ckan";
import { parseUrl } from "@/lib/utils";

type GroupCardProps = Pick<
  Group,
  "display_name" | "image_display_url" | "description" | "name"
>;

function groupInitials(displayName: string): string {
  return displayName
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function GroupCard({
  display_name,
  image_display_url,
  description,
  name,
}: GroupCardProps) {
  const url = parseUrl(image_display_url);
  const hasCustomImage =
    image_display_url &&
    url &&
    (getConfig().publicRuntimeConfig.DOMAINS ?? []).includes(url.hostname);
  return (
    <Link
      href={`/categories/${name}`}
      className="flex h-full flex-col gap-4 rounded-lg border border-eiti-border bg-white px-5 py-6 transition-all hover:border-eiti-borderinput hover:shadow-sm"
    >
      {hasCustomImage ? (
        <Image
          src={image_display_url}
          alt=""
          width="40"
          height="40"
          className="rounded-md object-contain"
        />
      ) : (
        <span className="grid h-10 w-10 place-items-center rounded-md bg-accent text-[13px] font-extrabold text-white">
          {groupInitials(display_name || name)}
        </span>
      )}
      <div>
        <h3 className="text-[19px] font-extrabold text-accent">
          {display_name}
        </h3>
        <p className="mt-1 line-clamp-3 text-sm text-eiti-muted">
          {description}
        </p>
      </div>
      <span className="mt-auto flex items-center justify-between text-sm font-bold text-accent">
        View category
        <span className="text-accent/40">&rarr;</span>
      </span>
    </Link>
  );
}
