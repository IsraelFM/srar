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
        <TextField source="track_situation" />
        <TextField source="track_type" />
        <EditButton basePath="/event" />
        <DeleteButton basePath="/event" />
      </Datagrid>
    </List>
  );
};
export default AccidentList;
