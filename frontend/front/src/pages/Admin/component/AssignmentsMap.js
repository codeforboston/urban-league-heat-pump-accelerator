import { useState } from "react";
import { Button } from "@mui/material";

export const AssignmentsMap = () => {
  const [mapVisible, setMapVisible] = useState(false);
  return (
    <>
      {mapVisible ? (
        <div>
          <iframe
            src="https://www.google.com/maps/d/u/1/embed?mid=1w7GltFfO52CSl460ju2tkSUUVOXgL9g&ehbc=2E312F&z=13&noprof=1"
            width="640"
            height="480"
            title="BostonHPA Surveying Clusters"
          ></iframe>
          <div style={{ paddingBlock: "1rem" }}>
            <Button variant="contained" onClick={() => setMapVisible(false)}>
              Close Map
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="contained" onClick={() => setMapVisible(true)}>
          Show Assignments Map
        </Button>
      )}
    </>
  );
};
