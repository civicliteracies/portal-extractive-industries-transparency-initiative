export default function FacetCard({
  title,
  children,
  showClear,
  clearAction,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  showClear?: boolean;
  clearAction?: Function;
}) {
  return (
    <section className="mb-4 overflow-hidden rounded-lg border border-eiti-border bg-white">
      {title && (
        <div className="flex items-center justify-between border-b border-eiti-bordersubtle px-5 py-3.5">
          <h2 className="m-0 text-xs font-bold uppercase tracking-label text-accent">
            {title}
          </h2>
          {showClear && (
            <span
              role="button"
              className="cursor-pointer text-xs font-semibold text-eiti-muted hover:text-accent"
              onClick={() => clearAction && clearAction()}
            >
              Clear
            </span>
          )}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}
