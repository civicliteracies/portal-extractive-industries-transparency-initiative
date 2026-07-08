import { Dataset } from "@portaljs/ckan";

export default function DatasetOverview({ dataset }: { dataset: Dataset }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-10">
      <div className=" pb-5">
        <h4 className="pb-2 text-xs font-bold uppercase tracking-label text-eiti-muted">AUTHOR</h4>
        <p className="font-semibold text-eiti-ink">
          {dataset.author
            ? dataset.author
            : dataset.organization
            ? dataset.organization.title
            : ""}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs font-bold uppercase tracking-label text-eiti-muted">AUTHOR EMAIL</h4>
        <p className="font-semibold text-eiti-ink">
          {dataset.author_email ? dataset.author_email : ""}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs font-bold uppercase tracking-label text-eiti-muted">GROUP</h4>
        <p className="font-semibold text-eiti-ink">
          {dataset.groups.length > 0
            ? dataset.groups.map((group) => group.title).join(", ")
            : "—"}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs font-bold uppercase tracking-label text-eiti-muted">DATASET DATE</h4>
        <p className="font-semibold text-eiti-ink">
          {dataset.metadata_created &&
          !Number.isNaN(Date.parse(dataset.metadata_created))
            ? new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(dataset.metadata_created))
            : "—"}
        </p>
      </div>
      <div className="  pb-5">
        <h4 className="pb-1 text-xs font-bold uppercase tracking-label text-eiti-muted">VERSION</h4>
        <p className="font-semibold text-eiti-ink">
          {dataset.version ? dataset.version : "1.0"}
        </p>
      </div>
    </div>
  );
}
