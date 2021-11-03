import React from "react";
import useResize from "../../Customhook/useResize";

export default function Drawer() {
   const {width,enableResize}= useResize(200)
   
  return (
    <div
      style={{
        backgroundColor: "green",
        height: "100vh",
        position: "absolute",
        width: `${width}px`,
        zIndex:1,
        top: "0px"
      }}
      onMouseDown={enableResize}
    ></div>
  );
}
