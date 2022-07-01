

export const ThemeRangeSelector = {
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
        // subtitle: {
        //   text: subtitle,
        // },
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
    
        // tooltip: {
        //   formatter: function () {
        //     var points = this.points,
        //       tooltipArray = [
        //         "<b>" + new Date(this.x).toString().substr(0, 24) + "</b>",
        //       ];
    
        //     points.forEach(function (point, index) {
        //       tooltipArray.push(
        //         '<span style="color:{series.color};width: 200px">' +
        //           point.series.name +
        //           "</span>: <b>" +
        //           point.y.toFixed(2) +
        //           "</b><br/>"
        //       );
        //     });
    
        //     return tooltipArray;
        //   },
        //   valueDecimals: 2,
        //   style: {
        //     fontSize: "16px",
        //   },
        //   split: true,
        // },
    
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
      }
};

export const ThemeLineSimple = {
  colors: ['#5836e5', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
  navigator: {
      enabled:false,
      buttonOptions: {
        enabled: false
        }
  },
  rangeSelector: {
    enabled:false

  },


	xAxis: {
  	visible: true
  },
  scrollbar: {
    enabled: false,
    visible: false
  },
  exporting:{
    enabled: false
  },
  title: {
    text: "",
    
    }
    
};

