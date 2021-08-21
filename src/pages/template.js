import React from "react";
import { Layout } from "antd";

import BasicMenu from "../components/Common/basic-menu";

const { Header, Content, Footer } = Layout;

function Template(properties) {
  return (
    <Layout>
      {!properties.removeHeader && (
        <Header className={properties.headerClass}>
          <BasicMenu default={properties.defaultMenu} />
        </Header>
      )}
      {properties.overrideContent ? (
        properties.children
      ) : (
        <Content className={properties.contentClass}>
          {properties.children}
        </Content>
      )}
      <Footer className={properties.footerClass}>전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Template;
