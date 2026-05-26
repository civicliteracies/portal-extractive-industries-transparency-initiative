import { Dataset } from "@portaljs/ckan";

export type DatasetCardDataset = Pick<
  Dataset,
  "id" | "metadata_created" | "name" | "notes" | "title"
> & {
  organization: Pick<Dataset["organization"], "name" | "title">;
  resources: Array<
    Pick<Dataset["resources"][number], "format" | "id" | "name">
  >;
};

export function trimDatasetCardData(
  datasets: Dataset[] = []
): DatasetCardDataset[] {
  return datasets.map((dataset) => ({
    id: dataset.id,
    metadata_created: dataset.metadata_created,
    name: dataset.name,
    notes: dataset.notes,
    organization: {
      name: dataset.organization.name,
      title: dataset.organization.title,
    },
    resources: (dataset.resources || []).map((resource) => ({
      format: resource.format,
      id: resource.id,
      name: resource.name,
    })),
    title: dataset.title,
  }));
}
