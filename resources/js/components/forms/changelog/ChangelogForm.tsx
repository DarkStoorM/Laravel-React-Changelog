import React, { useRef, useState } from "react";
import { AppAPIRoutes } from "../../../AppRoutes";
import { EMessageBagStatus } from "../../../utils/enums/EMessageBagStatus";
import { fetchRequest } from "../../../utils/helpers/FetchRequest";
import { IChangelogDatabaseProps } from "../../../utils/interfaces/IChangelogDatabaseProps";
import { TChangelogProps } from "../../../utils/types/TChangelogProps";
import { TChangelogType } from "../../../utils/types/TChangelogType";
import { MessageBag } from "../../partials/MessageBag";
import { FormButton } from "../Button";
import { Dropdown } from "../Dropdown";

export function ChangelogForm() {
  const [resultMessages, setResultMessages] = useState<string[]>([]);
  const [messageStatus, setMessageStatus] = useState<EMessageBagStatus>(EMessageBagStatus.EMPTY);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const changelogType = useRef<HTMLSelectElement>(null);
  const changelogBody = useRef<HTMLInputElement>(null);

  function updateStates(
    messages: string[],
    buttonState: boolean,
    responseMessageStatus: EMessageBagStatus
  ): void {
    setResultMessages(messages);
    setIsButtonDisabled(buttonState);
    setMessageStatus(responseMessageStatus);
  }

  function onSubmitHandle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateStates(["Submitting..."], true, EMessageBagStatus.EMPTY);

    // Later validated by the Controller's FormRequest
    const responseBody: TChangelogProps = {
      body: changelogBody.current?.value as string,
      type: changelogType.current?.value as TChangelogType,
    };

    const fetchData = async () => {
      const { isOk, error } = await fetchRequest<IChangelogDatabaseProps>(
        AppAPIRoutes.CHANGELOG,
        "post",
        JSON.stringify(responseBody)
      );

      if (!isOk) {
        let errorMessages;

        // Laravel can return multiple FormRequest validation errors at once,
        // so we have to walk through them if there actually were more errors present,
        // but normally, that would not be the case. Thanks, Laravel ¯\_(ツ)_/¯
        if (Array.isArray(error)) {
          errorMessages = error.map((errorMessage) => errorMessage);
        } else {
          errorMessages = [error as string];
        }

        updateStates(errorMessages, false, EMessageBagStatus.WARNING);

        return;
      }

      updateStates(["New entry added"], false, EMessageBagStatus.SUCCESS);

      // Only change the Type as we might be adding multiple changelog entries of the same type
      if (changelogBody.current) changelogBody.current.value = "";
    };

    fetchData();
  }

  return (
    <>
      <form className="flex form" onSubmit={onSubmitHandle}>
        <Dropdown reference={changelogType} options={["add", "fix", "delete", "update"]} />

        <input
          className="input input--full input--padded"
          id="body"
          name="body"
          type="text"
          placeholder="Changelog content"
          ref={changelogBody}
        />

        <FormButton isButtonDisabled={isButtonDisabled} defaultState="Submit" />
      </form>
      {resultMessages.length > 0 && <MessageBag status={messageStatus} messages={resultMessages} />}
    </>
  );
}
