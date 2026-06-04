import {
  CKAN,
  Organization,
  PackageSearchOptions,
} from "@portaljs/ckan";
import {
  CkanResponse,
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateDatasetName,
} from "./utils";
import ky from "ky";

export async function searchDatasets(input: PackageSearchOptions) {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;
  const dms = process.env.NEXT_PUBLIC_DMS;

  const groups = (input.groups ?? []).map((g) => `${mainGroup}--${g}`);
  const tags = input.tags ?? [];

  let fqParts: string[] = [];
  if (groups.length > 0) fqParts.push(`groups:(${groups.join(" OR ")})`);
  if (tags.length > 0) fqParts.push(`tags:(${tags.join(" OR ")})`);

  const searchParams: Record<string, string> = {
    rows: String(input.limit ?? 10),
    start: String(input.offset ?? 0),
    sort: "metadata_modified desc",
  };
  if (fqParts.length > 0) searchParams.fq = fqParts.join(" AND ");

  let baseUrl: string;
  if (input.orgs && input.orgs.length > 0) {
    // Searching specific orgs — use direct CKAN API with org filter
    const orgNames = input.orgs.map((o) =>
      o === mainOrg ? o : `${mainOrg}--${o}`
    );
    fqParts.push(`organization:(${orgNames.join(" OR ")})`);
    searchParams.fq = fqParts.join(" AND ");
    baseUrl = `${dms}/api/3/action/package_search`;
  } else {
    // No org filter — use portal-scoped API (scoped to this portal automatically)
    baseUrl = `${dms}/@${mainOrg}/api/3/action/package_search`;
  }

  const response: CkanResponse<{ results: any[]; count: number }> = await ky
    .get(baseUrl, { searchParams, timeout: false })
    .json();

  const mainGroupPrefix = `${mainGroup}--`;
  const mainOrgPrefix = `${mainOrg}--`;

  const datasets = response.result.results.map((d) => {
    const dGroups = d?.groups?.map((g: any) => ({
      ...g,
      name: g.name.startsWith(mainGroupPrefix)
        ? g.name.slice(mainGroupPrefix.length)
        : g.name,
    }));
    const orgName = d.organization?.name;
    const publicOrgName =
      orgName === mainOrg
        ? mainOrg
        : orgName?.startsWith(mainOrgPrefix)
        ? orgName.slice(mainOrgPrefix.length)
        : orgName;
    return {
      ...d,
      name: privateToPublicDatasetName(d.name, mainOrg),
      organization: { ...d.organization, name: publicOrgName },
      groups: dGroups,
    };
  });

  return { datasets, count: response.result.count };
}

export async function searchGroupDatasets({
  group,
  offset,
  limit,
}: {
  group: string;
  offset: number;
  limit: number;
}) {
  return searchDatasets({
    groups: [group],
    orgs: [],
    tags: [],
    offset,
    limit,
  });
}

export async function searchOrganizationDatasets({
  org,
  offset,
  limit,
}: {
  org: string;
  offset: number;
  limit: number;
}) {
  return searchDatasets({
    groups: [],
    orgs: [org],
    tags: [],
    offset,
    limit,
  });
}

export const getDataset = async ({ name }: { name: string }) => {
  const DMS = process.env.NEXT_PUBLIC_DMS;
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const ckan = new CKAN(DMS);
  const privateName = publicToPrivateDatasetName(name, mainOrg);
  const dataset = await ckan.getDatasetDetails(privateName);
  dataset.name = privateToPublicDatasetName(dataset.name, mainOrg);
  return {
    ...dataset,
    _name: privateName,
    organization: {
      ...dataset.organization,
      name: privateToPublicOrgName(dataset.organization.name, mainOrg),
    },
  };
};
