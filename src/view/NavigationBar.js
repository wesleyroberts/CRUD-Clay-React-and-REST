import ClayNavigationBar from "@clayui/navigation-bar";
import React, { useState } from "react";
import FormBlogPosting from "../BlogPosting/FormBlogPosting";
import MediaAndDocuments from "../DocumentsAndMedia/MediaAndDocuments";
import Knowledge from "../Knowloge/Knowledge";
export const Navigation = () => {
  const btnStyle = {
    padding: "5.5px 16px 5.5px 16px",
    borderColor: "var(--indigo)",
  };
  const [blogShow, setBlogShow] = useState(true);
  const [mediaShow, setMediaShow] = useState(false);
  const [knowledge, setKnowledge] = useState(false);

  const showBlog = () => {
    setBlogShow(true);
    setMediaShow(false);
    setKnowledge(false);
  };
  const showMedia = () => {
    setBlogShow(false);
    setMediaShow(true);
    setKnowledge(false);
  };
  const showKnowledge = () => {
    setKnowledge(true);
    setBlogShow(false);
    setMediaShow(false);
  };
  return (
    <div className="col-md-5">
      <ClayNavigationBar triggerLabel="Item 1">
        <ClayNavigationBar.Item>
          <button
            className="btn btn-unstyled btn-block btn-sm"
            style={btnStyle}
            type="button"
            onClick={showBlog}
          >
            Blog
          </button>
        </ClayNavigationBar.Item>
        <ClayNavigationBar.Item>
          <button
            className="btn btn-unstyled btn-block btn-sm"
            style={btnStyle}
            type="button"
            onClick={showMedia}
          >
            Media
          </button>
        </ClayNavigationBar.Item>
        <ClayNavigationBar.Item>
          <button
            className="btn btn-unstyled btn-block btn-sm"
            style={btnStyle}
            type="button"
            onClick={showKnowledge}
          >
            {" "}
            Knowledge
          </button>
        </ClayNavigationBar.Item>
      </ClayNavigationBar>
      {blogShow && <FormBlogPosting />}
      {mediaShow && <MediaAndDocuments />}
      {knowledge && <Knowledge />}
    </div>
  );
};
