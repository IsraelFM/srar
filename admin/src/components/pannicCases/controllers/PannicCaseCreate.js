import React from "react";
import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

const PannicCaseCreate = (props) => {
  return (
    <Create title="Create a PannicCase" {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="coordinates" />
        <DateInput label="Publish" source="date_hour" />
      </SimpleForm>
    </Create>
  );
};

export default PannicCaseCreate;
