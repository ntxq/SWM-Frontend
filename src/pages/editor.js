import React from "react";
import { Layout } from "antd";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicMenu from "../components/Common/basic-menu";
import PreviewSider from "../components/Editor/preview-sider";

import Segmentation from "../components/Editor/Segmentation/segmentation";
import Recognition from "../components/Editor/Recognition/recognition";
import "../styles/Editor.css";

const { Header, Content, Footer } = Layout;

function Editor(properties) {
  const { url } = useRouteMatch();
  const { webtoonIndex, cutIndex } = useParams();
  const webtoon = useSelector((state) => state.webtoons.images[webtoonIndex].cut[cutIndex]);

  return (
    <Layout>
      <Header className="editor_header">
        <BasicMenu default="3" />
      </Header>
      <Layout>
        <PreviewSider />
        <Content className="content_editor">
          <Switch>
            <Route path={`${url}/segmentation`}>
              <Segmentation webtoon={webtoon} webtoonIndex={webtoonIndex} cutIndex={cutIndex} />
            </Route>
            <Route path={`${url}/recognition`}>
              <Recognition webtoon={webtoon} webtoonIndex={webtoonIndex} cutIndex={cutIndex} />
            </Route>
          </Switch>
        </Content>
      </Layout>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Editor;
