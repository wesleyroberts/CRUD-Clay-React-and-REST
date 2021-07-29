import React, { useState, useEffect } from "react";
import ClayTable from "@clayui/table";
import ClayButton from "@clayui/button";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayCard from "@clayui/card";
import ModalEditKnowledge from "./Modal";
import { DELETE, POST, GET } from "./FunctionsKnowledge";

export default function Knowledge() {
  const colStyles = { margin: 10 };
  const [showPaniel, setShowPaniel] = useState(true);
  const [knowledgeValue, setKnowledValue] = useState([]);
  const [title, setTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [articleBodyModal, setArticleBodyModal] = useState("");
  const [idModal, setIdModal] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    GET().then((data) => setKnowledValue(data.items));
  }, []);

  function ModalEdit(title, articleBody, id) {
    setShowModal(true);
    setIdModal(id);
    setArticleBodyModal(articleBody);
    setTitleModal(title);
  }

  const addKnowledge = (items) => {
    setKnowledValue([...knowledgeValue, items]);
  };
  const deleteknowledge = (id) => {
    var res = [];
    knowledgeValue.forEach((item) => {
      if (item.id !== id) res.push(item);
    });
    setKnowledValue(res);
  };

  const editKnowledge = (id, articleBody, title) => {
    knowledgeValue.map((item, index) => {
      if (item.id == id) {
        knowledgeValue[index].articleBody = articleBody;
        knowledgeValue[index].title = title;
      }
    });
    setKnowledValue(knowledgeValue);
  };

  return (
    <div>
      {showPaniel ? (
        <div>
          <ModalEditKnowledge
            show={showModal}
            setShow={setShowModal}
            title={titleModal}
            setTitle={setTitleModal}
            articleBody={articleBodyModal}
            setArticleBody={setArticleBodyModal}
            id={idModal}
            editKnowledge={editKnowledge}
          />
          <ClayCard>
            <ClayCard.Body>
              <ClayTable>
                <ClayTable.Head>
                  <ClayTable.Row>
                    <ClayTable.Cell expanded headingCell>
                      {"Knowledge "}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                </ClayTable.Head>
                <ClayTable.Body>
                  {knowledgeValue.map((item, index) => (
                    <ClayTable.Row key={index}>
                      <ClayTable.Cell headingTitle>{item.title}</ClayTable.Cell>
                      <ClayTable.Cell>
                        <ClayButton
                          displayType="secondary"
                          onClick={() => {
                            ModalEdit(item.title, item.articleBody, item.id);
                          }}
                        >
                          Edit
                        </ClayButton>
                      </ClayTable.Cell>
                      <ClayTable.Cell>
                        <ClayButton
                          displayType="secondary"
                          onClick={() => {
                            DELETE(item.id), deleteknowledge(item.id);
                          }}
                        >
                          Delete
                        </ClayButton>
                      </ClayTable.Cell>
                    </ClayTable.Row>
                  ))}
                </ClayTable.Body>
              </ClayTable>
              <ClayButton
                displayType="primary"
                onClick={() => {
                  setShowPaniel(false);
                }}
              >
                Create Knowledge
              </ClayButton>
            </ClayCard.Body>
          </ClayCard>
        </div>
      ) : (
        <div>
          <ClayCard>
            <ClayCard.Body>
              <ClayForm>
                <ClayForm.Group className="form-group-sm">
                  <label htmlFor="basicInput">Title</label>
                  <ClayInput
                    placeholder="text"
                    type="text"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </ClayForm.Group>
                <ClayForm.Group className="form-group-sm">
                  <label htmlFor="basicInput">articleBody</label>
                  <textarea
                    className="form-control"
                    placeholder="text"
                    onChange={(e) => {
                      setArticleBody(e.target.value);
                    }}
                  />
                </ClayForm.Group>
                <ClayButton
                  displayType="primary"
                  style={colStyles}
                  onClick={() => {
                    POST(title, articleBody).then((data) => addKnowledge(data));
                  }}
                >
                  CRIAR
                </ClayButton>
                <ClayButton
                  style={colStyles}
                  onClick={() => {
                    setShowPaniel(true);
                  }}
                >
                  Voltar Posting
                </ClayButton>
              </ClayForm>
            </ClayCard.Body>
          </ClayCard>
        </div>
      )}
    </div>
  );
}
