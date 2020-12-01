import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const AccidentEdit = (props) => {
  return (
    <Edit title="Edit a Event" {...props}>
      <SimpleForm>
        <TextInput source="track_situation" />
        <TextInput source="track_type" />
      </SimpleForm>
    </Edit>
  );
};

export default AccidentEdit;
