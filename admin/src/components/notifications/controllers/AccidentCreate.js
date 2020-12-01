import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const AccidentCreate = (props) => {
  return (
    <Create title="Create a Notification" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="resource" />
        <TextInput source="resource_specification" />
        <TextInput source="status" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Create>
  );
};

export default AccidentCreate;
