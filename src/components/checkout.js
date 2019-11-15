import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { ethers } from "ethers";
import Review from "./Review";
import { ContractContext } from "./../context/contractContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Digi Court
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Accused Information", "Case Details", "Review your case"];

let name = null;
let city = null;
let state = null;
let zip = null;
let address = null;
let suit = null;
let country = null;
let documents = null;

const stoh = string => {
  return ethers.utils.formatBytes32String(string);
};

const htos = string => {
  return ethers.utils.parseBytes32String(string);
};

const handleChangeName = val => {
  name = val;
};

const handleChangeCity = val => {
  city = val;
};

const handleChangeState = val => {
  state = val;
};

const handleChangeZip = val => {
  zip = val;
};

const handleChangeAddress = val => {
  address = val;
};

const handleChangeCountry = val => {
  country = val;
};

const handleChangeSuit = val => {
  suit = val;
};

const handleChangeDocuments = val => {
  documents = val;
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          handleChangeName={handleChangeName}
          handleChangeCity={handleChangeCity}
          handleChangeState={handleChangeState}
          handleChangeZip={handleChangeZip}
          handleChangeAddress={handleChangeAddress}
          handleChangeCountry={handleChangeCountry}
        />
      );
    case 1:
      return (
        <PaymentForm
          handleChangeSuit={handleChangeSuit}
          handleChangeDocuments={handleChangeDocuments}
        />
      );
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const classes = useStyles();
  const Contract = useContext(ContractContext);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep == 2) {
      submit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const submit = async () => {
    console.log(Contract);

    const { accounts, contract } = Contract;
    const data = [
      "1",
      "2",
      "Anurag content",
      "anurag",
      "anurag",
      "anurag",
      "anurag",
      "anurag",
      "Passed"
    ];

    const hexData = data.map(val => stoh(val));
    console.log(hexData);
    await contract.createSuit(...hexData, { from: accounts[0] });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            File a Suit
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your case number is #2001539. Please note down in safe place.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
