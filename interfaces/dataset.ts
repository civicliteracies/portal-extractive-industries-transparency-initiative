import { type Resource as ResourceI } from "@portaljs/ckan"

export type Resource = ResourceI & {
    iframe?: boolean;
}
