import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function OrganizationPageStructuredData() {
  const title = "Countries"
  const description = "Countries page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/countries`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/countries`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/countries`,
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
            name: 'Countries Page',
            item: `${url}/countries`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/countries#webpage`}
        url={`${url}/countries`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/countries`}
        potentialActions={[
          {
            target: `${url}/countries`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}