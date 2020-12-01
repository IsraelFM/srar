import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const AccidentList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <TextField source="resource" />
        <TextField source="resource_specification" />
        <TextField source="status" />
        <TextField source="user_id" />
        <EditButton basePath="/notification" />
        <DeleteButton basePath="/notification" />
      </Datagrid>
    </List>
  );
};

export default AccidentList;
