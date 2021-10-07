import React from "react";
import Layout from "./components/Layout";
import { Provider } from "react-redux";

import store from "./store";
import './index.css';

import "./custom.scss";
import Routes from "./components/routes";

export default function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes />
      </Layout>
    </Provider>
  );
}
