import React from "react";
import { Layout } from "antd";
// import ImageEditor from "@toast-ui/react-image-editor";

import BasicMenu from "../components/Common/BasicMenu";

// import "tui-image-editor/dist/tui-image-editor.css";
import "../styles/Editor.css";

const { Header, Content, Footer } = Layout;

function Editor(props) {
  return (
    <Layout>
      <Header>
        <BasicMenu default="3" />
      </Header>
      <Content className="content">
        {/* <ImageEditor
          includeUI={{
            loadImage: {
              path: "000프롤로그.png",
              name: "SampleImage",
            },
            menu: ["shape", "filter"],
            initMenu: "filter",
            uiSize: {
              width: "1000px",
              height: "700px",
            },
            menuBarPosition: "bottom",
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={true}
        /> */}
      </Content>
      <Footer className="footer">전지적 독자시점 ©2021</Footer>
    </Layout>
  );
}

export default Editor;
