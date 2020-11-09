import React from "react";
import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

const AccidentCreate = (props) => {
  return (
    <Create title="Create a Accident" {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput multiline source="body" />
        <DateInput label="Publish" source="publishedAt" />
      </SimpleForm>
    </Create>
  );
};

export default AccidentCreate;
