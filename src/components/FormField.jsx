import React from "react";
import { Formik, Form, useField } from 'formik';
import TextField from "@material-ui/core/TextField";
import Alert from '@material-ui/lab/Alert';


const FormField = ({name, label}) => {
    const [field, meta, helpers] = useField(name);
    return (
      <>
      <TextField name={name} variant="outlined" label={label} onChange={field.onChange} onBlur={field.onBlur}/>
      {meta.touched && meta.error ? <Alert severity="error" style={{marginTop: "15px"}}>{meta.error}</Alert> : null}
      </>
    )
  }

export default FormField;
