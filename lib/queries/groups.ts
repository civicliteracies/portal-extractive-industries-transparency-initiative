import { Dataset, Group } from "@portaljs/ckan";
import {
  CkanResponse,
  privateToPublicDatasetName,
  privateToPublicGroupName,
  privateToPublicOrgName,
  publicToPrivateGroupName,
} from "./utils";
import ky from "ky";

export const getAllGroups = async ({
  detailed = true,
}: {
  detailed: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const dms = process.env.NEXT_PUBLIC_DMS;

  const response: CkanResponse<Group[]> = await ky
    .get(`${dms}/@${mainOrg}/api/3/action/group_list?all_fields=true`)
    .json();

  return response.result;
};

export const getGroup = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const mainGroup = `${mainOrg}-group`;
  const dms = process.env.NEXT_PUBLIC_DMS;
  const privateName = publicToPrivateGroupName(name, mainGroup);

  const group: CkanResponse<Group> = await ky
    .get(
      `${dms}/api/3/action/group_show?id=${privateName}&include_datasets=${include_datasets}`
    )
    .json();

  if (include_datasets) {
    group.result.packages.forEach((dataset: Dataset) => {
      const publicOrgName = privateToPublicOrgName(
        dataset.organization.name,
        mainOrg
      );
      dataset.organization.name = publicOrgName;

      const publicDatasetName = privateToPublicDatasetName(
        dataset.name,
        mainOrg
      );
      dataset.name = publicDatasetName;
    });
  }

  const publicName = privateToPublicGroupName(group.result.name, mainGroup);

  return { ...group.result, name: publicName, _name: group.result.name };
};
