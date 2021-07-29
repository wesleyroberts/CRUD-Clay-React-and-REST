const siteId = Liferay.ThemeDisplay.getSiteGroupId();
export function GET() {
  return Liferay.Util.fetch(
    `o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles`,
    { method: "GET" }
  ).then((res) => res.json());
}

export function DELETE(id) {
  Liferay.Util.fetch(
    `/o/headless-delivery/v1.0/knowledge-base-articles/${id}`,
    {
      method: "DELETE",
    }
  );
}

export function POST(titleIpunt, articleBodyInput) {
  let obj = {
    articleBody: articleBodyInput,
    title: titleIpunt,
  };
  return Liferay.Util.fetch(
    `o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  ).then((res) => res.json());
}

export function PUT(id, titleIpunt, articleBodyInput) {
  let obj = { title: titleIpunt, articleBody: articleBodyInput };
  return Liferay.Util.fetch(
    `/o/headless-delivery/v1.0/knowledge-base-articles/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  ).then((res) => res.json());
}
