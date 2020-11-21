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
        <TextField source="cpf" />
        <TextField source="status" />
        <EditButton basePath="/user" />
        <DeleteButton basePath="/user" />
      </Datagrid>
    </List>
  );
};

export default EditList;
