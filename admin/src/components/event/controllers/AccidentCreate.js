import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

const AccidentCreate = (props) => {
  return (
    <Create title="Create a Event" {...props}>
      <SimpleForm>
        <TextInput source="track_situation" />
        <TextInput source="track_type" />
      </SimpleForm>
    </Create>
  );
};

export default AccidentCreate;
