import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

const UsersEdit = (props) => {
  return (
    <Edit title="Edit a User" {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
};

export default UsersEdit;
