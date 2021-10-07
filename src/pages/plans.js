import React from "react";
import { Typography, Row } from "antd";

import Template from "./template";
import "../styles/Plans.css";
import PlansChoice from "../components/Plans/plans-choice";

function Plans(properties) {
  return (
    <Template
      className="plans"
      defaultMenu="change_plan"
      headerClass="header"
      contentClass="content"
      footerClass="footer"
    >
      <div className="plans_header">
        <Typography.Title>Pricing</Typography.Title>
        <Typography.Title level={3} type="secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vulputate quam in porttitor cursus. Cras ut tortor lobortis, lacinia
          velit et, volutpat odio. Quisque id libero turpis. Vivamus quis
          commodo.
        </Typography.Title>
      </div>

      <Row gutter="40">
        <PlansChoice
          title="Basic"
          price="$0"
          buttonText="Sign up for free"
          description={
            <>
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Help center access</li>
              <li>Email support</li>
            </>
          }
        />

        <PlansChoice
          title="Pro"
          price="$50"
          buttonText="Sign up"
          description={
            <>
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Help center access</li>
              <li>Email support</li>
            </>
          }
        />

        <PlansChoice
          title="Enterprise"
          price="$100"
          buttonText="Contact sales"
          description={
            <>
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Help center access</li>
              <li>Email support</li>
            </>
          }
        />
      </Row>
    </Template>
  );
}

export default Plans;
