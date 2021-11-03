import React from "react";
import "./NewTimeline.css";
import moment from "moment";

// let WindowWidth = window.innerWidth;
// window.addEventListener("resize", () => {
//   WindowWidth = window.innerWidth;
// });
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Set",
  "Oct",
  "Nov",
  "Dec",
];

const monthsShorts = [
  "J",
  "F",
  "M",
  "A",
  "M",
  "J",
  "J",
  "A",
  "S",
  "O",
  "N",
  "D",
];

const seasons = [
  {
    startDate: "2019/11/01",
    endDate: "2020/03/5",
  },
  {
    startDate: "2020/11/01",
    endDate: "2021/03/5",
  },
  {
    startDate: "2021/10/5",
    endDate: "2021/11/12",
  },
  {
    startDate: "2021/11/20",
    endDate: "2022/1/30",
  },
  {
    startDate: "2022/11/20",
    endDate: "2023/1/30",
  },
];
const fieldVersioning = [
  {
    f_version_date: "2020/02/05",
  },
  {
    f_version_date: "2021/05/15",
  },
  {
    f_version_date: "2022/09/30",
  },
];

const DAYS_ARRAY_MONTH_WISE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const fields = [1, 1, 1];
export default function NewTimeline() {
  const [showyears, setShowyears] = React.useState([2020, 2021, 2022]);
  const containerRef = React.useRef(null);
  const [WindowWidth, setWindowWidth] = React.useState( containerRef?.current?.offsetWidth * 0.68 );
  const [scrollPosition,setScroll]= React.useState(700)
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(containerRef?.current?.offsetWidth * 0.68);
    });
  }, []);

  function handleZoom() {
    if (showyears.length !== 3) {
      setShowyears([2020, 2021, 2022]);
      setWindowWidth(containerRef?.current?.offsetWidth * 0.68);
    } else {
      setShowyears([2018, 2019, 2020, 2021, 2022, 2023, 2024]);
      setWindowWidth(containerRef?.current?.offsetWidth * 0.2);
    }
  }

  const handleHeight = () => {
    return 90 + fields.length * 60;
  };

  const currentyear = new Date().getFullYear();

  const scroll = (scrollOffset) => {
    setTimeout(() => {
      containerRef.current.scrollLeft = scrollOffset;
    }, 100);
    
  };
 

  
  React.useEffect(() => {
    setWindowWidth(containerRef?.current?.offsetWidth * 0.68);
    setScroll(ScrollPosition(WindowWidth,showyears))
    setTimeout(() => {
      scroll(scrollPosition);
    }, 100);
    
  }, []);

  const handleBgColor = (year) => {
    let check = +currentyear % 2;

    if (year % 2 === check) {
      return "#ffff";
    }
    return "#F3F4F6";
  };
  return (
    <>
    
      <div
        ref={containerRef}
        style={{ height: `${handleHeight()}px`}}
        className="container"
      >
        {showyears.map((year, index) => {
          return (
            <div
              key={index}
              style={{
                width: WindowWidth,
                backgroundColor: handleBgColor(year),
              }}
            >
              <p onClick={handleZoom}>{year}</p>
              <ActiveDate
                WindowWidth={WindowWidth}
                year={year}
                showyears={showyears}
              />
              <MonthTab year={year} length={showyears.length} WindowWidth={WindowWidth} />

              {fields.map((_, index) => {
                return (
                  <Grid key={index} WindowWidth={WindowWidth}>
                    <FieldTimeLine
                      year={year}
                      seasons={seasons}
                      WindowWidth={WindowWidth}
                    />
                  </Grid>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

function MonthTab({ year, length,WindowWidth }) {
  const date = new Date();
  const dateMoment = moment(date);
  const CurrentMonth = dateMoment.format("M");
  const CurrentYear = date.getFullYear();

  const ActiveMonth = (month) => {
    if (year === CurrentYear && month === +CurrentMonth) {
      return true ;
    } else {
      return false;
    }
  };

  const handleMonths=()=>{
    if(length>3){
      return monthsShorts;
    }
    return months;
  }
  return (
    <div className="month_tab">
      {handleMonths().map((month, index) => {
        return (
          <div
            style={{
              width: WindowWidth / 12,
              backgroundColor: ActiveMonth(index + 1)?"#E99921":"",
              borderTopLeftRadius: ActiveMonth(index + 1)?"10px":"",
              borderTopRightRadius: ActiveMonth(index + 1)? "10px":"",
            }}
            key={index}
            className=  "month_tab_item"
          >
            {month}
          </div>
        );
      })}
    </div>
  );
}

function Grid({ children, WindowWidth }) {
  return (
    <div style={{ width: WindowWidth }} className="grid_tab">
      <div className="grid_child">{children}</div>

      {months.map((month, index) => {
        return (
          <div
            style={{ width: WindowWidth / 12 }}
            key={index}
            className="grid_tab_item"
          ></div>
        );
      })}
    </div>
  );
}

function FieldTimeLine({ year, seasons, WindowWidth }) {
  return (
    <div className="field_timeline">
      {seasons.map((season, index) => {
        return (
          <Season
            key={index}
            startDate={season.startDate}
            endDate={season.endDate}
            WindowWidth={WindowWidth}
            year={year}
          />
        );
      })}
      {fieldVersioning.map((fieldVersion, index) => {
        return (
          <Fieldbar
            fieldVersion={fieldVersion}
            key={index}
            WindowWidth={WindowWidth}
            year={year}
          />
        );
      })}
    </div>
  );
}

function Season({ startDate, endDate, WindowWidth, year }) {
  const startDateMoment = moment(startDate, "YYYY/MM/DD");
  const endDateMoment = moment(endDate, "YYYY/MM/DD");

  const startDateYear = startDateMoment.format("YYYY");
  const startDateMonth = startDateMoment.format("M");
  const startDateDay = startDateMoment.format("D");

  const endDateYear = endDateMoment.format("YYYY");
  const endDateMonth = endDateMoment.format("M");
  const endDateDay = endDateMoment.format("D");

  const DayWidth = WindowWidth / 12 / DAYS_ARRAY_MONTH_WISE[startDateMonth - 1];

  const SeasonStartDatePosition =
    (WindowWidth / 12) * (startDateMonth - 1) + DayWidth * startDateDay;
  const SeasonEndDatePosition =
    (WindowWidth / 12) * (endDateMonth - 1) + DayWidth * endDateDay;

  const yearDifference = endDateYear - startDateYear;

  const SeasonWidth =
    SeasonEndDatePosition -
    SeasonStartDatePosition +
    yearDifference * WindowWidth;

  function seasonColor() {
    if (
      moment(new Date()).isBetween(
        startDateMoment,
        endDateMoment,
        undefined,
        "[]"
      )
    ) {
      return "#90D6AA";
    } else if (endDateMoment.isBefore(moment(new Date()))) {
      return "#C2C7D0";
    } else if (startDateMoment.isAfter(moment(new Date()))) {
      return "#82CFFF";
    }
  }

  if (year !== +startDateYear && year !== +endDateYear) {
    return null;
  }
  function check() {
    if (year !== +startDateYear) {
      return SeasonEndDatePosition - SeasonWidth;
    }
    return SeasonStartDatePosition;
  }

  return (
    <div
      style={{
        left: check(),
        width: SeasonWidth + 1,
        background: seasonColor(),
      }}
      className="season"
    >
      <p>Season_Name</p>
    </div>
  );
}

function Fieldbar({ fieldVersion, WindowWidth, year }) {
  const fieldDateMoment = moment(fieldVersion.f_version_date, "YYYY/MM/DD");
  const fieldDateYear = fieldDateMoment.format("YYYY");
  const fieldDateMonth = fieldDateMoment.format("M");
  const fieldDateDay = fieldDateMoment.format("D");
  const DayWidth = WindowWidth / 12 / DAYS_ARRAY_MONTH_WISE[fieldDateMonth - 1];
  const fieldDatePosition =
    (WindowWidth / 12) * (fieldDateMonth - 1) + DayWidth * fieldDateDay;

  if (year !== +fieldDateYear) {
    return null;
  }

  return (
    <div style={{ left: fieldDatePosition }} className="fieldbar">
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

function ActiveDate({ WindowWidth, year, showyears }) {
  const today = moment(new Date());
  const activeDateMoment = moment(today);
  const activeDateYear = activeDateMoment.format("YYYY");
  const activeDateMonth = activeDateMoment.format("M");
  const activeDateDay = activeDateMoment.format("D");
  const DayWidth =
    WindowWidth / 12 / DAYS_ARRAY_MONTH_WISE[activeDateMonth - 1];
  const pastyears = showyears.indexOf(+activeDateYear);

  const activeDatePosition =
    (WindowWidth / 12) * (activeDateMonth - 1) +
    DayWidth * activeDateDay +
    pastyears * WindowWidth;

  return (
    <div style={{ left: activeDatePosition }} className="activeDate"></div>
  );
}

function ScrollPosition(WindowWidth,showyears){
  const today = moment(new Date());
  const activeDateMoment = moment(today);
  const activeDateYear = activeDateMoment.format("YYYY");
  const activeDateMonth = activeDateMoment.format("M");
  const activeDateDay = activeDateMoment.format("D");
  const DayWidth =
    WindowWidth / 12 / DAYS_ARRAY_MONTH_WISE[activeDateMonth - 1];
  const pastyears = showyears.indexOf(+activeDateYear);

  const activeDatePosition = (WindowWidth / 12) * (activeDateMonth - 1) + DayWidth * activeDateDay +(pastyears * WindowWidth);
    console.log(WindowWidth,showyears,activeDatePosition);
    return activeDatePosition;
}
