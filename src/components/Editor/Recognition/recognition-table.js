import React from "react";
import { Card, List, Input, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectBox, updateBbox } from "../../../contexts/recognition-slice";

import EditorButtons from "./editor-buttons";

function RecognitionTable(properties) {
  const recognition = useSelector((state) => state.recognition);
  const dispatch = useDispatch();

  return (
    <Col span={16}>
      <Card
        title="Recognition Table"
        extra={
          <EditorButtons
            activeBox={recognition.activeBox}
            index={properties.index}
          />
        }
        className="table_panel"
      >
        <List
          itemLayout="vertical"
          dataSource={recognition.bboxList[properties.index]}
          renderItem={(item, index) => (
            <List.Item onClick={() => dispatch(selectBox(index))}>
              <List.Item.Meta
                title={"Bbox " + index}
                description={`x:${item.originalX} y:${item.originalY}`}
              />
              <Input
                bordered={false}
                value={item.originalText}
                onChange={(event) =>
                  dispatch(
                    updateBbox({
                      id: properties.index,
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
