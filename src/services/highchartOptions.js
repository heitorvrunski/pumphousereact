import axios from "axios";
import Highcharts from 'highcharts';

export const CreateOptionsHighCharts = async (tags,optionsChart)=>{
    const serverURL = `http://${window.location.hostname}:3000`
    var seriesOptions =[];
    if(optionsChart.mode===0){
        for (var index = 0; index< tags.length;index++) {
            const element = tags[index];
            await axios.get(`${serverURL}/node/api/trend/singleTag/${element.value}/${optionsChart.duration}`,{withCredentials:true})
            .then(resp=>{
                if(resp.status===200){
                    seriesOptions.push(success(resp.data,element.label,index))
                }
            })
          }
    }else{
        for (var index = 0; index< tags.length;index++) {
            const element = tags[index];
            await axios.post(`${serverURL}/node/api/trend/singleTag/range`,{"startDate": new Date(optionsChart.startPeriod).toJSON(), "endDate": new Date(optionsChart.endPeriod).toJSON(),"tag":element.value},{ 
                withCredentials: true,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                })
            .then(resp=>{
                if(resp.status===200){
                    seriesOptions.push(success(resp.data,element.label,index))
                }
            })
          }
    }
    
    return createOptions(seriesOptions);


    

}



var colorList = []

colorList[0] = '#8B3A3A';
colorList[1] = '#5959AB';
colorList[2] = '#CDAB2D';
colorList[3] = '#A2BC13';
colorList[4] = '#008B8B';
colorList[5] = '#1D7CF2';

function success(data,name,index) {
    return{
        name: name,
        data: data,
        showInNavigator: true,
        //type: 'line',

        color: colorList[index]
    };

}

function createOptions(seriesOptions) {
	
    return {
        rangeSelector: {
            inputEnabled: false,
            buttons: [
                {
                    type: 'minute',
                    count: 10,
                    text: '10m'
                }, {
                    type: 'minute',
                    count: 60,
                    text: '1h'
                }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'week',
                    count: 1,
                    text: '1w'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1m'
                },{
                    type: 'month',
                    count: 3,
                    text: '3m'
                },{
                    type: 'month',
                    count: 6,
                    text: '6m'
                }, {
                    type: 'all',
                    text: 'All'
                }]
        },
        legend: {
            enabled: true
        },

        title: {
            text: 'Historical Data'
        },
        xAxis: {
            gridLineWidth: 1,
            gridLineColor:'#888888',
            type: 'datetime',
        }, 
        yAxis: {
	    gridLineWidth: 1,
	    gridLineColor:'#888888',
            labels: {
                formatter: function () {
                    return (this.value > 0 ? ' + ' : '') + this.value;
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        plotOptions: {
            series: {
                showInNavigator: true
            }
        },

        tooltip: {
			formatter: function() {
			  var points = this.points,
				tooltipArray = ['<b>' + (new Date(this.x).toString().substr(0, 24)) + '</b>']

			  points.forEach(function(point, index) {
				tooltipArray.push('<span style="color:{series.color};width: 200px">'+point.series.name+'</span>: <b>'+point.y.toFixed(2)+'</b><br/>');
			  });

			  return tooltipArray;
			},
            valueDecimals: 2,
			style: {
                    fontSize:'16px'
                },
            split: true
        },
        

        series: seriesOptions
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
        

        series: []
        };

        

}