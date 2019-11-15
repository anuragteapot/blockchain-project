import React from "react";
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

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function upload(event) {}

export default function PaymentForm(props) {
  const classes = useStyles();

  const handleDelete = () => {
    console.log(props);
    console.info("You clicked the delete icon.");
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
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
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

          <Chip
            label="Deletable primary"
            onDelete={handleDelete}
            color="primary"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
