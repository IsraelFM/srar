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
        <TextField source="coordinates" />
        <DateField source="date_hour" />
        <EditButton basePath="/pannicCases" />
        <DeleteButton basePath="/pannicCases" />
      </Datagrid>
    </List>
  );
};

export default PannicCaseList;
