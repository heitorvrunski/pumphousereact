import React, { useEffect, useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../store/actions.jsx";
import {
  CreateOptionsHighCharts,
  ClearOptions,
} from "../services/highCharts/index.js";
import CheckBox from "./SystemComponents/CheckBox.jsx";
import CheckboxList from "./SystemComponents/CheckBoxList.jsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";

import DurationButton from "./SystemComponents/DurationButton.jsx";
import InputDate from "./SystemComponents/InputDate.jsx";
import { FindConfig } from "../utils/SettingsUtils.js";
import Loading from "./SystemComponents/Loading.jsx";
import { useHistory } from "react-router";
import Ismobile from "is-mobile";

import "./Trend.scss";
import "../services/highCharts/CustomStyle.scss";

import Button from "./SystemComponents/Button.jsx";

export default function Trend() {
  const history = useHistory();

  HighchartsExporting(Highcharts);
  const ismobile = Ismobile()
  const chart = createRef();
  const dispatch = useDispatch();
  const configs = useSelector((state) => state.SysConfig);
  const trends = useSelector((state) => state.Trend);
  const mode = useSelector((state) => state.Trend?.options?.mode) ?? [];
  const byTime = useSelector((state) => state.Trend?.options?.byTime) ?? false;

  const duration = useSelector((state) => state.Trend?.options?.duration) ?? [];
  const startPeriod =
    useSelector((state) => state.Trend?.options?.startPeriod) ?? 0;
  const endPeriod =
    useSelector((state) => state.Trend?.options?.endPeriod) ?? 0;

  const dateStart =
    startPeriod !== 0 ? new Date(startPeriod).toISOString().substr(0, 10) : "";
  const dateEnd =
    endPeriod !== 0 ? new Date(endPeriod).toISOString().substr(0, 10) : "";
  const [reload, setReload] = useState(false);
  const [options, SetOptions] = useState({});
  /*const timezone = new Date().getTimezoneOffset();
  
  Highcharts.setOptions({
    global: {
      timezoneOffset: timezone,
    },
  });*/

  useEffect(
    () => {
      if (!trends?.TagList) {
        var trendsAux = [];

        const config = FindConfig(configs, "TrendTagList");
        config.value.forEach((element) => {
          trendsAux.push({ tag: element, checked: false });
        });
        dispatch(Actions.ConfigTrends(trendsAux));
      }
      if (trends?.TagList) {
        var checkeds = [];
        const chartRef = chart.current.chart;
        trends.TagList.forEach((element) => {
          if (element.checked === true) {
            checkeds.push(element.tag);
          }
        });
        if (checkeds.length > 0) {
          chartRef.showLoading();
          CreateOptionsHighCharts(checkeds, trends.options).then((res) => {
            try {
              chartRef.hideLoading();
            } catch {
              setTimeout(() => {
                setReload(!reload);
              }, 1000);
            }
            SetOptions(ClearOptions());

            SetOptions(res);
          });
        } else {
          try {
            chartRef.hideLoading();
          } catch {
            setTimeout(() => {
              setReload(!reload);
            }, 1000);
          }
          SetOptions(ClearOptions());
        }
      }
    }, // eslint-disable-next-line
    [trends, reload, dispatch, configs]
  );



  const changeMode = (modeComponent) => {
    dispatch(Actions.ChangeMode(modeComponent));
  };

  const changeDuration = (newDuration) => {
    dispatch(Actions.ChangeDuration(newDuration));
  };

  const clearAction = () => {
    dispatch(Actions.ClearAllTrends());
  };
  const handleByTimeChange = (e) =>{
    var value = e.target.checked;
    dispatch(Actions.SetByTime(value));


  }

  const changeReloadAction = () => {
    setReload(!reload);
  };

  return (
    <div className="container-fluid h-100 text-Dark">
      {!trends?.TagList ? (
        <Loading />
      ) : (
        <div className="row h-100">
          <div className="col-12 col-md-12 col-xl-10 m-0 p-0 h-100 mb-1 remove-h-100-sm">
            <div className="d-flex flex-column h-100">
              <div className=" d-flex m-2 flex-row row">
                <div
                  className={"p-2 col-12 col-sm-12  col-betweed-sm-md-12 col-md-" + (ismobile?"4":"2")}
                  style={{ minWidth: "220px" }}>
                  
                  <div className=" d-flex flex-row">
                    <h5 className="f-500">Menu</h5>
                    <Button
                    className="btn btn-principal mx-2"
                    type="button"
                    onClick={changeReloadAction}>
                      Reload

                    </Button>
                    <Button
                      className="btn btn-principal"
                      type="button"
                      onClick={clearAction}>
                      Clear
                    </Button>
                    <h5 className="f-400 text-Light m-0 p-0 text-center btn-Icon ms-3"  style={!ismobile?{"display":"none"}:{"fontSize":"20px"}}  onClick={()=>history.push("/")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="me-1" fill="#b4b4b4" height="25px"  viewBox="0 0 48 48"><path d="M24 40 8 24 24 8 26.1 10.1 13.7 22.5H40V25.5H13.7L26.1 37.9Z"/></svg>
                        Home
                    </h5>

                  </div>
                </div>
                
                
                <div
                  className="card d-flex col-12 col-sm-12 col-md-10 ms-auto col-between-md-xl-12 p-1"
                  style={{ maxWidth: "596px" }}
                >
                  
                  <div className="row my-1 d-flex flex-row">
                    <div
                      className="d-flex mx-0 col-2 col-md-2 justify-content-start px-2"
                      style={{ minWidth: "240px" }}
                    >
                      <h5 className="f-500">Period</h5>

                      <CheckBox
                        label="Duration"
                        className="text-Light"
                        componentState={0}
                        state={mode}
                        eventChange={changeMode}
                      />

                      <CheckBox
                        label="Range"
                        className="text-Light"
                        componentState={1}
                        state={mode}
                        eventChange={changeMode}
                      />
                    </div>
                    <div className="d-flex col-12 col-md-7 p-0">
                      <div
                        className={
                          "d-flex flex-wrap " + (mode === 0 ? "" : " collapsed")
                        }
                        style={{ minWidth: "200px" }}
                      >
                        <DurationButton

                          eventChange={changeDuration}
                          duration={duration}
                          buttonDuration={1}
                          label={"Last 24 Hour"}
                        />
                        <DurationButton
                          eventChange={changeDuration}
                          duration={duration}
                          buttonDuration={7}
                          label={"Last 7 days"}
                        />
                        <DurationButton
                          eventChange={changeDuration}
                          duration={duration}
                          buttonDuration={30}
                          label={"Last month"}
                        />
                        <DurationButton
                          eventChange={changeDuration}
                          duration={duration}
                          buttonDuration={90}
                          label={"Last 6 months"}
                        />
                        <DurationButton
                          eventChange={changeDuration}
                          duration={duration}
                          buttonDuration={365}
                          label={"Last year"}
                        />
                      </div>
                      <div
                        className={
                          "ms-2 d-flex row  justify-content-start" +
                          (mode === 1 ? "" : " collapsed")
                        }

                      >
                        <div style={{"display":"contents"}}>
                        <InputDate
                          className="mb-1 me-2"
                          input={dateStart}

                          name="startPeriod"
                          label="Start: "
                          byTime={byTime}
                        ></InputDate>
                        <InputDate
                          className=""
                          input={dateEnd}

                          name="endPeriod"
                          label="End: "
                          byTime={byTime}

                        ></InputDate>
                        </div>
                        <div style={{"display":"block"}} className="m-0 p-0">
                          <div className="d-flex m-0 p-0">
                          <input
                              className={" form-check-input m-1"}
                              type="checkbox"
                              onChange={handleByTimeChange}
                            ></input>
                            <h6 className="mt-1">By date and time</h6>
                          </div>

                          
                           
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card m-2 p-1 flex-grow-1 remove-Flex-grow-sm h-chart-sm">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                  containerProps={{ style: { height: "100%" } }}
                  constructorType={"stockChart"}
                  ref={chart}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 card  my-2 col-xl-2 mb-2 p-2">
            <h5>List</h5>
            <hr className="my-0"></hr>
            <div className="h-sm overflow-auto">
              {trends.TagList.map((trend, index) => (
                <CheckboxList
                  key={index}
                  index={index}
                  checked={trend.checked}
                  tag={trend.tag.label}
                ></CheckboxList>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
