import React from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import ClayForm, { ClayInput } from "@clayui/form";
import { PutDocument } from "./FuctionsMedia";

export default function EditMedia({
  showModalMedia,
  setShowModalMedia,
  id,
  name,
  description,
  setName,
  setDescription,
  editMedia,
}) {
  const { observer, onClose } = useModal({
    onClose: () => setShowModalMedia(false),
  });
  return (
    <div>
      {showModalMedia && (
        <ClayModal observer={observer} size="lg" status="info">
          <ClayModal.Header>{"Edite your Media"}</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm
              onSubmit={(event) => {
                event.preventDefault();
                PutDocument(id, description, name).then((data) =>
                  editMedia(id, data.description, data.title)
                );
              }}
              id="form-Put"
            >
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">File</label>
                <ClayInput type="file" id="filePut" name="filePut"></ClayInput>
              </ClayForm.Group>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Name</label>
                <ClayInput
                  type="text"
                  id="title"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></ClayInput>
              </ClayForm.Group>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </ClayForm.Group>
              <ClayButton displayType="primary" type="submit">
                Alterar
              </ClayButton>
            </ClayForm>
          </ClayModal.Body>
          <ClayModal.Footer
            first={<ClayButton.Group spaced></ClayButton.Group>}
            last={<ClayButton onClick={onClose}>{"Fechar"}</ClayButton>}
          />
        </ClayModal>
      )}
    </div>
  );
}
