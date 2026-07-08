import { Resource } from "@portaljs/ckan";
import { resourceBgColors, resourceFormatColors } from "./FormatsColors";

import Color from "color";

export default function ResourcesBadges({
  resources,
}: {
  resources?: Resource[];
}) {
  const _unique_resources = Array.from(
    new Map(resources.map((item) => [item.format, item])).values()
  );

  const visibleResources = _unique_resources.slice(0, 3);

  return (
    <div className="flex gap-1 flex-wrap">
      {visibleResources.map((res, index) => {
        // Unknown or missing formats fall back to the muted archive tone so
        // Color() never receives undefined.
        const color =
          resourceFormatColors[
            res.format?.toUpperCase() as keyof typeof resourceFormatColors
          ] ?? "#55607A";
        return (
          <span
            key={index}
            className={`inline-flex items-center rounded px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.04em]`}
            style={{
              color: Color(color).mix(Color("#000000"), 0.4).hex(),
              background: Color(color).mix(Color("#ffffff"), 0.88).hex(),
            }}
          >
            {res.format || "—"}
          </span>
        );
      })}
    </div>
  );
}
