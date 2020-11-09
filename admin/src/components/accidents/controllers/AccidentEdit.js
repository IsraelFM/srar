import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

const AccidentEdit = (props) => {
  return (
    <Edit title="Edit a Accident" {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput multiline source="body" />
        <DateInput label="Publish" source="publishedAt" />
      </SimpleForm>
    </Edit>
  );
};

export default AccidentEdit;
