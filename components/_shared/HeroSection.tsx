export default function HeroSection({
  title = "Search",
  titleAccent = "",
  eyebrow = "",
  subtitle = "",
  cols = "1",
}: {
  title?: string;
  titleAccent?: string;
  eyebrow?: string;
  subtitle?: string;
  /** Unused; kept for caller compatibility until detail pages are reworked. */
  cols?: string;
}) {
  return (
    <section>
      <div className="custom-container mx-auto pt-12 pb-8">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-label text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 text-3xl md:text-[44px] font-extrabold leading-[1.12] tracking-tight text-accent capitalize break-words">
          {title}{" "}
          {titleAccent && <span className="text-eiti-navy2">{titleAccent}</span>}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-[62ch] text-base text-eiti-muted">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
