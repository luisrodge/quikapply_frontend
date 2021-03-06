import { schema } from "normalizr";

const inputSchema = new schema.Entity("inputs");

const columnSchema = new schema.Entity("columns", {
  input: inputSchema,
});

const rowSchema = new schema.Entity("rows", {
  columns: [columnSchema],
});

const sectionSchema = new schema.Entity("sections", {
  rows: [rowSchema],
});

export const ApplicationSchema = new schema.Entity("applications", {
  sections: [sectionSchema],
});

export const SectionSchema = new schema.Entity("sections", {
  rows: [rowSchema],
  application: new schema.Entity("applications"),
});

export const RowSchema = new schema.Entity("rows", {
  columns: [columnSchema],
});
