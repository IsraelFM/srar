import React from "react";
import { Create, SimpleForm, TextInput, TextField } from "react-admin";

const AccidentCreate = (props) => {
  return (
    <Create title="Create a Accident" {...props}>
      <SimpleForm>
        <TextInput source="region" />
        <TextInput source="type" />
        <TextInput source="shift" />
        <TextInput source="date_hour" />
        <TextInput source="coordinates" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Create>
  );
};

export default AccidentCreate;
