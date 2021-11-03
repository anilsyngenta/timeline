import React from "react";
import "./Fieldbar.css";


export default function Fieldbar(props) {

  
  return (
    <div  style={{height:props.height, left:props.left}} className="fieldbar">
      <div className="polygonTop">
        <svg
          width="10"
          height="8"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3.16667L1 0.5L5 0.5L3 3.16667Z"
            fill="#EE5B3A"
            stroke="#EE5B3A"
          />
        </svg>
      </div>
      <div className="icon">
        <svg
          width="18"
          height="18"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33333 2H4.66667V3.33333H10.7778L9.50945 4.66667L4.66667 4.66667V11.3333H11.3333V7.20054L12.6667 6V11.3333H14V12.6667H12.6667V14H11.3333V12.6667L4.66667 12.6667V14H3.33333V12.6667H2V11.3333H3.33333V4.66667H2V3.33333L3.33333 3.33333V2Z"
            fill="white"
          />
          <path
            d="M6 6.66667C6 6.29848 6.29848 6 6.66667 6H8V8H10V9.33333C10 9.70152 9.70152 10 9.33333 10H6.66667C6.29848 10 6 9.70152 6 9.33333V6.66667Z"
            fill="white"
          />
          <path
            d="M12.2087 2.87783L13.3887 4.05783L10.0687 7.37783H8.88867V6.19783L12.2087 2.87783ZM14.3887 2.5845L13.682 1.87783C13.5487 1.7445 13.342 1.7445 13.2087 1.87783L12.642 2.4445L13.822 3.6245L14.3887 3.05783C14.522 2.9245 14.522 2.71117 14.3887 2.5845Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="polygonBottom">
        <svg
          width="10"
          height="8"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 2.62268e-07L6 4L0 4L3 2.62268e-07Z" fill="#EE5B3A" />
        </svg>
      </div>
    </div>
  );
}
