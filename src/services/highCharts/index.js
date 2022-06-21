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

    return createOptions(seriesOptions);
  } catch {
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
    showInNavigator: true,
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

function createOptions(seriesOptions) {
  const sFirstDate = getFormattedDate(new Date(firstDate));
  const sLastDate = getFormattedDate(new Date(lastDate));
  var subtitle = "";
  if (sFirstDate === sLastDate) {
    subtitle += sFirstDate;
  } else {
    subtitle += sFirstDate + " to " + sLastDate;
  }

  return {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      backgroundColor:"#3e3e40",
      plotBorderColor: '#606063'
    },
    rangeSelector: {
      inputEnabled: false,
      
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
            color: '#CCC'
        },
        states: {
            hover: {
                fill: '#707073',
                stroke: '#000000',
                style: {
                    color: 'white'
                }
            },
            select: {
                fill: '#000003',
                stroke: '#000000',
                style: {
                    color: 'white'
                }
            }
        }
      },
      buttons: [
        {
          type: "minute",
          count: 10,
          text: "10m",
          
        },
        {
          type: "minute",
          count: 60,
          text: "1h",
        },
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      
    },
    drilldown: {
      activeAxisLabelStyle: {
          color: '#F0F0F3'
      },
      activeDataLabelStyle: {
          color: '#F0F0F3'
      }
  },
    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
  },
    legend: {
      itemStyle:{color:'#b4b4b4'},

      enabled: true,
    },

    title: {
      text: "Historical Data",
      style: {
        color: '#E0E0E3',
        fontSize: '20px'
    }
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      gridLineWidth: 1,
      type: "datetime",
      gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        },
    },

    plotOptions: {
      series: {
        showInNavigator: true,
      },
    },

    tooltip: {
      formatter: function () {
        var points = this.points,
          tooltipArray = [
            "<b>" + new Date(this.x).toString().substr(0, 24) + "</b>",
          ];

        points.forEach(function (point, index) {
          tooltipArray.push(
            '<span style="color:{series.color};width: 200px">' +
              point.series.name +
              "</span>: <b>" +
              point.y.toFixed(2) +
              "</b><br/>"
          );
        });

        return tooltipArray;
      },
      valueDecimals: 2,
      style: {
        fontSize: "16px",
      },
      split: true,
    },

    exporting: {
      chartOptions: {
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
            },
          },
        },
      },
    },
    navigator: {
      handles: {
          backgroundColor: '#666',
          borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
          color: '#7798BF',
          lineColor: '#A6C7ED'
      },
      xAxis: {
          gridLineColor: '#505053'
      }
  },
    series: seriesOptions,
  };
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
