import { IChangelogDatabaseProps } from "../interfaces/IChangelogDatabaseProps";

/**
 * Partial of the Database Changelog Entry, which only requires the `Body` and its
 * `Type` before submission, for validation purposes
 */
export type TChangelogProps = Pick<IChangelogDatabaseProps, "body" | "type">;
