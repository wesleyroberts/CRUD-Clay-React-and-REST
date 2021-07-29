const siteId = Liferay.ThemeDisplay.getSiteGroupId();

export function PostDocument() {
  const file = document.getElementById("file");
  const formdata = new FormData();
  formdata.append("file", file.files[0]);
  return Liferay.Util.fetch(
    `/o/headless-delivery/v1.0/sites/${siteId}/documents`,
    {
      method: "POST",
      body: formdata,
    }
  ).then((response) => response.json());
}

export function DeleteDocument(documentId) {
  Liferay.Util.fetch(`/o/headless-delivery/v1.0/documents/${documentId}`, {
    method: "DELETE",
  });
}
export function PutDocument(documentId, des, name) {
  console.log("Put Document");

  try {
    const formdata = new FormData();
    const filePut = document.getElementById("filePut");
    const data = {
      title: name,
      description: des,
    };
    const dataJson = JSON.stringify(data);
    console.log(filePut == null);
    if (filePut != null) {
      formdata.append("filePut", filePut.files[0]);
    }
    formdata.append("document", dataJson);
    console.log(formdata);
    return Liferay.Util.fetch(
      `/o/headless-delivery/v1.0/documents/${documentId}`,
      {
        method: "PUT",
        body: formdata,
      }
    ).then((response) => response.json());
  } catch (err) {
    console.log("Errr", err);
  }
}
export function GetDocument() {
  return Liferay.Util.fetch(
    `/o/headless-delivery/v1.0/sites/${siteId}/documents`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
}
