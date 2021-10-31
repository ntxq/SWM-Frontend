import React, { useState, useEffect } from "react";
import { getProjects } from "../../../adapters/history";

function Download(properties) {
  const [uploadedID, setUploadedID] = useState([]);

  useEffect(() => {
    getProjects(0).then((projects) => {
      console.log(projects);

      for (const project of projects)
        for (const request of project.requests)
          if (request.progress === "complete")
            setUploadedID((state) => [...state, request.id]);
    });
  }, []);

  return "Download";
}

export default Download;
