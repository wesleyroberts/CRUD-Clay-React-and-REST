import React from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import ClayForm, { ClayInput } from "@clayui/form";
import { PUT } from "../Knowloge/FunctionsKnowledge";

export default function ModalEditKnowledge({
  show,
  setShow,
  title,
  setTitle,
  articleBody,
  setArticleBody,
  id,
  editKnowledge,
}) {
  const { observer, onClose } = useModal({
    onClose: () => setShow(false),
  });
  return (
    <div>
      {show && (
        <ClayModal observer={observer} size="lg" status="info">
          <ClayModal.Header>{"Edited your Post"}</ClayModal.Header>
          <ClayModal.Body>
            <ClayForm>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">Title</label>
                <ClayInput
                  type="text"
                  defaultValue={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></ClayInput>
              </ClayForm.Group>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">ArticleBody</label>
                <textarea
                  className="form-control"
                  defaultValue={articleBody}
                  onChange={(e) => {
                    setArticleBody(e.target.value);
                  }}
                ></textarea>
              </ClayForm.Group>
              <ClayButton
                displayType="primary"
                onClick={() => {
                  PUT(id, title, articleBody).then((data) =>
                    editKnowledge(id, data.articleBody, data.title)
                  );
                }}
              >
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
