import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const UsersEdit = (props) => {
  return (
    <Edit title="Edit a User" {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="name" />
        <TextInput source="cpf" />
        <TextInput source="status" />
      </SimpleForm>
    </Edit>
  );
};

export default UsersEdit;
