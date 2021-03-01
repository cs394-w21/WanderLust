import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

const FormField = (props) => {
  const { name } = props;
  const [field, meta] = useField(name);
  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {meta.touched && meta.error ? (
        <Alert severity="error" style={{ marginTop: "15px" }}>
          {meta.error}
        </Alert>
      ) : null}
    </>
  );
};

export default FormField;
