import Link from "next/link";

export default function GroupNavCrumbs({
  group,
}: {
  group: { name?: string; title?: string };
}) {
  return (
    <nav className="custom-container mx-auto">
      <span className="inline-flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-label text-accent">
        <Link href="/" className="hover:border-b hover:border-eiti-amber">
          Home
        </Link>
        <span className="opacity-40">&rsaquo;</span>
        <Link href="/groups" className="hover:border-b hover:border-eiti-amber">
          Groups
        </Link>
        {group.name && group.title && (
          <>
            <span className="opacity-40">&rsaquo;</span>
            <Link
              href={`/groups/${group.name}`}
              className="hover:border-b hover:border-eiti-amber"
            >
              {group.title}
            </Link>
          </>
        )}
      </span>
    </nav>
  );
}
