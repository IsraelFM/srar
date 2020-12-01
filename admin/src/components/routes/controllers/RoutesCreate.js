import React from "react";
import { Create, SimpleForm, TextInput, DateTimeInput } from "react-admin";

const RoutesCreate = (props) => {
  return (
    <Create title="Create a Route" {...props}>
      <SimpleForm>
        <TextInput source="to_address" />
        <TextInput source="from_address" />
        <TextInput source="date_hour_start" />
        <TextInput source="user_id" />
      </SimpleForm>
    </Create>
  );
};

export default RoutesCreate;
