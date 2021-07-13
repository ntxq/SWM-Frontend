import React from "react";
import { Form, Card, Input, Radio, Select, Button } from "antd";
import { useHistory } from "react-router-dom";

function CreateProject(props) {
  const history = useHistory();

  return (
    <Form
      name="project"
      requiredMark={false}
      onFinish={(values) => {
        console.log(values);
        history.push("/dashboard");
      }}
    >
      <Card>
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
            <Select.Option key={0}>Korean</Select.Option>
            <Select.Option key={1}>English</Select.Option>
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
