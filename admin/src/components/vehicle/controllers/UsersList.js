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
        <TextField source="id" />
        <TextField source="year" />
        <TextField source="license_plate" />
        <TextField source="renavam" />
        <TextField source="brand" />
        <EditButton basePath="/vehicle" />
        <DeleteButton basePath="/vehicle" />
      </Datagrid>
    </List>
  );
};

export default EditList;
