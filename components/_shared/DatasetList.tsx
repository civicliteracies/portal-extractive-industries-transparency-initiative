import { Dataset } from "@portaljs/ckan";
import DatasetCard from "../dataset/search/DatasetCard";

interface DatasetListProps {
  datasets: Array<Dataset>;
  className?: string;
}
export default function DatasetList({
  datasets,
  className = "py-8 w-full max-h-[600px] flex flex-col gap-y-4",
}: DatasetListProps) {
  return (
    <div className={className}>
      {datasets.map((dataset: Dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  );
}
