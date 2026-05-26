import ky from "ky";
import { Activity } from "@portaljs/ckan";

const DEFAULT_ACTIVITY_LIMIT = 20;

type ActivityEntityType = "dataset" | "group" | "organization";

export function trimActivityStream(
  activities: Activity[] = [],
  limit = DEFAULT_ACTIVITY_LIMIT
) {
  return activities.slice(0, limit).map((activity) => ({
    activity_type: activity.activity_type,
    data: {
      package: {
        title: activity.data?.package?.title ?? null,
      },
    },
    id: activity.id,
    timestamp: activity.timestamp,
    user_data: activity.user_data
      ? {
          fullname: activity.user_data.fullname,
          image_display_url: activity.user_data.image_display_url,
        }
      : null,
  }));
}

async function getUserData(userId?: string | null) {
  if (!userId) {
    return null;
  }

  try {
    const response = await ky
      .get(
        `${process.env.NEXT_PUBLIC_DMS}/api/3/action/user_show?id=${userId}`
      )
      .json<{ success: boolean; result?: Activity["user_data"] }>();

    return response.success ? response.result ?? null : null;
  } catch {
    return null;
  }
}

export async function getActivityStreamPage({
  entityId,
  entityType,
  limit = DEFAULT_ACTIVITY_LIMIT,
  offset = 0,
}: {
  entityId: string;
  entityType: ActivityEntityType;
  limit?: number;
  offset?: number;
}) {
  const actionName =
    entityType === "group"
      ? "group_activity_list"
      : entityType === "organization"
      ? "organization_activity_list"
      : "package_activity_list";

  const response = await ky
    .get(
      `${process.env.NEXT_PUBLIC_DMS}/api/3/action/${actionName}?id=${entityId}&offset=${offset}&limit=${limit}`
    )
    .json<{ result: Activity[] }>();

  const activities = await Promise.all(
    response.result.map(async (activity) => ({
      ...activity,
      user_data: await getUserData(activity.user_id),
    }))
  );

  return {
    activities: trimActivityStream(activities, limit),
    hasMore: activities.length === limit,
  };
}
