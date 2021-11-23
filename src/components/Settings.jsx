import { useEffect, useState } from "react";
import Table from "./SettingsComponents/Table";
import update from "react-addons-update";
import { FindConfig } from "../utils/SettingsUtils";
import { useSelector } from "react-redux";
import { UpdateSettings } from "../commands";
import Button from "./SystemComponents/Button.jsx"

export default function Config() {
  const socket = useSelector((state) => state.SocketIO.socket);

  const [settings, setSettings] = useState([]);
  const settingsNode = useSelector((state) => state.SysConfig);
  const tags = useSelector((state) => state.Tags);

  useEffect(() => {
    if (settings.length === 0) {
      var settingsAux = [];
      const config = FindConfig(settingsNode, "Settings");

      config.value.forEach((element) => {
        const value = tags.getIn(element.browseName);

        settingsAux.push({
          label: element.label,
          value: value,
          browseName: element.browseName,
        });
      });

      setSettings(settingsAux);
    }
  }, [settings, settingsNode, tags]);

  const handleOptionOnChange = (event) => {
    const target = event.target;
    const idx = parseInt(target.id);
    const value = target.value;
    const state = update(settings, {
      [idx]: {
        value: { $set: value },
      },
    });
    setSettings(state);
  };

  const handleSubmitChanges = (event) => {
    for (const element of settings) {
      const prevValue = tags.getIn(element.browseName);
      if (prevValue !== element.value) {
        UpdateSettings(element.browseName, element.value, socket);
      }
    }
  };

  return (
    <div className="row justify-content-center mx-2 d-flex">
      <div className="card m-2" style={{ width: "320px" }}>
        <h5 className="m-2">Settings</h5>
        <Table
          data={settings}
          classTable="table-sm d-flex overflow-auto h6"
          classInput="tableInput"
          handleOptionOnChange={handleOptionOnChange}
        />
        <Button
          type="button"
          className="btn btn-principal my-2"
          onClick={handleSubmitChanges}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
