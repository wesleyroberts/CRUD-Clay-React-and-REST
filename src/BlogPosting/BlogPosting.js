const siteId = Liferay.ThemeDisplay.getSiteGroupId();
export function GET() {
  return Liferay.Util.fetch(
    `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`,
    { method: "GET" }
  ).then((res) => res.json());
}
export function DELETE(id) {
  return Liferay.Util.fetch(`/o/headless-delivery/v1.0/blog-postings/${id}`, {
    method: "DELETE",
  });
}
export function POST(headLineInput, articleBodyInput) {
  let obj = { headline: headLineInput, articleBody: articleBodyInput };
  return Liferay.Util.fetch(
    `/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    }
  ).then((res) => res.json());
}
export function PUT(id, headLineInput, articleBodyInput) {
  let obj = { headline: headLineInput, articleBody: articleBodyInput };
  return Liferay.Util.fetch(`/o/headless-delivery/v1.0/blog-postings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  }).then((res) => res.json());
}
