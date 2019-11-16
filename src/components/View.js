import React, { Component, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { ContractContext } from "./../context/contractContext";

export function View(props) {
  const [suit, setSuit] = React.useState({});
  const contract = useContext(ContractContext);

  const { storageData } = contract;
  const { match } = props;

  const {
    params: { suitId }
  } = match;


  // console.log(contract);

  // console.log(contract);
  // const suitData = storageData.filter(val => val._id === suitId);
  // console.log(suitData);
  // setSuit(suitData[0]);

  return (
    <Paper className="view_suit">
      {/* <span>{suit._id} </span> */}
      <Typography variant="h5" component="h3">
        This is a sheet of paper.
      </Typography>
      <Typography component="p">
        Paper can be used to build surface or other elements for your
        application.
      </Typography>
    </Paper>
  );
}

export default View;
