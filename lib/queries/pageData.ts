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

export type DatasetDetailData = {
  _name: string;
  activity_stream?: unknown[];
  activity_stream_has_more?: boolean;
  author: string | null;
  author_email: string | null;
  groups: Array<{ title: string | null }>;
  id: string;
  metadata_created: string | null;
  metadata_modified: string | null;
  name: string;
  notes: string | null;
  organization: {
    name: string;
    title: string | null;
  };
  resources: Array<{
    description: string | null;
    format: string | null;
    id: string;
    iframe: boolean | null;
    name: string | null;
    url: string | null;
  }>;
  tags: Array<{ display_name: string | null; id: string }>;
  title: string | null;
  version: string | null;
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

export function trimDatasetDetailData(dataset: Dataset & { _name: string }): DatasetDetailData {
  return {
    _name: dataset._name,
    author: dataset.author ?? null,
    author_email: dataset.author_email ?? null,
    groups: (dataset.groups || []).map((group) => ({
      title: group.title ?? null,
    })),
    id: dataset.id,
    metadata_created: dataset.metadata_created ?? null,
    metadata_modified: dataset.metadata_modified ?? null,
    name: dataset.name,
    notes: dataset.notes ?? null,
    organization: {
      name: dataset.organization.name,
      title: dataset.organization.title ?? null,
    },
    resources: (dataset.resources || []).map((resource) => ({
      description: resource.description ?? null,
      format: resource.format ?? null,
      id: resource.id,
      iframe: "iframe" in resource ? resource.iframe ?? null : null,
      name: resource.name ?? null,
      url: resource.url ?? null,
    })),
    tags: (dataset.tags || []).map((tag) => ({
      display_name: tag.display_name ?? null,
      id: tag.id,
    })),
    title: dataset.title ?? null,
    version: dataset.version ?? null,
  };
}
