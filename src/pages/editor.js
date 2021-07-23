import React from "react";
import { Layout } from "antd";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicMenu from "../components/Common/basic-menu";
import PreviewSider from "../components/Editor/preview-sider";

import Segmentation from "../components/Editor/segmentation";
import Recognition from "../components/Editor/recognition";
import "../styles/Editor.css";

const { Header, Content, Footer } = Layout;

function Editor(properties) {
  const { url } = useRouteMatch();
  const { file } = useParams();
  const webtoon = useSelector((state) => state.webtoons.images[file]);
  const mask = useSelector((state) => state.webtoons.mask);

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
              <Segmentation webtoon={webtoon} mask={mask} index={file} />
            </Route>
            <Route path={`${url}/recognition`}>
              <Recognition webtoon={webtoon} />
            </Route>
          </Switch>
        </Content>
      </Layout>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Editor;
