import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import { AppAPIRoutes } from "../../AppRoutes";
import { fetchRequest } from "../../utils/helpers/FetchRequest";
import { FormButton } from "../forms/Button";

interface IChangelogDeleteButtonProps {
  changelogId: string;
  canBeRendered: boolean;
  parentActionSetter: Dispatch<SetStateAction<boolean>>;
}

export function ChangelogDeleteButton({
  canBeRendered,
  changelogId,
  parentActionSetter,
}: IChangelogDeleteButtonProps) {
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(false);

  function deleteHandle(id: string) {
    setIsDeleteButtonDisabled(true);

    const deleteEntry = async () => {
      try {
        const { isOk, error } = await fetchRequest(`${AppAPIRoutes.CHANGELOG}/${id}`, "delete");

        if (!isOk) {
          throw error;
        }

        // Tell the parent where this button resides to change its state, resulting in
        // ignoring its render
        parentActionSetter(false);
      } catch (error) {
        setIsDeleteButtonDisabled(false);

        // Maybe do something with the error, like displaying a card (?)
      }
    };

    deleteEntry();
  }

  return (
    <>
      {canBeRendered && (
        <FormButton
          clickEvent={() => deleteHandle(changelogId)}
          isButtonDisabled={isDeleteButtonDisabled}
          defaultState="Delete"
        />
      )}
    </>
  );
}
