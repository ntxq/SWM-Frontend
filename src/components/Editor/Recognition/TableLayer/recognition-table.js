import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, List, Input, Col, Tooltip } from "antd";
import { MdTranslate, MdGTranslate } from "react-icons/md";

import EditorButtons from "../editor-buttons";

function RecognitionTable({
  requestID,
  cutIndex,
  submit,
  boxList,
  activeBox,
  select,
  update,
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
                title={"Bbox " + index}
                description={`x:${Math.floor(item.x)} y:${Math.floor(item.y)}`}
              />
              <Input
                prefix={
                  <Tooltip title="Original Text">
                    <MdTranslate />
                  </Tooltip>
                }
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
