import { TChangelogType } from "../types/TChangelogType";

/**
 * Extended `IChangelogProps` interface to include the remaining Model properties
 */
export interface IChangelogDatabaseProps {
  id: string;
  created_at: string;
  body: string;
  type: TChangelogType;
  shouldRenderDeleteButton?: boolean;
}
