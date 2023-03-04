import React, { useEffect, useState } from "react";
import { ChangelogEntry } from "./changelog/ChangelogEntry";
import { AppAPIRoutes } from "../AppRoutes";
import { fetchRequest } from "../utils/helpers/FetchRequest";
import { IChangelogDatabaseProps } from "../utils/interfaces/IChangelogDatabaseProps";

export function Changelog() {
  const [changes, setChanges] = useState<IChangelogDatabaseProps[]>([]);
  const [initialState, setInitialState] = useState("Fetching changes...");

  useEffect(() => {
    const fetchData = async () => {
      const { isOk, data } = await fetchRequest<IChangelogDatabaseProps[]>(AppAPIRoutes.CHANGELOG);

      if (!isOk) {
        setInitialState("Could not fetch the recent changes");

        return;
      }

      setChanges(data);

      if (data.length === 0) {
        setInitialState("No changes yet.");
      }
    };

    fetchData();
  }, []);

  function renderEntries() {
    return (
      <div id="changelog" className="changelog">
        {changes.map((change: IChangelogDatabaseProps) => (
          <ChangelogEntry {...change} shouldRenderDeleteButton={true} />
        ))}
      </div>
    );
  }

  return changes.length > 0 ? renderEntries() : <div id="uninitialized">{initialState}</div>;
}
