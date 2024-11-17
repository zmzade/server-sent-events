import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";


function WelcomePage() {
  const [eventData, setEventData] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    const timeEventSource = new EventSource(
      "http://localhost:3001/currentTime"
    );
    // timeEventSource.onmessage = (e) => {
    //   console.log(e);
    //   setEventData(e.data);
    // };

    timeEventSource.addEventListener("message", (e) => {
      setEventData(e.data);
    });

    timeEventSource.addEventListener("color", (e) => {
      setColor(e.data);
    });

    return () => timeEventSource.close();
  }, []);

  return (
    <Container className="welcome-container">
      
      <h1>
        <span style={{ color: color }}>{eventData}</span>
      </h1>
    </Container>
  );
}
export default WelcomePage;
