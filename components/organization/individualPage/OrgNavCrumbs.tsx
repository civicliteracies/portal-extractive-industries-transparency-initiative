import Link from "next/link";

export default function OrgNavCrumbs({
  org,
}: {
  org: { name?: string; title?: string };
}) {
  return (
    <nav className="custom-container mx-auto">
      <span className="inline-flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-label text-accent">
        <Link href="/" className="hover:border-b hover:border-eiti-amber">
          Home
        </Link>
        <span className="opacity-40">&rsaquo;</span>
        <Link
          href="/organizations"
          className="hover:border-b hover:border-eiti-amber"
        >
          Organizations
        </Link>
        {org.name && org.title && (
          <>
            <span className="opacity-40">&rsaquo;</span>
            <Link
              href={`/@${org.name}`}
              className="hover:border-b hover:border-eiti-amber"
            >
              {org.title}
            </Link>
          </>
        )}
      </span>
    </nav>
  );
}
