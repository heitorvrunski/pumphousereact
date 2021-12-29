import axios from "axios";
var firstDate = 9999999999999,
  lastDate = 0;
var colorList = [];

colorList[0] = "#8B3A3A";
colorList[1] = "#5959AB";
colorList[2] = "#CDAB2D";
colorList[3] = "#A2BC13";
colorList[4] = "#008B8B";
colorList[5] = "#1D7CF2";

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

        await axios
          .post(
            `${serverURL}/node/api/trend/singleTag/range`,
            {
              startDate: new Date(optionsChart.startPeriod).toJSON(),
              endDate: new Date(optionsChart.endPeriod).toJSON(),
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

    color: colorList[index],
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
    rangeSelector: {
      inputEnabled: false,
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
    legend: {
      enabled: true,
    },

    title: {
      text: "Historical Data",
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: "#888888",
      type: "datetime",
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: "#888888",
      labels: {
        formatter: function () {
          return (this.value > 0 ? " + " : "") + this.value;
        },
      },
      plotLines: [
        {
          value: 0,
          width: 2,
          color: "silver",
        },
      ],
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
