const TextColors = {};
const BgColors = {};

// Design-system format families. ResourcesBadges derives the badge tint
// (85% white mix) and text (50% black mix) from these base colors, so each
// family stays within the EITI palette.
const spreadsheet = "#16795E"; // eiti green
const document = "#B57905"; // amber ink
const structured = "#15517F"; // navy-2
const archive = "#55607A"; // muted
const media = "#9C2B2B"; // deep red

export const resourceFormatColors = {
  PDF: media,
  CSV: spreadsheet,
  JSON: structured,
  ODS: spreadsheet,
  XLS: spreadsheet,
  XLSX: spreadsheet,
  DOC: document,
  SHP: structured,
  HTML: document,
  XML: structured,
  ZIP: archive,
  TXT: document,
  TSV: spreadsheet,
  GEOJSON: structured,
  WMS: structured,
  KML: structured,
  GPX: structured,
  MP4: media,
  AVI: media,
  JSONL: structured,
  DOCX: document,
  PPT: document,
  PPTX: document,
  RAR: archive,
  TAR: archive,
  JPG: archive,
  PNG: archive,
  SVG: archive,
};

Object.keys(resourceFormatColors).forEach((format) => {
  TextColors[format] = `text-[${resourceFormatColors[format]}]`;
  BgColors[format] = `bg-[${resourceFormatColors[format]}]`;
});

export const resourceTextColors = TextColors;

export const resourceBgColors = BgColors;
