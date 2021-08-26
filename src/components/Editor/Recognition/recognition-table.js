import React from "react";
import { Card, List, Input, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectBox, updateBbox } from "../../../contexts/recognition-slice";

import EditorButtons from "./editor-buttons";

function RecognitionTable(properties) {
  const activeBox = useSelector((state) => state.recognition.activeBox);
  const bboxList = useSelector(
    (state) =>
      state.recognition.bboxList[properties.requestID][properties.cutIndex]
  );
  const dispatch = useDispatch();

  return (
    <Col span={16}>
      <Card
        title="Recognition Table"
        extra={
          <EditorButtons
            activeBox={activeBox}
            requestID={properties.requestID}
            cutIndex={properties.cutIndex}
            submit={properties.submit}
          />
        }
        className="table_panel"
      >
        <List
          itemLayout="vertical"
          dataSource={bboxList}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => dispatch(selectBox(index))}
              style={index === activeBox ? { backgroundColor: "#f5f5f5" } : {}}
              className="table_item"
            >
              <List.Item.Meta
                title={"Bbox " + index}
                description={`x:${item.originalX} y:${item.originalY}`}
              />
              <Input
                bordered={false}
                defaultValue={item.originalText}
                onBlur={(event) =>
                  dispatch(
                    updateBbox({
                      requestID: properties.requestID,
                      cutIndex: properties.cutIndex,
                      index: index,
                      updatedBbox: {
                        originalText: event.target.value,
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
