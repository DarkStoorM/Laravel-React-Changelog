import React from "react";
import { IChangelogDatabaseProps } from "../../utils/interfaces/IChangelogDatabaseProps";

/**
 * Component that renders Changelog Entry, which comes from Database records. This
 * includes `author` and a `timestamp` along with the regular Props Interface
 * @param props Database record of a changelog entry
 */
export function ChangelogEntry(props: IChangelogDatabaseProps) {
  const { body, type, created_at } = props;

  return (
    <div>
      <div>{type}</div>
      <div>
        {body} - {created_at}
      </div>
    </div>
  );
}
