import { Dataset, Organization } from "@portaljs/ckan";
import {
  CkanResponse,
  privateToPublicDatasetName,
  privateToPublicOrgName,
  publicToPrivateOrgName,
} from "./utils";
import ky from "ky";

export const getOrganization = async ({
  name,
  include_datasets = false,
}: {
  name: string;
  include_datasets?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const dms = process.env.NEXT_PUBLIC_DMS;
  const privateName = publicToPrivateOrgName(name, mainOrg);

  const organization: CkanResponse<Organization> = await ky
    .get(
      `${dms}/api/3/action/organization_show?id=${privateName}&include_datasets=${include_datasets}`
    )
    .json();

  if (include_datasets) {
    organization.result.packages.forEach((dataset: Dataset) => {
      dataset.organization.name = name;
      dataset.name = privateToPublicDatasetName(dataset.name, mainOrg);
    });
  }

  const publicName = privateToPublicOrgName(organization.result.name, mainOrg);

  return {
    ...organization.result,
    name: publicName,
    _name: organization.result.name,
  };
};

export const getAllOrganizations = async ({
  detailed = true,
}: {
  detailed?: boolean;
}) => {
  const mainOrg = process.env.NEXT_PUBLIC_ORG;
  const dms = process.env.NEXT_PUBLIC_DMS;

  const response: CkanResponse<Organization[]> = await ky
    .get(`${dms}/@${mainOrg}/api/3/action/organization_list?all_fields=true`)
    .json();

  return response.result.map((o) => ({
    ...o,
    _name: publicToPrivateOrgName(o.name, mainOrg),
  }));
};
