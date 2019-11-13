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
import api from "./../api";
import * as webStorage from "./../api/webStorage";

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
  "Design",
  "Culture",
  "Business",
  "Politics",
  "Opinion",
  "Science",
  "Health",
  "Style",
  "Travel"
];

const featuredPosts = [
  {
    title: "Case 1",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  },
  {
    title: "Case 2",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  },
  {
    title: "Case 3",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  },
  {
    title: "Case 4",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content."
  }
];

export default function Main() {
  const classes = useStyles();
  const user = useContext(UserContext);

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
          &nbsp;
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
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: "none" }}
                src="https://source.unsplash.com/user/erondu"
                alt="background"
              />
            }
            <div className={classes.overlay} />
            {/* <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography
                    component='h1'
                    variant='h3'
                    color='inherit'
                    gutterBottom
                  >
                    Title of a longer featured Main post
                  </Typography>
                  <Typography variant='h5' color='inherit' paragraph>
                    Multiple lines of text that form the lede, informing new
                    readers quickly and efficiently about what&apos;s most
                    interesting in this post&apos;s contents.
                  </Typography>
                  <Link variant='subtitle1' href='#'>
                    Continue reading…
                  </Link>
                </div>
              </Grid>
            </Grid> */}
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <CardActionArea component="a" href="#">
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {post.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.description}
                        </Typography>
                        {/* <Typography variant='subtitle1' color='primary'>
                          Continue reading...
                        </Typography> */}
                        {/* <Chip label="Pending"  color="secondary" /> */}
                        <Chip label="Verdict" color="primary" />
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
          {/* End sub featured posts */}
          {/* <Grid container spacing={5} className={classes.mainGrid}> */}
          {/* Main content */}
          {/* <Grid item xs={12} md={8}>
              <Typography variant='h6' gutterBottom>
                From the Firehose
              </Typography>
              <Divider />
              {posts.map(post => (
                <Markdown
                  className={classes.markdown}
                  key={post.substring(0, 40)}
                >
                  {post}
                </Markdown>
              ))}
            </Grid> */}
          {/* End main content */}
          {/* Sidebar */}
          {/* <Grid item xs={12} md={4}>
              <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant='h6' gutterBottom>
                  About
                </Typography>
                <Typography>
                  Etiam porta sem malesuada magna mollis euismod. Cras mattis
                  consectetur purus sit amet fermentum. Aenean lacinia bibendum
                  nulla sed consectetur.
                </Typography>
              </Paper>
              <Typography
                variant='h6'
                gutterBottom
                className={classes.sidebarSection}
              >
                Archives
              </Typography>
              {archives.map(archive => (
                <Link display='block' variant='body1' href='#' key={archive}>
                  {archive}
                </Link>
              ))}
              <Typography
                variant='h6'
                gutterBottom
                className={classes.sidebarSection}
              >
                Social
              </Typography>
              {social.map(network => (
                <Link display='block' variant='body1' href='#' key={network}>
                  {network}
                </Link>
              ))}
            </Grid> */}
          {/* End sidebar */}
          {/* </Grid> */}
        </main>
      </Container>
      {/* Footer */}
      {/* <footer className={classes.footer}>
        <Container maxWidth='lg'>
          <Typography variant='h6' align='center' gutterBottom>
            Footer
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            color='textSecondary'
            component='p'
          >
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </Container>
      </footer> */}
      {/* End footer */}
    </React.Fragment>
  );
}
