import React, { useState } from "react";
import { Form, Card, Input, Radio, Select, Button } from "antd";

import { useDispatch } from "react-redux";
import { setForm } from "../../contexts/webtoon-drop-slice";
import useUpload from "./use-upload";

function CreateProject(properties) {
  const dispatch = useDispatch();
  const upload = useUpload();

  const [loading, setLoading] = useState(false);

  return (
    <Form
      name="project"
      requiredMark={false}
      onFinish={() => {
        setLoading(true);
        upload();
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
            loading={loading}
          >
            Start Translate
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default CreateProject;
