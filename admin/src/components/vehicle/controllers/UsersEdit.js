import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const UsersEdit = (props) => {
  return (
    <Edit title="Edit a Vehicle" {...props}>
      <SimpleForm>
        <TextInput source="year" />
        <TextInput source="license_plate" />
        <TextInput source="renavam" />
        <TextInput source="brand" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Edit>
  );
};

export default UsersEdit;
