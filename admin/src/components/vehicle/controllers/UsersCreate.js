import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const UsersCreate = (props) => {
  return (
    <Create title="Create a Vehicle" {...props}>
      <SimpleForm>
        <TextInput source="year" />
        <TextInput source="license_plate" />
        <TextInput source="renavam" />
        <TextInput source="brand" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Create>
  );
};

export default UsersCreate;
