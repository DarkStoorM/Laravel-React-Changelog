import { TChangelogType } from "../types/TChangelogType";

/**
 * Extended `IChangelogProps` interface to include the remaining Model properties
 */
export interface IChangelogDatabaseProps {
  created_at: string;
  body: string;
  type: TChangelogType;
}
