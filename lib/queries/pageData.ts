import { Dataset } from "@portaljs/ckan";

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
