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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
  input: {
    display: "none"
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

const sections = [
  "About Us",
  "Judgements",
  "Administration",
  "People",
  "Citizen Services",
  "RTI"
];

let documents = [];

export default function Main(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const contract = useContext(ContractContext);

  const { storageData } = contract;

  let verdict = "";

  const [open, setOpen] = React.useState(false);
  const [suitData, setSuitData] = React.useState({});
  const [reload, setReload] = React.useState(0);

  const handleClickOpen = suitId => {
    const d = storageData.filter(val => val._id == suitId);
    setSuitData(d[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setSuitData({});
    setOpen(false);
  };

  // const handleDelete = name => {
  //   documents = documents.filter(val => val.filename !== name);
  //   setReload(!reload);
  // };

  async function upload(suitData) {
    // console.log(await util.eventHandler(event));
    const input = document.getElementById("contained-button-file");
    const formData = new FormData();
    formData.append("files", input.files[0]);

    try {
      const ud = await api.UPLOAD(user._id, formData);
      suitData.policeDocumentFile.push(ud.data.file);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }

    await api.UPDATE_CASE(suitData);
    window.location.reload();
  }

  async function uploadDefence(suitData) {
    // console.log(await util.eventHandler(event));
    const input = document.getElementById("contained-button-file-d");
    const formData = new FormData();
    formData.append("files", input.files[0]);
    try {
      const ud = await api.UPLOAD(user._id, formData);
      suitData.accusedDocumentFile.push(ud.data.file);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }

    await api.UPDATE_CASE(suitData);
    window.location.reload();
  }

  const changeVerdict = event => {
    verdict = event.target.value;
  };

  const giveVerdict = async suitData => {
    let data = suitData;
    data.verdict = verdict;
    data.closeDate = new Date().getTime();
    await api.UPDATE_CASE(data);
    window.location.reload();
  };

  const acceptForDefence = async suitData => {
    let data = suitData;
    data.userIdAccused = user._id;
    await api.UPDATE_CASE(data);
    window.location.reload();
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
          >
            Digi Court
          </Typography>
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
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => {
                window.location.href = "/new";
              }}
            >
              New Case
            </Button>
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
          {
            <img
              style={{ width: "100%" }}
              src="http://localhost:3344/uploads/sup.jpeg"
            />
          }
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
                        {post.userIdAccused == user._id ? (
                          <Chip label="Accepted" color="primary" />
                        ) : (
                          ""
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
                {suitData.userIdAccused == "" &&
                suitData.userId != user._id &&
                user.type == 3 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      acceptForDefence(suitData);
                    }}
                    className={classes.button}
                  >
                    Accept for Defence
                  </Button>
                ) : (
                  ""
                )}
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
              {suitData.verdict == "" && user.type == 1 ? (
                <div>
                  <h2>Give Verdict</h2>
                  <textarea
                    className="c_textarea"
                    onChange={changeVerdict}
                  ></textarea>
                </div>
              ) : (
                <div>
                  <h2>
                    {suitData.verdict != ""
                      ? "Verdict Given :- "
                      : "Verdict Not Given Yet!"}
                  </h2>
                  {suitData.verdict}
                </div>
              )}
              <Grid item xs={12}>
                <h2>Police Documents : </h2>
                {user.type == 2 && suitData.verdict == "" ? (
                  <div>
                    <input
                      className={classes.input}
                      id="contained-button-file"
                      onChange={() => {
                        upload(suitData);
                      }}
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
                  </div>
                ) : (
                  ""
                )}
                &nbsp;
                <Grid item xs={12}>
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
              </Grid>
              &nbsp;
              <Grid item xs={12}>
                <h2>Prosecution Documents : </h2>
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
              <Grid item xs={12}>
                <h2>Defence Documents : </h2>
                {suitData.verdict == "" &&
                user.type == 3 &&
                suitData.userIdAccused != "" &&
                suitData.userId != user._id ? (
                  <div>
                    <input
                      className={classes.input}
                      id="contained-button-file-d"
                      onChange={() => {
                        uploadDefence(suitData);
                      }}
                      type="file"
                    />
                    <label htmlFor="contained-button-file-d">
                      <Button
                        variant="contained"
                        component="span"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                ) : (
                  ""
                )}
                &nbsp;
                <Grid item xs={12}>
                  {suitData.accusedDocumentFile
                    ? suitData.accusedDocumentFile.map(val => (
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
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              {suitData.verdict == "" && user.type == 1 ? (
                <Button
                  onClick={() => {
                    giveVerdict(suitData);
                  }}
                  color="primary"
                  autoFocus
                >
                  Save
                </Button>
              ) : (
                ""
              )}
            </DialogActions>
          </Dialog>
        </main>
      </Container>
    </React.Fragment>
  );
}
