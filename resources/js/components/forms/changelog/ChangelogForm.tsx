import React, { useRef, useState } from "react";
import { AppAPIRoutes } from "../../../AppRoutes";
import { fetchRequest } from "../../../utils/helpers/FetchRequest";
import { IChangelogDatabaseProps } from "../../../utils/interfaces/IChangelogDatabaseProps";
import { TChangelogProps } from "../../../utils/types/TChangelogProps";
import { TChangelogType } from "../../../utils/types/TChangelogType";
import { ChangelogEntry } from "../../changelog/ChangelogEntry";
import { Dropdown } from "../Dropdown";

export function ChangelogForm() {
  const [resultMessages, setResultMessages] = useState<JSX.Element>();
  const [newEntryAdded, setNewEntryAdded] = useState<boolean>(false);
  const [databaseChangelog, setDatabaseChangelog] = useState({} as IChangelogDatabaseProps);
  const changelogType = useRef<HTMLSelectElement>(null);
  const changelogBody = useRef<HTMLInputElement>(null);

  function onSubmitHandle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setResultMessages(<div>Submitting</div>);

    // Later validated by the Controller's FormRequest
    const responseBody: TChangelogProps = {
      body: changelogBody.current?.value as string,
      type: changelogType.current?.value as TChangelogType,
    };

    const fetchData = async () => {
      const { isOk, data, error } = await fetchRequest<IChangelogDatabaseProps>(
        AppAPIRoutes.CHANGELOG,
        "post",
        JSON.stringify(responseBody)
      );

      if (!isOk) {
        let errorMessages = <div>{error}</div>;

        // Laravel can return multiple FormRequest validation errors at once,
        // so we have to walk through them if there actually were more errors present,
        // but normally, that would not be the case. Thanks, Laravel ¯\_(ツ)_/¯
        if (Array.isArray(error)) {
          errorMessages = (
            <>
              {error.map((errorMessage) => (
                <div>{errorMessage}</div>
              ))}
            </>
          );
        }

        setResultMessages(<div>{errorMessages}</div>);
        setNewEntryAdded(false);

        return;
      }

      setResultMessages(<div>New entry added:</div>);
      setNewEntryAdded(true);
      setDatabaseChangelog(data);
    };

    fetchData();
  }

  return (
    <form onSubmit={onSubmitHandle}>
      <Dropdown
        labeledAs={{ elementId: "changelog", text: "Type" }}
        reference={changelogType}
        options={["add", "fix", "delete", "update"]}
      />

      <div>
        <label htmlFor="body">Body</label>
        <input id="body" name="body" type="text" ref={changelogBody} />
      </div>

      <button>Add</button>
      <div id="message-bag">{resultMessages}</div>
      {newEntryAdded && <ChangelogEntry {...databaseChangelog} />}
    </form>
  );
}
