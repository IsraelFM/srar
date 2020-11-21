import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  DateField,
} from "react-admin";

const PannicCaseList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="location" />
        <DateField source="date_hour" />
        <EditButton basePath="/panic_button" />
        <DeleteButton basePath="/panic_button" />
      </Datagrid>
    </List>
  );
};

export default PannicCaseList;
