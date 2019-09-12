import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(3),
  },
  toolbarSpacer: {
    ...theme.mixins.toolbar,
  },
}))

export default function Main() {
  const classes = useStyles({})

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            Field services dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarSpacer} />

      <Container className={classes.contentContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <Card>List out active sessions</Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>This is for map view</Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
