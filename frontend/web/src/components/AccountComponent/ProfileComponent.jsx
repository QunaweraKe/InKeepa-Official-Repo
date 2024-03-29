import React from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//local
import { updateUserDetails, deactivateUser } from "../../store/actions/auth";

function ProfileComponent(props) {
  const { classes, isUiLoading, user, updateUserDetails, deactivateUser } =
    props;
  dayjs.extend(relativeTime);
  const [isEditEnabled, setIsEditEnabled] = React.useState(false);
  const [userDetail, setUserDetail] = React.useState(() => user);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = React.useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // update user detail with userDetailUpdate action
    if (userDetail) {
      updateUserDetails(userDetail);
    }
  };

  const handleInputChange = (e) => {
    setUserDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleCheckboxChange = (e) => {
  //   setUserDetail((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.checked,
  //   }));
  // };

  const handleCloseDeactivateDialog = () => {
    setDeactivateDialogOpen(false);
  };

  const handleOpenDeactivateDialog = () => {
    setDeactivateDialogOpen(true);
  };

  const handleToggleEditButton = () => {
    setIsEditEnabled((prevState) => {
      prevState === true && setUserDetail(user);
      return !prevState;
    });
  };

  const handleDeactivateUser = () => {
    deactivateUser();
  };

  return (
    <>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography variant="h2" style ={{fontWeight:800}}align="center">
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CardContent className={classes.cardContent}>
              <form
                className={classes.cardContent}
                noValidate
                onSubmit={handleFormSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      name="full_name"
                      onChange={handleInputChange}
                      value={userDetail.full_name || ""}
                      disabled={!isEditEnabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      onChange={handleInputChange}
                      value={userDetail.username || ""}
                      disabled={!isEditEnabled}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      color="secondary"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleInputChange || ""}
                      value={userDetail.email}
                      disabled={!isEditEnabled}
                    />
                  </Grid>
                </Grid>
                <CardActions className={classes.actionButtons}>
                  {isEditEnabled ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Button
                          type="button"
                          fullWidth
                          variant="outlined"
                          color="secondary"
                          disabled={!isEditEnabled}
                          onClick={handleToggleEditButton}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          disabled={isUiLoading}
                          endIcon={
                            isUiLoading && <CircularProgress size={20} />
                          }
                        >
                          Update
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={isEditEnabled}
                      onClick={handleToggleEditButton}
                    >
                      Edit
                    </Button>
                  )}
                </CardActions>
              </form>
              <Link
                className={classes.cardContent}
                onClick={handleOpenDeactivateDialog}
                underline="always"
                component="button"
                color="secondary"
                style={{fontWeight:"bold",fontSize:15}}
                
              >
                Delete Account{"?"}
              </Link>
            </CardContent>
            <Typography align="center">
            Created  on
                  {' '}
                  {dayjs(user.created_on).format('DD MMMM YYYY')}
                  </Typography>
          </Grid>
        </Grid>
        <Dialog
          open={deactivateDialogOpen}
          onClose={handleCloseDeactivateDialog}
          aria-labelledby="deactivate-my-account"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="deactivate-my-account">
            {"Are you sure you want to delete your account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is an irreversible process, you can not login again without
              our permissions after deleting.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeactivateDialog} color="inherit">
              No
            </Button>
            <Button
              onClick={handleDeactivateUser}
              color="primary"
              disabled={isUiLoading}
              autoFocus
            >
              Yes,Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
}

ProfileComponent.propTypes = {
  isUiLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isUiLoading: state.ui.isUiLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateUserDetails, deactivateUser })(
  ProfileComponent
);
