import * as React from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
//import jsonServerProvider from "ra-data-json-server";
import restProvider from "ra-data-simple-rest";

import AccidentList from "./components/accidents/controllers/AccidentList";
import AccidentCreate from "./components/accidents/controllers/AccidentCreate";
import AccidentEdit from "./components/accidents/controllers/AccidentEdit";

import UsersList from "./components/users/controllers/UsersList";
import UsersEdit from "./components/users/controllers/UsersEdit";
import UsersCreate from "./components/users/controllers/UsersCreate";

import PannicCaseList from "./components/pannicCases/controllers/PannicCaseList";
import PannicCaseEdit from "./components/pannicCases/controllers/PannicCaseEdit";
import PannicCaseCreate from "./components/pannicCases/controllers/PannicCaseCreate";

import authProvider from "./authProvider";
import Dashboard from "./Dashboard";

const App = () => (
  <Admin
    dataProvider={restProvider("http://localhost:3000")}
    dashboard={Dashboard}
    authProvider={authProvider}
  >
    <Resource
      name="accidents"
      list={AccidentList}
      create={AccidentCreate}
      edit={AccidentEdit}
    />
    <Resource
      name="users"
      list={UsersList}
      create={UsersCreate}
      edit={UsersEdit}
    />
    <Resource
      name="panniccase"
      list={PannicCaseList}
      create={PannicCaseCreate}
      edit={PannicCaseEdit}
    />
  </Admin>
);

export default App;
