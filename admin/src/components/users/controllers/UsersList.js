import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
} from "react-admin";

const EditList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="email" />
        <TextField source="name" />
        <EditButton basePath="/users" />
        <DeleteButton basePath="/users" />
      </Datagrid>
    </List>
  );
};

export default EditList;
