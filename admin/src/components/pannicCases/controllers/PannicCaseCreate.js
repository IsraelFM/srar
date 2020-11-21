import React from "react";
import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

const PannicCaseCreate = (props) => {
  return (
    <Create title="Create a PannicCase" {...props}>
      <SimpleForm>
        <TextInput source="coordinates" />
        <TextInput source="date_hour" />
      </SimpleForm>
    </Create>
  );
};

export default PannicCaseCreate;
