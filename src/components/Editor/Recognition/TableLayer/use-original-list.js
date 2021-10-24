import { createSelector } from "reselect";

const bboxListSelectorFactory = (requestID, cutIndex) => (state) =>
  state.recognition.bboxList[requestID][cutIndex];

const imgPropertySelector = (state) => state.recognition.imgProperty;

const originalListSelectorFactory = (requestID, cutIndex) =>
  createSelector(
    bboxListSelectorFactory(requestID, cutIndex),
    imgPropertySelector,
    (bboxList, imgProperty) =>
      bboxList.map((bbox) => ({
        ...bbox,

        x: Math.round(bbox.x * imgProperty.currentWidthRatio),
        y: Math.round(bbox.y * imgProperty.currentHeightRatio),
        width: Math.round(bbox.width * imgProperty.currentWidthRatio),
        height: Math.round(bbox.height * imgProperty.currentHeightRatio),
        fontSize: Math.round(bbox.fontSize * imgProperty.currentWidthRatio),
      }))
  );

export default originalListSelectorFactory;
