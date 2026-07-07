import Image from "next/image";
import Link from "next/link";

// White (negative) EITI logo — legible on the navy header and footer only.
export default function PortalDefaultLogo() {
  return (
    <Link href="/">
      <Image
        src="/images/logos/eiti-logo-negative.png"
        alt="EITI"
        width={109}
        height={40}
        className="block h-10 w-auto object-contain"
      />
    </Link>
  );
}
