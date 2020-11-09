import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

const PannicCaseEdit = (props) => {
  return (
    <Edit title="Edit a PannicCase" {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="coordinates" />
        <DateInput source="date_hour" />
      </SimpleForm>
    </Edit>
  );
};

export default PannicCaseEdit;
