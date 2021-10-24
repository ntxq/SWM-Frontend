import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, List, Input, Col } from "antd";
import { MdTranslate } from "react-icons/md";

import EditorButtons from "../editor-buttons";

function RecognitionTable({
  requestID,
  cutIndex,
  submit,
  boxList,
  activeBox,
  select,
  update,
  context,
  backward,
}) {
  const dispatch = useDispatch();

  const imageHeight = document.querySelector(".unselectable")?.clientHeight;
  useLayoutEffect(() => {
    const table = document.querySelector(".table_panel");

    table.style.maxHeight = imageHeight + "px";
  }, [imageHeight]);

  return (
    <Col span={16}>
      <Card
        title="Recognition Table"
        extra={
          <EditorButtons
            activeBox={activeBox}
            requestID={requestID}
            cutIndex={cutIndex}
            submit={submit}
            backward={backward}
            context={context}
          />
        }
        className="table_panel"
      >
        <List
          itemLayout="vertical"
          dataSource={boxList}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => dispatch(select(index))}
              style={index === activeBox ? { backgroundColor: "#f5f5f5" } : {}}
              className="table_item"
            >
              <List.Item.Meta
                title={"Box " + (index + 1)}
                description={`x:${Math.floor(item.x)} y:${Math.floor(item.y)}`}
              />
              <Input
                prefix={<MdTranslate />}
                bordered={false}
                defaultValue={item.text}
                onBlur={(event) =>
                  dispatch(
                    update({
                      requestID: requestID,
                      cutIndex: cutIndex,
                      index: index,
                      updatedBox: {
                        text: event.target.value,
                      },
                    })
                  )
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </Col>
  );
}

export default RecognitionTable;
