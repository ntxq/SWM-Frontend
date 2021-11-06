import { useCallback, useEffect, useState } from "react";
import { getCompleteImage, getProjects } from "../../../adapters/history";

function useDownloadImage() {
  const [downloadImages, setDownloadImages] = useState([]);

  const getDownloadImages = useCallback(async () => {
    const projectIDs = await getProjects();

    const completeIds = [];
    setDownloadImages([]);

    for (const project of projectIDs)
      for (const request of project.requests)
        if (request.progress === "complete") completeIds.push(request.id);

    for (const requestId of completeIds) {
      const downloadURL = await getCompleteImage(requestId);
      setDownloadImages((state) => [...state, downloadURL]);
    }
  }, []);

  useEffect(() => {
    getDownloadImages();
  }, [getDownloadImages]);

  return downloadImages;
}

export default useDownloadImage;
