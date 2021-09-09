import React from "react";
import { Divider, Layout } from "antd";

import BasicMenu from "../components/Common/basic-menu";

const { Header, Content, Footer } = Layout;

function Template(properties) {
  return (
    <Layout className={properties.className}>
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
      <Footer className={properties.footerClass}>
        <Divider />
        전지적 독자시점 ©2021
      </Footer>
    </Layout>
  );
}

export default Template;
