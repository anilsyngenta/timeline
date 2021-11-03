import React from 'react';
import moment from 'moment';
import Fieldbar from "../Fieldbar/Fieldbar"
import './FieldTimeLine.css';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const YEAR = 2021;
const EACH_MONTH_WIDTH = window.innerWidth/12
const DAYS_MONTH_WISE = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};
const DAYS_ARRAY_MONTH_WISE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const TOTAL_MONTHS = 12;
const MonthHeadingColumn = ({ year }) => {
  const currentDateMonth = moment().format('MMMM');
  const currentDay = moment().format('D');
  return (
    <div className='allMonthsHeading'>
      {months.map((month,index) => {
        const displayingMonth = moment(`${year}/${index}/01`);
        const numberOfdays = DAYS_ARRAY_MONTH_WISE[displayingMonth.format('M') - 1];
        const pixelToSkip = EACH_MONTH_WIDTH * (currentDay / numberOfdays);
        return (
          <div
            key={month + year}
            className='monthHeading'
            style={{ width: EACH_MONTH_WIDTH, background: currentDateMonth === month && '#E99921' }}
            id={month + year}>
            {month}
            {currentDateMonth === month && (
              <div
                style={{
                  position: 'relative',
                  left: pixelToSkip,
                  width: '1px',
                  height: '100px',
                  borderLeft: 'dotted #E99921'
                }}
              />
            )}
            <div style={{
                  position: 'relative',
                  height: '500px',
                  borderRight: '1px solid',
                  margin: "-2px"
                }}/>
          </div>
        );
      })}
    </div>
  );
};
const seasons = [
  {
    startDate: '2021/02/1',
    endDate: '2021/03/30'
  },
  {
    startDate: '2021/05/5',
    endDate: '2021/06/10'
  },
  {
    startDate: '2021/10/15',
    endDate: '2021/11/10'
  }
];
const fieldVersioning = [
  {
    f_version_date: '2021/01/05',
  },
  {
    f_version_date: '2021/05/15',
  },
  {
    f_version_date: '2021/09/30',
  }
];
export const TimeLine = () => {
 
  return (
    <div>
      <MonthHeadingColumn year={YEAR} />
      <div style={{ display: 'flex', position: 'relative', marginTop: 5, height:51 , borderBottom:"1px solid", alignItems:"center" }}>
        <SingleFieldTimeLineComponent seasons={seasons} fieldVersioning={fieldVersioning} />
      </div>
      {/* <div style={{ display: 'flex', position: 'relative', marginTop: 5, height:51 , borderBottom:"1px solid", alignItems:"center" }}>
        <SingleFieldTimeLineComponent seasons={seasons} />
      </div> */}
      {/* <div style={{ display: 'flex', position: 'relative', marginTop: 5, height:51 , borderBottom:"1px solid", alignItems:"center" }}>
        <SingleFieldTimeLineComponent seasons={seasons} />
      </div> */}
    </div>
  );
};
// const FieldVersioning = ({fieldVersioning})=>{
//   const fieldVersioningTimeLine =[];
//  return  <div
//  key={index}
//  style={{
//    width: timeline.totalFieldTimeLinePixel,
//    background: timeline.color,
//    height: 25,
//    position: 'absolute',
//    left: timeline.leftPixelToSkip,
//    textAlign: 'center',
//    borderRadius:4
//  }}
//  // title={`${startDateMoment.format('DD_MM_YYYY')}--->${endDateMoment.format('DD_MM_YYYY')}`}
//  title={index + 1}>
//  {dummySeasonNames[Math.floor(Math.random() * 3)]}
// </div>
// }
export const SingleFieldTimeLineComponent = ({seasons,fieldVersioning=[]}) => {
  const seasonWithTimeLines = [];
  seasons.forEach((season) => {
    const timeline = {};
    const { startDate, endDate } = season;
    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);
    // calculate number of pixel to skip
    const year = startDateMoment.format('YYYY');
    const janStartDate = moment(new Date(`${year}/01/01`));
    const skipPixelEndDate = moment(startDate);
    timeline.leftPixelToSkip = 0;
    const monthsToSkip = (skipPixelEndDate.format('M') - 1)*EACH_MONTH_WIDTH
  //  console.log({monthsToSkip});
  timeline.leftPixelToSkip+= monthsToSkip
    // while (
    //   skipPixelEndDate > janStartDate ||
    //   janStartDate.format('M') === skipPixelEndDate.format('M')
    // ) {
    //   const NUMBER_OF_DAYS = DAYS_ARRAY_MONTH_WISE[janStartDate.format('M') - 1];
    //   timeline.leftPixelToSkip += EACH_MONTH_WIDTH * (skipPixelEndDate.format('D') - 1 / NUMBER_OF_DAYS);
    //   if(janStartDate.format('M') < skipPixelEndDate.format('M')){
    //     const monthsToSkip = skipPixelEndDate.format('M') - 1;
    //     timeline.leftPixelToSkip += EACH_MONTH_WIDTH * monthsToSkip;
    //   }
    //   janStartDate.add(1, 'month');
    // }
    // calculate number of pixel to render on the screen
    let firstMonthCovered = false;
    const dateStart = moment(startDate);
    timeline.totalFieldTimeLinePixel = 0;
    while (endDateMoment > dateStart || dateStart.format('M') === endDateMoment.format('M')) {
      const NUMBER_OF_DAYS = DAYS_ARRAY_MONTH_WISE[dateStart.format('M') - 1];
      if (endDateMoment > dateStart) {
        if (firstMonthCovered) {
          timeline.totalFieldTimeLinePixel += EACH_MONTH_WIDTH;
        } else {
          firstMonthCovered = true;
          timeline.totalFieldTimeLinePixel +=
            EACH_MONTH_WIDTH * ((NUMBER_OF_DAYS - dateStart.format('D')) / NUMBER_OF_DAYS);
             timeline.leftPixelToSkip+=  EACH_MONTH_WIDTH * ((dateStart.format('D')) / NUMBER_OF_DAYS);
        }
      } else if (dateStart.format('M') === endDateMoment.format('M')) {
        timeline.totalFieldTimeLinePixel +=
          (EACH_MONTH_WIDTH * endDateMoment.format('M')) / NUMBER_OF_DAYS;
      }
      dateStart.add(1, 'month');
    }
    if (moment(new Date()).isBetween(startDateMoment, endDateMoment, undefined, '[]')) {
      timeline.color = '#90D6AA';
    } else if (endDateMoment.isBefore(moment(new Date()))) {
      timeline.color = '#C2C7D0';
    } else if (startDateMoment.isAfter(moment(new Date()))) {
      timeline.color = '#82CFFF';
    }
    seasonWithTimeLines.push(timeline);
  });

  // Calculating position for FieldVersioning bar
  const FieldBarPosition=[]

  fieldVersioning.forEach((date)=>{
    let positionFromleft=0
    let FieldDateWithMoment= moment(date.f_version_date,'YYYY/MM/DD')
    let month = FieldDateWithMoment.format('M')
    let day= FieldDateWithMoment.format('D')
    let TotalDaysInMonth=DAYS_ARRAY_MONTH_WISE[month]
   
    
    positionFromleft= EACH_MONTH_WIDTH*month

    FieldBarPosition.push(positionFromleft)
  })

  const dummySeasonNames = ['Corn', 'Soya', 'Banana'];
  return (
    <>
      {seasonWithTimeLines.map((timeline, index) => (
        <div
          key={index}
          style={{
            width: timeline.totalFieldTimeLinePixel,
            background: timeline.color,
            height: 25,
            position: 'absolute',
            left: timeline.leftPixelToSkip,
            textAlign: 'center',
            borderRadius:4
          }}
          //  title={`${startDateMoment.format('DD_MM_YYYY')}--->${endDateMoment.format('DD_MM_YYYY')}`}
           title={index + 1}
          >
          {dummySeasonNames[Math.floor(Math.random() * 3)]}
        </div>
      ))}
      {/* <FieldVersioning></FieldVersioning> */}
     {
       FieldBarPosition.map((position,i)=>{
         return <Fieldbar key={i} left={position} height="60px"/>
       })
     }
       
    </>
  );
};
