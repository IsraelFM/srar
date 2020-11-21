import React from "react";
import { Edit, SimpleForm, TextInput, DateTimeInput } from "react-admin";

const RoutesEdit = (props) => {
  return (
    <Edit title="Edit a Route" {...props}>
      <SimpleForm>
        <TextInput source="to_address" />
        <TextInput source="from_address" />
        <DateTimeInput source="date_hour_start" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Edit>
  );
};

export default RoutesEdit;
