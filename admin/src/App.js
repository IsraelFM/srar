import * as React from "react";
import { Admin, Resource } from "react-admin";
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

import RatingsList from "./components/ratings/controllers/RatingsList";
import RatingsEdit from "./components/ratings/controllers/RatingsEdit";
import RatingsCreate from "./components/ratings/controllers/RatingsCreate";

import RoutesList from "./components/routes/controllers/RoutesList";
import RoutesEdit from "./components/routes/controllers/RoutesEdit";
import RoutesCreate from "./components/routes/controllers/RoutesCreate";

import authProvider from "./authProvider";
import Dashboard from "./Dashboard";

const App = () => (
  <Admin
    dataProvider={restProvider("http://localhost:3333/api")}
    dashboard={Dashboard}
    authProvider={authProvider}
  >
    <Resource
      name="accident"
      list={AccidentList}
      create={AccidentCreate}
      edit={AccidentEdit}
    />
    <Resource
      name="user"
      list={UsersList}
      create={UsersCreate}
      edit={UsersEdit}
    />
    <Resource
      name="panic_button"
      list={PannicCaseList}
      create={PannicCaseCreate}
      edit={PannicCaseEdit}
    />
    <Resource
      name="rating"
      list={RatingsList}
      create={RatingsCreate}
      edit={RatingsEdit}
    />

    <Resource
      name="route"
      list={RoutesList}
      create={RoutesCreate}
      edit={RoutesEdit}
    />
  </Admin>
);

export default App;
