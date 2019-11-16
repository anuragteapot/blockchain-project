import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Markdown from "./Markdown";
import { NavLink } from "react-router-dom";
import { UserContext } from "./../context/userContext";
import { ContractContext } from "./../context/contractContext";
import api from "./../api";
import * as webStorage from "./../api/webStorage";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function logout() {
  webStorage.local.destroy("$accessToken");
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/user/erondu)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

const sections = [
  "Technology",
  "Culture",
  "Business",
  "Politics",
  "Science",
  "Style"
];

export default function Main() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const contract = useContext(ContractContext);

  const { storageData } = contract;

  const [open, setOpen] = React.useState(false);
  const [suitData, setSuitData] = React.useState({});

  const handleClickOpen = suitId => {
    const d = storageData.filter(val => val._id == suitId);
    setSuitData(d[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setSuitData({});
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Button size="small">{user.name ? user.name : ""}</Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          ></Typography>
          <TextField
            label="Search"
            id="outlined-margin-dense"
            className={classes.textField}
            margin="dense"
            variant="outlined"
          />
          {!user.name ? (
            <NavLink exact activeClassName="active" to="/signin">
              <Button variant="outlined" size="small">
                Sign in
              </Button>
            </NavLink>
          ) : (
            ""
          )}
          &nbsp;
          {!user.name ? (
            <NavLink exact activeClassName="active" to="/signup">
              <Button variant="outlined" size="small">
                Sign up
              </Button>
            </NavLink>
          ) : (
            ""
          )}
          {user.name ? (
            <Button variant="outlined" size="small" onClick={logout}>
              Logout
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {sections.map(section => (
            <Link
              color="inherit"
              noWrap
              key={section}
              variant="body2"
              href="#"
              className={classes.toolbarLink}
            >
              {section}
            </Link>
          ))}
        </Toolbar>
        <main>
          <Grid container spacing={4}>
            {storageData.map(post => (
              <Grid item key={post._id} xs={12} md={6}>
                <CardActionArea>
                  <Card
                    className={classes.card}
                    onClick={() => {
                      handleClickOpen(post._id);
                    }}
                  >
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <span>Case Id : </span>
                        <strong>{post._id.split("-")[0]}</strong>
                        <br></br>
                        <Typography variant="subtitle1" color="textSecondary">
                          {post.openDate}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.content}
                        </Typography>
                        {post.verdict == "" ? (
                          <Chip label="Pending" color="secondary" />
                        ) : (
                          <Chip label="Verdict Given" color="primary" />
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Accused Person Details
                </Typography>
                <Typography gutterBottom>
                  {suitData.info ? suitData.info.name : ""}
                </Typography>
                <Typography gutterBottom>
                  {suitData.info ? suitData.info.address : ""}
                </Typography>
              </Grid>
              <DialogContentText id="alert-dialog-description">
                Case Details : <strong>{suitData._id}</strong> <br></br>
                <br></br>
                {suitData.content}
              </DialogContentText>
              <h2>Give Verdict</h2>
              <textarea className="c_textarea"></textarea>
              <Grid item xs={12}>
                <h2>Police Documents : </h2>
                {suitData.policeDocumentFile
                  ? suitData.policeDocumentFile.map(val => (
                      <Chip
                        label={val.filename}
                        component="a"
                        key={val.filename}
                        target="_blank"
                        href={"http://localhost:3344/" + val.path}
                        clickable
                      />
                    ))
                  : ""}
              </Grid>
              <Grid item xs={12}>
                <h2>Victim Documents : </h2>
                {suitData.documentFile
                  ? suitData.documentFile.map(val => (
                      <Chip
                        label={val.filename}
                        component="a"
                        key={val.filename}
                        target="_blank"
                        href={"http://localhost:3344/" + val.path}
                        clickable
                      />
                    ))
                  : ""}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </Container>
    </React.Fragment>
  );
}
