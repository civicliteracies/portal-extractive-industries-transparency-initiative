const siteNav = [
  { name: "Search", href: "/search" },
  { name: "Organizations", href: "/organizations" },
  { name: "Groups", href: "/groups" },
];

const LighterThemeFooter: React.FC = () => {
  return (
    <footer className="bg-eiti-navy text-white/75 mt-24">
      <div className="custom-container mx-auto py-12 flex flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-md space-y-4">
          <a href="https://eiti.org/" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/logos/eiti-logo-negative.png"
              alt="EITI"
              width={109}
              height={40}
              className="block h-10 w-auto object-contain"
            />
          </a>
          <p className="text-sm leading-relaxed">
            Developed by the{" "}
            <a
              href="https://civicliteraci.es"
              title="Civic Literacy Initiative"
              className="font-semibold text-white hover:text-eiti-amber transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Civic Literacy Initiative (CLi)
            </a>{" "}
            and powered by{" "}
            <a
              href="https://portaljs.com"
              title="PortalJS"
              className="font-semibold text-white hover:text-eiti-amber transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              PortalJS
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav className="flex flex-col gap-2">
            {siteNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-white hover:text-eiti-amber transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <a
              href="https://eiti.org/open-data"
              className="text-sm hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data license
            </a>
            <a
              href="https://eiti.org/"
              className="text-sm hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data source
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="custom-container mx-auto py-5 text-[13px] text-white/55">
          Extractive Industries Transparency Initiative &middot; Open data
          portal
        </div>
      </div>
    </footer>
  );
};

export default LighterThemeFooter;
