import { Activity } from "@portaljs/ckan";
import { useState } from "react";
import ActivityStream from "./ActivityStream";

export default function PaginatedActivityStream({
  entityId,
  entityType,
  initialActivities,
  initialHasMore,
  limit,
}: {
  entityId: string;
  entityType: "group" | "organization";
  initialActivities: Activity[];
  initialHasMore: boolean;
  limit: number;
}) {
  const [activities, setActivities] = useState(initialActivities);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  async function loadMore() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/activity?entityId=${encodeURIComponent(
          entityId
        )}&entityType=${entityType}&offset=${activities.length}&limit=${limit}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch activities");
      }

      setActivities((current) => [...current, ...data.activities]);
      setHasMore(data.hasMore);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-8 w-full basis-full">
      <ActivityStream
        activities={activities}
        footer={
          hasMore ? (
            <button
              className="font-semibold px-4 py-2 rounded bg-gray-200 text-gray-700"
              disabled={isLoading}
              onClick={loadMore}
              type="button"
            >
              {isLoading ? "Loading..." : "Load more"}
            </button>
          ) : null
        }
      />
    </div>
  );
}
