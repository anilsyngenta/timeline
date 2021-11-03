import React from "react";
import Dateindicator from "../DateIndicator/Dateindicator";
import Fieldbar from "../Fieldbar/Fieldbar";
import "./Calender.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let cycles = [

  {
      StartDate: "5",
      StartMonth: "February",
      EndDate: "5",
      EndMonth: "April",
      title:"soy"
    },
    {
      StartDate: "10",
      StartMonth: "September",
      EndDate: "27",
      EndMonth: "October",
      title:"corn"
    },
   {
      StartDate: "30",
      StartMonth: "October",
      EndDate: "25",
      EndMonth: "November",
      title:"soy"
    },
    ["4 January 2021","15 June 2021"  ,"15 September 2021"]
];

let cycles2 = [

  {
      StartDate: "5",
      StartMonth: "March",
      EndDate: "5",
      EndMonth: "April",
      title:"soy"
    },
    {
      StartDate: "5",
      StartMonth: "October",
      EndDate: "27",
      EndMonth: "November",
      title:"corn"
    },
    ["4 January 2021","15 June 2021"  ,"15 September 2021"]
];

const Days = new Array(30).fill().map((_, idx) => 1 + idx);
export const Calender = () => {
  const d = new Date();

  
  return (
    <div className="container">
       <Dateindicator />
      <p>{d.getFullYear()}</p>
      <div className="years">
        {months.map((month, index) => {
          return (
            <div
              key={month}
              style={
                d.getMonth() === index ? { backgroundColor: " #E99921" } : {}
              }
              className="month"
            >
              {month}
            </div>
          );
        })}
      </div>
    
      <Field cycles={cycles} />
      {/* <Field cycles={cycles2} /> */}
    </div>
  );
};

const Field = ({ cycles }) => {


  return (
    <div className="Allfields">
      {cycles.map((draw, index) => {
        return (
          <div key={index} className="fields">
            {months.map((month, index) => {
              return <Area key={month + 1}  Cycle={draw} month={month} />;
            })}
          </div>
        );
      })}
      <div className="Field_Container">
   
  
      </div>
      
    </div>
  );
};



const Area = (props) => {
  
  let startmonth = months.indexOf(props.Cycle.StartMonth);
  let lastmonth = months.indexOf(props.Cycle.EndMonth);
  let date = new Date();
  let Currentdate = date.getDate();
  let CurrentMonth = +date.toJSON().split("-")[1];

  const Conditional = (month, day) => {
    let CurrentMonth = months.indexOf(month);

    if (CurrentMonth > startmonth && CurrentMonth < lastmonth) {
      return true;
    } else if (
      month === props.Cycle.StartMonth &&
      day >= props.Cycle.StartDate
    ) {
      return true;
    } else if (month === props.Cycle.EndMonth && day <= props.Cycle.EndDate) {
      return true;
    }
    return false
  };


  const handleColor = () => {
    if (CurrentMonth >= startmonth + 1 && CurrentMonth <= lastmonth + 1 && Currentdate<=props.Cycle.EndDate && Currentdate>=props.Cycle.StartDate) {
      return "#90D6AA";
    } else if (Currentdate<=props.Cycle.StartDate && CurrentMonth <= lastmonth + 1 ) {
      return "#82CFFF";
    } else {
      return "#C2C7D0";
    }
  };

  
  const allRef= React.useRef([])
 
const currentDate=(e)=>{
let d= +date.toLocaleDateString().split("/")[0]
let monthIndex= months.indexOf(e.month)+1

if(d===monthIndex&& e.day===Currentdate){

  allRef.current= e
  console.log(allRef);
   localStorage.setItem("dateIndiactor",allRef.current.offsetLeft)
}
}

// React.useEffect(()=>{
//   console.log(allRef);
// })
const showTitle=(day)=>{

  if(day===+props.Cycle.StartDate && props.month===props.Cycle.StartMonth){
    return true
  }
}
  
//const fieldbarDates=["4 January 2021","15 June 2021"  ,"15 September 2021"]

const handleFieldBar=(day,month)=>{
   let check= cycles[cycles.length-1].includes(`${day} ${month} 2021`)

   if(check){
     return true
   }

   return false
}
  return (
    <div className="field"  >
      {Days.map((day,index) => {
        return (
          <>
            {
            Conditional(props.month, day)? 
             <div
              ref={ (e)=>{
                e.day=day
                e.month=props.month
                currentDate(e)
              }} 
              key={index}
              style={ { backgroundColor: handleColor() } }
              className="days"
            >
              <h4 className="title">{showTitle(day)&&props.Cycle.title}</h4>
              {
                handleFieldBar(day,props.month)&& <Fieldbar day={day} month={props.month}/>
              }
            </div>:
            <div
              key={index}
              ref={ (e)=>{
                e.day=day
                e.month=props.month
                 currentDate(e)
              }} 
              className="days"
            >
              {
                handleFieldBar(day,props.month)&& <Fieldbar/>
              }
            </div>
            } 
          </>
       
        );
      })}
    </div>
  );
};
