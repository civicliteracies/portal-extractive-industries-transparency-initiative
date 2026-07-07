import Link from "next/link";
import SearchForm from "./SearchForm";

const suggestions = ["summary data", "Chad", "reconciliation", "production"];

function Stat({
  count,
  label,
  href,
}: {
  count: number;
  label: string;
  href: string;
}) {
  return (
    <Link href={href} className="block border-l-2 border-eiti-amber pl-4">
      <span className="block text-4xl lg:text-[40px] font-extrabold text-white leading-tight tabular-nums">
        {count}
      </span>
      <span className="text-xs font-bold uppercase tracking-label text-white/60">
        {label}
      </span>
    </Link>
  );
}

export default function HeroSectionLight({
  stats,
}: {
  stats: {
    orgCount: number;
    groupCount: number;
    datasetCount: number;
    visualizationCount: number;
  };
}) {
  return (
    <div className="bg-gradient-to-br from-eiti-navy via-[#0E2148] to-eiti-navy2">
      <div className="custom-container mx-auto grid lg:grid-cols-[1.25fr_1fr] items-center gap-10 py-16 lg:py-24">
        <div>
          <span className="text-xs font-bold uppercase tracking-label text-eiti-amber">
            Extractive Industries Transparency Initiative
          </span>
          <h1 className="mt-4 text-4xl md:text-[52px] font-extrabold leading-[1.08] tracking-tight text-white">
            What countries earn from{" "}
            <em className="not-italic text-eiti-amber">
              oil, gas and minerals
            </em>{" "}
            &mdash; as open data.
          </h1>
          <p className="mt-5 max-w-[54ch] text-[17px] text-white/[.78]">
            A repository of the reports and data submitted by EITI member
            countries &mdash; what governments and companies disclose about the
            extractive sector.
          </p>
          <div className="mt-8 max-w-[560px]">
            <SearchForm datasetCount={stats.datasetCount} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <span>Try</span>
            {suggestions.map((s) => (
              <Link
                key={s}
                href={{ pathname: "/search", query: { q: s } }}
                className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold text-white/85 transition-colors hover:border-white/50 hover:bg-white/10 hover:text-white"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:gap-6">
          <Stat count={stats.datasetCount} label="Datasets" href="/search" />
          <Stat
            count={stats.orgCount}
            label="Countries"
            href="/organizations"
          />
          <Stat count={stats.groupCount} label="Groups" href="/groups" />
          {!!stats.visualizationCount && (
            <Stat
              count={stats.visualizationCount}
              label="Visualizations"
              href="/search?type=visualization"
            />
          )}
        </div>
      </div>
    </div>
  );
}
