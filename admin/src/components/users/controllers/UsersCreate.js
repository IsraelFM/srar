import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const UsersCreate = (props) => {
  return (
    <Create title="Create a User" {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};

export default UsersCreate;
