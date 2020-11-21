import React from "react";
import { Edit, SimpleForm, TextInput, TextField } from "react-admin";

const AccidentEdit = (props) => {
  return (
    <Edit title="Edit a Accident" {...props}>
      <SimpleForm>
        <TextInput source="region" />
        <TextInput source="type" />
        <TextInput source="shift" />
        <TextInput source="user_id" />
        <TextInput source="date_hour" />
        <TextInput source="coordinates" />
      </SimpleForm>
    </Edit>
  );
};

export default AccidentEdit;
