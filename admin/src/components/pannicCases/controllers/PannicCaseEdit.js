import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

const PannicCaseEdit = (props) => {
  return (
    <Edit title="Edit a PannicCase" {...props}>
      <SimpleForm>
        <TextInput source="coordinates" />
        <TextInput source="date_hour" />
      </SimpleForm>
    </Edit>
  );
};

export default PannicCaseEdit;
