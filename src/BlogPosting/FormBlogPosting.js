import React, { useState, useEffect } from "react";
import ClayTable from "@clayui/table";
import ClayButton from "@clayui/button";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayCard from "@clayui/card";
import { GET, POST, DELETE } from "./BlogPosting";
import ModalEdit from "./Modal";

export default function FormBlogPosting() {
  const [isEdited, setIsEdited] = useState(true);
  const [blogValue, setBlogValue] = useState([]);
  const [articleBody, setArticleBody] = useState("");
  const [headline, setHeadLine] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idModalEdited, setIdModalEdited] = useState(0);
  const [headLineModal, setHeadLineModal] = useState("");
  const [articleBodyModal, setArticleBodyModal] = useState("");
  const colStyles = { margin: 10 };

  useEffect(() => {
    GET().then((data) => setBlogValue(data.items));
  }, []);

  const addBlog = (items) => {
    setBlogValue([...blogValue, items]);
  };
  const deleteBlog = (id) => {
    var res = [];
    blogValue.forEach((item) => {
      if (item.id !== id) res.push(item);
    });
    setBlogValue(res);
  };
  const editBlog = (id, h, a) => {
    blogValue.map((item, index) => {
      if (item.id == id) {
        blogValue[index].headline = h;
        blogValue[index].articleBody = a;
      }
    });
    setBlogValue(blogValue);
  };

  function handleModal(art, head, id) {
    setShowModal(true);
    setIdModalEdited(id);
    setArticleBodyModal(art);
    setHeadLineModal(head);
  }
  return (
    <div>
      {isEdited ? (
        <div>
          <ModalEdit
            show={showModal}
            setShow={setShowModal}
            id={idModalEdited}
            articleBodyShow={articleBodyModal}
            setArticle={setArticleBodyModal}
            headlineShow={headLineModal}
            setHeadline={setHeadLineModal}
            editBlog={editBlog}
          />
          <ClayCard>
            <ClayCard.Body>
              <ClayTable>
                <ClayTable.Head>
                  <ClayTable.Row>
                    <ClayTable.Cell expanded headingCell>
                      {"Postings "}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                </ClayTable.Head>
                <ClayTable.Body>
                  {blogValue.map((item, index) => (
                    <ClayTable.Row key={index}>
                      <ClayTable.Cell headingTitle>
                        {item.headline}
                      </ClayTable.Cell>
                      <ClayTable.Cell>
                        <ClayButton
                          displayType="secondary"
                          onClick={() =>
                            handleModal(
                              item.articleBody,
                              item.headline,
                              item.id
                            )
                          }
                        >
                          Edit
                        </ClayButton>
                      </ClayTable.Cell>
                      <ClayTable.Cell>
                        <ClayButton
                          displayType="secondary"
                          onClick={() => {
                            DELETE(item.id), deleteBlog(item.id);
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
                  setIsEdited(false);
                }}
              >
                New POST
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
                  <label htmlFor="basicInput">Headline</label>
                  <ClayInput
                    placeholder="text"
                    type="text"
                    onChange={(e) => {
                      setHeadLine(e.target.value);
                    }}
                  />
                </ClayForm.Group>
                <ClayForm.Group className="form-group-sm">
                  <label htmlFor="basicInput">ArticalBody</label>
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
                    POST(headline, articleBody).then((data) => addBlog(data));
                  }}
                >
                  CRIAR
                </ClayButton>
                <ClayButton
                  style={colStyles}
                  onClick={() => {
                    setIsEdited(true);
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
