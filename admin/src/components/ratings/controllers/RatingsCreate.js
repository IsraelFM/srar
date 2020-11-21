import React from "react";
import { Create, SimpleForm, NumberInput, TextField } from "react-admin";

const RatingsCreate = (props) => {
  return (
    <Create title="Create a Rating" {...props}>
      <SimpleForm>
        <TextField source="id" />
        <TextField source="user_id" />
        <TextField source="accident_id" />
        <NumberInput source="rate" />
      </SimpleForm>
    </Create>
  );
};

export default RatingsCreate;
