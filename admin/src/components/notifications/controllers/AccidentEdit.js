import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const AccidentEdit = (props) => {
  return (
    <Edit title="Edit a Notification" {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="description" />
        <TextInput source="resource" />
        <TextInput source="resource_specification" />
        <TextInput source="status" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Edit>
  );
};

export default AccidentEdit;
