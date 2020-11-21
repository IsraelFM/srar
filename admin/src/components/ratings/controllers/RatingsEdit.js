import React from "react";
import { Edit, SimpleForm, TextField, NumberInput } from "react-admin";

const RatingsEdit = (props) => {
  return (
    <Edit title="Edit a Rating" {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextField source="user_id" />
        <TextField source="accident_id" />
        <NumberInput source="rate" />
      </SimpleForm>
    </Edit>
  );
};

export default RatingsEdit;
