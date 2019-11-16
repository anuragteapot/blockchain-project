import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { width } from "@material-ui/system";
import api from "./../api";
import { UserContext } from "./../context/userContext";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

let documents = [];

export default function PaymentForm(props) {
  const classes = useStyles();

  const user = useContext(UserContext);

  const [reload, setReload] = React.useState(0);

  async function upload(event) {
    const input = document.getElementById("contained-button-file");
    const formData = new FormData();
    formData.append("files", input.files[0]);
    try {
      const ud = await api.UPLOAD(user._id, formData);
      documents.push(ud.data.file);
      props.handleChangeDocuments(documents);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = name => {
    documents = documents.filter(val => val.filename !== name);
    props.handleChangeDocuments(documents);
    setReload(!reload);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Case Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <textarea
            onChange={event => {
              props.handleChangeSuit(event.target.value);
            }}
            className="c_textarea"
          ></textarea>
          {/* <TextField required id="cardName" label="Name on card" fullWidth /> */}
        </Grid>
        <Grid item xs={12}>
          <input
            className={classes.input}
            id="contained-button-file"
            onChange={upload}
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>

          {documents.map(val => (
            <Chip
              label={val.filename}
              key={val.filename}
              onDelete={() => handleDelete(val.filename)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
