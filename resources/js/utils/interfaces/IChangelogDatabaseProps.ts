import { TChangelogType } from "../types/TChangelogType";

/**
 * Extended `IChangelogProps` interface to include the remaining Model properties
 */
export interface IChangelogDatabaseProps {
  id: string;
  /**
   * Timestamp later transformed by Laravel to a human-readable entry, e.g. `2 days ago`
   */
  created_at: string;
  body: string;
  /**
   * Type describing the Changelog Section, in case a filter is implemented
   */
  type: TChangelogType;
  /**
   * Additional non-database appended flag, which eventually allows rendering the `delete entry` button
   */
  shouldRenderDeleteButton?: boolean;
}
