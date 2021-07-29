import React from "react";
import ClayButton from "@clayui/button";
import ClayModal, { useModal } from "@clayui/modal";
import ClayForm, { ClayInput } from "@clayui/form";
import { PUT } from "./BlogPosting";

export default function ModalEdit({
  show,
  setShow,
  articleBodyShow,
  headlineShow,
  setHeadline,
  setArticle,
  id,
  editBlog,
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
                <label htmlFor="basicInput">Headline</label>
                <ClayInput
                  type="text"
                  defaultValue={articleBodyShow}
                  onChange={(e) => {
                    setHeadline(e.target.value);
                  }}
                ></ClayInput>
              </ClayForm.Group>
              <ClayForm.Group className="form-group-sm">
                <label htmlFor="basicInput">ArticalBody</label>
                <textarea
                  className="form-control"
                  defaultValue={headlineShow}
                  onChange={(e) => {
                    setArticle(e.target.value);
                  }}
                ></textarea>
              </ClayForm.Group>
              <ClayButton
                displayType="primary"
                onClick={() => {
                  PUT(id, headlineShow, articleBodyShow).then((data) =>
                    editBlog(id, data.headline, data.articleBody)
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
