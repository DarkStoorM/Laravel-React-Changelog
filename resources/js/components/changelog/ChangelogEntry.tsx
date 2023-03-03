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
        <div id={id} className="changelog__entry">
          <div className={`changelog__entry__type icon icon--${type}`}></div>
          <div className="changelog__entry__date">{created_at}</div>
          <div className="changelog__entry__content">{body}</div>
          <div className="changelog__entry__button">
            <ChangelogDeleteButton
              canBeRendered={shouldRenderDeleteButton}
              changelogId={id}
              parentActionSetter={setCanRenderEntry}
            />
          </div>
        </div>
      )}
    </>
  );
}
