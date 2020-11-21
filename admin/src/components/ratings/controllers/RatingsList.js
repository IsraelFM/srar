import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  NumberField,
} from "react-admin";

const RatingsList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="user_id" />
        <TextField source="accident_id" />
        <NumberField source="rate" />
        <EditButton basePath="/rating" />
        <DeleteButton basePath="/rating" />
      </Datagrid>
    </List>
  );
};

export default RatingsList;
