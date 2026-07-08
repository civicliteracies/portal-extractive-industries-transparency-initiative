import PortalDefaultLogo from "@/components/_shared/PortalDefaultLogo";
import { useTheme } from "@/components/theme/theme-provider";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Search", href: "/search" },
  { name: "Organizations", href: "/organizations" },
  { name: "Groups", href: "/groups" },
];

export default function LighterThemeHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuOpen(false); // Close the menu
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <header className="bg-eiti-navy border-b border-white/10">
      <nav
        className={`mx-auto py-4 flex custom-container items-center justify-between ${theme.styles.containerWide}`}
        aria-label="Global"
      >
        <div className="flex items-center gap-x-4">
          <span className="sr-only">EITI Open Data Portal</span>
          <PortalDefaultLogo />
          <span className="hidden sm:block pl-4 border-l border-white/25 text-[11px] font-bold uppercase tracking-label leading-tight text-white/75">
            Open Data
            <br />
            Portal
          </span>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-bold uppercase tracking-label text-white py-2 border-b-2 transition-colors hover:border-eiti-amber ${
                router.asPath === item.href ||
                router.asPath.startsWith(`${item.href}/`) ||
                router.asPath.startsWith(`${item.href}?`)
                  ? "border-eiti-amber"
                  : "border-transparent"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-white border border-white/30"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-eiti-navy px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">EITI Open Data Portal</span>
            <PortalDefaultLogo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6 flex flex-col">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[13px] font-bold uppercase tracking-label text-white py-2"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
