import React from "react";
import { Layout, Steps } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicMenu from "../components/Common/basic-menu";

import WebtoonEditor from "../components/Editor/webtoon-editor";
import "../styles/Editor.css";

const { Header, Sider, Content, Footer } = Layout;

function Editor(properties) {
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
          <Steps current={0} className="editor_progress">
            <Steps.Step title="Segmentation" />
            <Steps.Step title="Recognition" />
            <Steps.Step title="Finish" />
          </Steps>
          <WebtoonEditor webtoon={webtoon} />
        </Content>
      </Layout>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Editor;
