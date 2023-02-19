import axios, { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import { IChangelogDatabaseProps } from "resources/js/utils/interfaces/IChangelogDatabaseProps";
import { AppRoutes } from "../../../AppRoutes";
import { isChangelogValidationError } from "../../../utils/guards/isChangelogValidationError";
import { getValidationErrors } from "../../../utils/helpers/forms/FormValidationError";
import { TAxiosErrorResponse } from "../../../utils/types/TAxiosErrorResponse";
import { TChangelogProps } from "../../../utils/types/TChangelogProps";
import { TChangelogType } from "../../../utils/types/TChangelogType";
import { ChangelogEntry } from "../../partials/ChangelogEntry";
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

    axios
      .post(AppRoutes.CHANGELOG, responseBody)
      .then((response) => {
        const newEntry: IChangelogDatabaseProps = JSON.parse(response.data);

        setResultMessages(<div>Added new changelog entry!</div>);
        setNewEntryAdded(true);
        setDatabaseChangelog(newEntry);
      })
      .catch((reason: AxiosError) => {
        // We know the type of this error, since it comes from custom FormRequest,
        // but we have to take other internal errors into account
        let errorMessages = <></>;

        if (isChangelogValidationError(reason.response?.data)) {
          const messageBag = reason.response?.data as TAxiosErrorResponse<TChangelogProps>;

          errorMessages = getValidationErrors(messageBag.errors);
        } else {
          errorMessages = <div>Internal server error :(</div>;
        }

        setResultMessages(errorMessages);
        setNewEntryAdded(false);
      });
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
      {newEntryAdded ? <ChangelogEntry {...databaseChangelog} /> : ""}
    </form>
  );
}
