import {ThemeRangeSelector} from './HighChartsTheme'
import {ThemeLineSimple} from './HighChartsTheme'



import axios from "axios";

var firstDate = 9999999999999,
  lastDate = 0;


export const CreateOptionsHighCharts = async (tags, optionsChart) => {
  const serverURL = `http://${window.location.hostname}:${process.env.REACT_APP_NODE_PORT??3000}`;
  firstDate = 9999999999999;
  lastDate = 0;
  var seriesOptions = [];
  try {
    if (optionsChart.mode === 0) {
      for (var idx = 0; idx < tags.length; idx++) {
        const element = tags[idx];
        const id = idx;
        await axios
          .get(
            `${serverURL}/node/api/trend/singleTag/${element.browseName}/${optionsChart.duration}`,
            { withCredentials: true }
          )
          .then((resp) => {
            if (resp.status === 200) {
              seriesOptions.push(success(resp.data, element.label, id));
            }
          });
      }
    } else {
      for (var idx2 = 0; idx2 < tags.length; idx2++) {
        const element = tags[idx2];
        const id = idx2;
        const hoursStart = parseInt(optionsChart.startTime.split(':')[0]);
        const minutesStart = parseInt(optionsChart.startTime.split(':')[1]);
        const hoursEnd = parseInt(optionsChart.endTime.split(':')[0]);
        const minutesEnd = parseInt(optionsChart.endTime.split(':')[1]);
        const dataStart2Send = new Date(optionsChart.startPeriod);
        dataStart2Send.setTime(dataStart2Send.getTime() + (hoursStart*60*60*1000))
        dataStart2Send.setTime(dataStart2Send.getTime() + (minutesStart*60*1000))

        const dataEnd2Send = new Date(optionsChart.endPeriod);
        dataEnd2Send.setTime(dataEnd2Send.getTime() + (hoursEnd*60*60*1000))
        dataEnd2Send.setTime(dataEnd2Send.getTime() + (minutesEnd*60*1000))
        console.log(dataStart2Send.toJSON())
        console.log(dataEnd2Send.toJSON())
        

        await axios
          .post(
            `${serverURL}/node/api/trend/singleTag/range`,
            {
              startDate: dataStart2Send.toJSON(),
              endDate: dataEnd2Send.toJSON(),
              tag: element.browseName,
            },
            {
              withCredentials: true,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((resp) => {
            if (resp.status === 200) {
              seriesOptions.push(success(resp.data, element.label, id));
            }
          });
      }
    }

    return createOptions(seriesOptions,0);
  } catch {
    return {};
  }
};

export const CreateOptionsHighChartsOneTagRange = async (tag, optionsChart) => {
  const serverURL = `http://${window.location.hostname}:${process.env.REACT_APP_NODE_PORT??3000}`;

  var seriesOptions = [];
  try {
    
    const element = tag;
    const id = 0;


    const dataStart2Send = new Date(optionsChart.startDate);


    const dataEnd2Send = new Date(optionsChart.endDate);

    

    await axios
      .post(
        `${serverURL}/node/api/trend/singleTag/range`,
        {
          startDate: dataStart2Send.toJSON(),
          endDate: dataEnd2Send.toJSON(),
          tag: element,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {

        if (resp.status === 200) {
          seriesOptions.push(success(resp.data, "Pressure", id));
        }
      });
      

    return createOptions(seriesOptions,1);
  } catch (e){

    return {};
  }
};

function success(data, name, index) {
  if (firstDate > data[0][0]) {
    firstDate = data[0][0];
  }
  if (lastDate < data[data.length - 1][0]) {
    lastDate = data[data.length - 1][0];
  }

  return {
    name: name,
    data: data,
    //showInNavigator: true,
    //type: 'line',

   // color: colorList[index],
  };
}

function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

function createOptions(seriesOptions,style) {
  const sFirstDate = getFormattedDate(new Date(firstDate));
  const sLastDate = getFormattedDate(new Date(lastDate));
  var subtitle = "";
  if (sFirstDate === sLastDate) {
    subtitle += sFirstDate;
  } else {
    subtitle += sFirstDate + " to " + sLastDate;
  }

  var styleObj = {}
  if(style===0)
    styleObj=Object.assign
      (ThemeRangeSelector,{
        subtitle: {
         text: subtitle,
          },
        });
  else
    styleObj=ThemeLineSimple;

  return Object.assign(
    styleObj,
    {series: seriesOptions}
  );
}

export function ClearOptions() {
  return {
    rangeSelector: {},
    legend: {},

    title: {},
    xAxis: {},
    yAxis: {},

    plotOptions: {},

    tooltip: {},

    series: [],
  };
}
