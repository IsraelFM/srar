import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  DateField,
} from "react-admin";

const AccidentList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="region" />
        <TextField source="type" />
        <TextField source="shift" />
        <TextField source="user_id" />
        <DateField source="date_hour" />
        <EditButton basePath="/accident" />
        <DeleteButton basePath="/accident" />
      </Datagrid>
    </List>
  );
};

export default AccidentList;
