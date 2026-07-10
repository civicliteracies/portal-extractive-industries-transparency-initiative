import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function GroupPageStructuredData() {
  const title = "Categories"
  const description = "Categories page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/groups`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/groups`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/groups`,
          title: `${title} | ${siteTitle}`,
          description: description,
          images: [
            {
              url: imageUrl,
              alt: title,
              width: 1200,
              height: 627,
            },
          ],
          site_name: siteTitle,
        }}
        twitter={nextSeoConfig.twitter}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: url,
          },
          {
            position: 2,
            name: 'Categories Page',
            item: `${url}/groups`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/groups#webpage`}
        url={`${url}/groups`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/groups`}
        potentialActions={[
          {
            target: `${url}/groups`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}