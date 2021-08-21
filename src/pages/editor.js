import React from "react";
import Template from "./template";
import { Layout } from "antd";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import PreviewSider from "../components/Editor/preview-sider";

import Segmentation from "../components/Editor/Segmentation/segmentation";
import Recognition from "../components/Editor/Recognition/recognition";
import "../styles/Editor.css";

function Editor(properties) {
  const { url } = useRouteMatch();
  const { webtoonIndex, cutIndex } = useParams();
  const webtoon = useSelector(
    (state) => state.webtoons.images[webtoonIndex].cut[cutIndex]
  );

  return (
    <Template
      overrideContent={true}
      defaultMenu="3"
      headerClass="editor_header"
      contentClass="content_editor"
      footerClass="footer"
    >
      <Layout>
        <PreviewSider />
        <Layout.Content className="content_editor">
          <Switch>
            <Route path={`${url}/segmentation`}>
              <Segmentation
                webtoon={webtoon}
                webtoonIndex={Number(webtoonIndex)}
                cutIndex={Number(cutIndex)}
              />
            </Route>
            <Route path={`${url}/recognition`}>
              <Recognition
                webtoon={webtoon}
                webtoonIndex={Number(webtoonIndex)}
                cutIndex={Number(cutIndex)}
              />
            </Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </Template>
  );
}

export default Editor;
