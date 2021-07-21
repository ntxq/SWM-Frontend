import React from "react";
import { Form, Card, Input, Radio, Select, Button } from "antd";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../../contexts/webtoon-drop-slice";
import { uploadOriginals } from "../../adapters/backend";

function CreateProject(properties) {
  const uploadList = useSelector((state) => state.webtoons.images);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Form
      name="project"
      requiredMark={false}
      onFinish={async (values) => {
        const request_ids = await uploadOriginals(uploadList);
        console.log(request_ids);
        history.push("/dashboard");
      }}
      onValuesChange={(changed, all) => dispatch(setForm(all))}
    >
      <Card className="form_card">
        <Form.Item name="new" initialValue="new">
          <Radio.Group>
            <Radio value="new">Start a new project</Radio>
            <Radio value="exist">Add images to an existing project</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="title"
          label="Project Title"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          rules={[
            { required: true, message: "Please input the project title!" },
          ]}
        >
          <Input placeholder="Project title" />
        </Form.Item>
        <Form.Item
          name="language"
          label="Languages"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Select langauges to translate"
          >
            <Select.Option key={"Korean"}>Korean</Select.Option>
            <Select.Option key={"English"}>English</Select.Option>
          </Select>
        </Form.Item>
      </Card>
      <Form.Item>
        <div className="submit_container">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="submit"
          >
            Start translation
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default CreateProject;
