import React, { useState, useEffect } from "react";
import ClayTable from "@clayui/table";
import ClayButton from "@clayui/button";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayCard from "@clayui/card";
import EditMedia from "./Modal";
import { GetDocument, DeleteDocument, PostDocument } from "./FuctionsMedia";

export default function MediaAndDocuments() {
  const [enable, setenable] = useState(true);
  const [mediaDocuments, setmediaDocuments] = useState([]);
  const [showModalMedia, setShowModalMedia] = useState(false);
  const [mediaDescriptionModal, setMediaDescriptionModal] = useState("");
  const [mediaIdModal, setMediaIdModal] = useState(0);
  const [mediaNameModal, setMediaNameModal] = useState("");
  const colStyles = { margin: 10 };

  useEffect(() => {
    GetDocument().then((data) => setmediaDocuments(data.items));
  }, []);

  function EditMediaModal(id, description, name) {
    setShowModalMedia(true);
    setMediaDescriptionModal(description);
    setMediaIdModal(id);
    setMediaNameModal(name);
  }
  const addMedia = (items) => {
    setmediaDocuments([...mediaDocuments, items]);
  };
  const deleteMedia = (id) => {
    var res = [];
    mediaDocuments.forEach((item) => {
      if (item.id !== id) res.push(item);
    });
    setmediaDocuments(res);
  };

  const editMedia = (id, desc, title) => {
    mediaDocuments.map((item, index) => {
      if (item.id == id) {
        mediaDocuments[index].description = desc;
        mediaDocuments[index].title = title;
      }
    });
    setmediaDocuments(mediaDocuments);
  };
  return (
    <div>
      {enable ? (
        <div>
          <EditMedia
            setDescription={setMediaDescriptionModal}
            setName={setMediaNameModal}
            showModalMedia={showModalMedia}
            setShowModalMedia={setShowModalMedia}
            name={mediaNameModal}
            id={mediaIdModal}
            description={mediaDescriptionModal}
            editMedia={editMedia}
          />
          <ClayCard>
            <ClayCard.Body>
              <ClayTable>
                <ClayTable.Head>
                  <ClayTable.Row>
                    <ClayTable.Cell expanded headingCell>
                      {"Documents and Media "}
                    </ClayTable.Cell>
                  </ClayTable.Row>
                </ClayTable.Head>
                <ClayTable.Body>
                  {mediaDocuments.map((item, index) => (
                    <ClayTable.Row key={index}>
                      <ClayTable.Cell headingTitle>{item.title}</ClayTable.Cell>
                      <ClayTable.Cell>
                        <ClayButton
                          displayType="secondary"
                          onClick={() => {
                            EditMediaModal(
                              item.id,
                              item.description,
                              item.title
                            );
                          }}
                        >
                          Edit
                        </ClayButton>
                      </ClayTable.Cell>
                      <ClayTable.Cell>
                        <ClayButton
                          displayType="secondary"
                          onClick={() => {
                            DeleteDocument(item.id), deleteMedia(item.id);
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
                  setenable(false);
                }}
              >
                Update Document
              </ClayButton>
            </ClayCard.Body>
          </ClayCard>
        </div>
      ) : (
        <div>
          <ClayCard>
            <ClayCard.Body>
              <ClayForm
                onSubmit={(event) => {
                  event.preventDefault();
                  PostDocument().then((data) => addMedia(data));
                }}
                id="upload-form"
                action=""
                method="post"
              >
                <ClayForm.Group className="form-group-sm">
                  <label htmlFor="basicInput">upload</label>
                  <ClayInput
                    id="file"
                    name="file"
                    placeholder="file"
                    type="file"
                  />
                </ClayForm.Group>
                <ClayButton style={colStyles} type="submit">
                  SUBMIT
                </ClayButton>
                <ClayButton
                  style={colStyles}
                  onClick={() => {
                    setenable(true);
                  }}
                >
                  Voltar para Media
                </ClayButton>
              </ClayForm>
            </ClayCard.Body>
          </ClayCard>
        </div>
      )}
    </div>
  );
}
