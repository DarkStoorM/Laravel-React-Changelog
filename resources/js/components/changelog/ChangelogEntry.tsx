import React, { useState } from "react";
import { ChangelogDeleteButton } from "./ChangelogDeleteButton";
import { IChangelogDatabaseProps } from "../../utils/interfaces/IChangelogDatabaseProps";

/**
 * Component that renders Changelog Entry, which comes from Database records.
 */
export function ChangelogEntry({
  id,
  body,
  type,
  created_at,
  shouldRenderDeleteButton = false,
}: IChangelogDatabaseProps) {
  const [canRenderEntry, setCanRenderEntry] = useState(true);

  return (
    <>
      {canRenderEntry && (
        <div id={id}>
          <div className={type}>{type}</div>
          <div>
            {body} - {created_at}
          </div>
          <ChangelogDeleteButton
            canBeRendered={shouldRenderDeleteButton}
            changelogId={id}
            parentActionSetter={setCanRenderEntry}
          />
        </div>
      )}
    </>
  );
}
