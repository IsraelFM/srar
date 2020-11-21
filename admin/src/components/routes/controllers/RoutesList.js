import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from "react-admin";

const RoutesList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="to_address" />
        <TextField source="from_address" />
        <DateField source="date_hour_start" />
        <TextField source="user_id" />
        <EditButton basePath="/route" />
        <DeleteButton basePath="/route" />
      </Datagrid>
    </List>
  );
};

export default RoutesList;
