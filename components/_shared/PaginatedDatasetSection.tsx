import { Dataset } from "@portaljs/ckan";
import { useState } from "react";
import useSWR from "swr";
import DatasetList from "./DatasetList";
import QueryPagination from "./QueryPagination";
import {
  searchGroupDatasets,
  searchOrganizationDatasets,
} from "@/lib/queries/dataset";

export default function PaginatedDatasetSection({
  count,
  datasets,
  limit,
  offset,
  name,
  type,
}: {
  count: number;
  datasets: Dataset[];
  limit: number;
  offset: number;
  name: string;
  type: "group" | "organization";
}) {
  const [currentOffset, setCurrentOffset] = useState(offset);
  const [subset, setSubset] = useState(Math.floor(offset / limit / 5) * 5);
  const { data } = useSWR(
    [type, name, currentOffset, limit],
    async () => {
      if (type === "group") {
        return searchGroupDatasets({
          group: name,
          offset: currentOffset,
          limit,
        });
      }

      return searchOrganizationDatasets({
        org: name,
        offset: currentOffset,
        limit,
      });
    },
    {
      fallbackData: {
        count,
        datasets,
      },
    }
  );

  return (
    <div className="py-8 w-full basis-full flex flex-col gap-y-4">
      <DatasetList
        datasets={data?.datasets || []}
        className="py-8 w-full max-h-none flex flex-col gap-y-4"
      />
      {(data?.count || count) > limit && (
        <QueryPagination
          count={data?.count || count}
          limit={limit}
          currentPage={Math.floor(currentOffset / limit)}
          subset={subset}
          setOffset={setCurrentOffset}
          setSubset={setSubset}
        />
      )}
    </div>
  );
}
