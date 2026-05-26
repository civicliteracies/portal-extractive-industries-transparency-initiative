import { Dataset } from "@portaljs/ckan";
import { Group } from "@portaljs/ckan";
import { Organization } from "@portaljs/ckan";

export type DatasetCardDataset = Pick<
  Dataset,
  "id" | "name"
> & {
  metadata_created: string | null;
  notes: string | null;
  organization: {
    name: string;
    title: string | null;
  };
  resources: Array<
    {
      format: string | null;
      id: string;
      name: string | null;
    }
  >;
  title: string | null;
};

export function trimDatasetCardData(
  datasets: Dataset[] = []
): DatasetCardDataset[] {
  return datasets.map((dataset) => ({
    id: dataset.id,
    metadata_created: dataset.metadata_created ?? null,
    name: dataset.name,
    notes: dataset.notes ?? null,
    organization: {
      name: dataset.organization.name,
      title: dataset.organization.title ?? null,
    },
    resources: (dataset.resources || []).map((resource) => ({
      format: resource.format ?? null,
      id: resource.id,
      name: resource.name ?? null,
    })),
    title: dataset.title ?? null,
  }));
}

export type SearchGroupOption = {
  display_name: string | null;
  id: string;
  name: string;
};

export type SearchOrganizationOption = {
  display_name: string | null;
  id: string;
  name: string;
  title: string | null;
};

export function trimSearchGroups(groups: Group[] = []): SearchGroupOption[] {
  return groups.map((group) => ({
    display_name: group.display_name ?? null,
    id: group.id,
    name: group.name,
  }));
}

export function trimSearchOrganizations(
  orgs: Organization[] = []
): SearchOrganizationOption[] {
  return orgs.map((org) => ({
    display_name: org.display_name ?? null,
    id: org.id,
    name: org.name,
    title: org.title ?? null,
  }));
}
