import React from "react";
import Layout from "./components/SystemComponents/Layout";
import { Provider } from "react-redux";
import store from "./store";
import './index.css';
import './App.scss';
import "./custom.scss";
import Routes from "./components/SystemComponents/routes";

export default function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes />
      </Layout>
    </Provider>
  );
}