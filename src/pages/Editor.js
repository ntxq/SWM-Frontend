import React from "react";
import { Layout } from "antd";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicMenu from "../components/Common/basic-menu";

import Segmentation from "../components/Editor/segmentation";
import "../styles/Editor.css";

const { Header, Sider, Content, Footer } = Layout;

function Editor(properties) {
  const { url } = useRouteMatch();

  const { file } = useParams();
  const webtoon = useSelector((state) => state.webtoons.images[file]);

  return (
    <Layout>
      <Header>
        <BasicMenu default="3" />
      </Header>
      <Layout>
        <Sider></Sider>
        <Content className="content">
          <Switch>
            <Route path={`${url}/segmentation`}>
              <Segmentation webtoon={webtoon} />
            </Route>
            <Route path={`${url}/recognition`}>
              Recognition
            </Route>
          </Switch>
        </Content>
      </Layout>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Editor;
