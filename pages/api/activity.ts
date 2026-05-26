import type { NextApiRequest, NextApiResponse } from "next";
import { getActivityStreamPage } from "@/lib/queries/activity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const entityId = req.query.entityId;
  const entityType = req.query.entityType;
  const limit = Number(req.query.limit || 20);
  const offset = Number(req.query.offset || 0);

  if (
    typeof entityId !== "string" ||
    (entityType !== "group" &&
      entityType !== "organization" &&
      entityType !== "dataset")
  ) {
    return res.status(400).json({ error: "Invalid activity query" });
  }

  try {
    const result = await getActivityStreamPage({
      entityId,
      entityType,
      limit,
      offset,
    });

    return res.status(200).json(result);
  } catch {
    return res.status(500).json({ error: "Failed to fetch activity stream" });
  }
}
