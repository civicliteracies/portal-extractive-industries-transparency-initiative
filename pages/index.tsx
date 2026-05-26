import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Hero from "../components/home/heroSection/Hero";
import { StatsProps } from "../components/home/heroSection/Stats";
import MainSection from "../components/home/mainSection/MainSection";
import Layout from "../components/_shared/Layout";
import { Dataset, Group } from "@portaljs/ckan";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";

type HomepageDataset = Pick<
  Dataset,
  "id" | "metadata_modified" | "name" | "title"
> & {
  organization: Pick<Dataset["organization"], "name">;
};

type HomepageGroup = Pick<
  Group,
  "description" | "display_name" | "id" | "image_display_url" | "name"
>;

export async function getStaticProps() {
  const datasets = await searchDatasets({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });
  const groups = await getAllGroups({ detailed: true });
  const featuredGroups: HomepageGroup[] = groups.slice(0, 4).map((group) => ({
    description: group.description,
    display_name: group.display_name,
    id: group.id,
    image_display_url: group.image_display_url,
    name: group.name,
  }));
  const recentDatasets: HomepageDataset[] = datasets.datasets.map((dataset) => ({
    id: dataset.id,
    metadata_modified: dataset.metadata_modified,
    name: dataset.name,
    organization: {
      name: dataset.organization.name,
    },
    title: dataset.title,
  }));
  const stats: StatsProps = {
    datasetCount: datasets.count,
    groupCount: groups.length,
  };
  return {
    props: {
      datasets: recentDatasets,
      groups: featuredGroups,
      stats,
    },
    revalidate: 1800,
  };
}

export default function Home({
  datasets,
  groups,
  stats,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>EITI Open Data Portal</title>
        <meta name="description" content="EITI Open Data Portal" />
        <link rel="icon" href="https://totalenergies.com/sites/g/files/nytnzq121/files/styles/w_1110/public/images/2022-04/Logo_EITI.png?itok=ZtERfO-0" />
      </Head>
      <Layout>
        <Hero stats={stats} />
        <MainSection groups={groups} datasets={datasets} />
      </Layout>
    </>
  );
}
