import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, List, Input, Col } from "antd";
import { MdTranslate } from "react-icons/md";

import EditorButtons from "../editor-buttons";
import TableExtras from "./table-extras";

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
          rowKey={(box) => box.bbox_id || box.translate_id}
          renderItem={(item) => (
            <List.Item
              onClick={() => dispatch(select(item.index))}
              style={
                item.index === activeBox ? { backgroundColor: "#f5f5f5" } : {}
              }
              extra={
                context === "bbox" && (
                  <TableExtras
                    cluster={item.group_id}
                    index={item.group_index}
                    originalIndex={item.index}
                    updateCluster={(newCluster) =>
                      update({
                        requestID: requestID,
                        cutIndex: cutIndex,
                        index: item.index,
                        updatedBox: {
                          group_id: newCluster,
                        },
                      })
                    }
                    updateIndex={(newIndex) =>
                      update({
                        requestID: requestID,
                        cutIndex: cutIndex,
                        index: item.index,
                        updatedBox: {
                          group_index: newIndex,
                        },
                      })
                    }
                    select={select}
                  />
                )
              }
              className="table_item"
            >
              <List.Item.Meta
                title={
                  context === "bbox"
                    ? "Cluster " +
                      item.group_id +
                      " (Index: " +
                      item.group_index +
                      ")"
                    : "Cluster " + (item.translate_id + 1)
                }
              />
              <Input
                prefix={<MdTranslate />}
                bordered={false}
                value={item.text}
                onChange={(event) =>
                  dispatch(
                    update({
                      requestID: requestID,
                      cutIndex: cutIndex,
                      index: item.index,
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
