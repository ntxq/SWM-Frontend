import React from "react";
import Template from "./template";
import { Result, Button } from "antd";
import { useHistory, useParams } from "react-router";

const subtitle = {
  0: "Please check and modify the following information before resubmitting.",
  403: "Sorry, you are not authorized to access this page.",
  404: "Sorry, the page you visited does not exist.",
  500: "Sorry, something went wrong.",
};

function Error(properties) {
  const { status } = useParams();
  const history = useHistory();

  return (
    <Template
      className="Error"
      defaultMenu=""
      headerClass="header"
      contentClass="content"
      footerClass="footer"
    >
      <Result
        status={status in subtitle ? status : "error"}
        title={status in subtitle ? status : "Submission Failed"}
        subTitle={
          status in subtitle
            ? subtitle[status]
            : "There are some problems with your operation."
        }
        extra={
          <Button type="primary" onClick={() => history.push("/home")}>
            Back Home
          </Button>
        }
      />
    </Template>
  );
}

export default Error;
