import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import useGetActiveSessions, { ISession } from '../graphql/useGetActiveSessions'
import LocationHistoryGridItem from './LocationHistoryGridItem'
import SessionFilterInput, { IFilterValue } from './SessionFilterInput'
import Table, { IColSpec } from './Table'

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    paddingTop: theme.spacing(3),
  },
  toolbarSpacer: {
    ...theme.mixins.toolbar,
  },
}))

const applyFilterToActiveSession = (filterValue: IFilterValue, data: ISession[]) => {
  const regex = new RegExp(filterValue.filterText, 'i')
  if (filterValue.filterCategory === 'driver') {
    return data.filter((session) => {
      const fullName = `${session.driver.firstName} ${session.driver.firstName}`
      return regex.test(fullName)
    })
  } else {
    return data.filter((session) => {
      const vehicle = `${session.vehicle.regNumber} ${session.vehicle.vehicleType}`
      return regex.test(vehicle)
    })
  }
}

export default function Main() {
  const classes = useStyles({})
  const [filterValue, setFilterValue] = React.useState<IFilterValue>({
    filterCategory: 'driver',
    filterText: '',
  })
  const [selectedActiveSession, setSelectedActiveSession] = React.useState<ISession | null>(null)
  const { activeSessions, loading } = useGetActiveSessions()

  const handleRowClick = (row: ISession) => {
    if (selectedActiveSession !== null && selectedActiveSession.sessionId === row.sessionId) {
      setSelectedActiveSession(null)
    } else {
      setSelectedActiveSession(row)
    }
  }

  const activeSessionColumnSpec: Array<IColSpec | string> = [
    {
      getFormattedValue: (session) => `${session.driver.firstName} ${session.driver.lastName}`,
      header: 'Driver',
    },
    {
      getFormattedValue: (session) => `${session.vehicle.regNumber} (${session.vehicle.vehicleType})`,
      header: 'Vehicle',
    },
    {
      getFormattedValue: (session) => `(${session.device.location.coordinates[1]}, ${session.device.location.coordinates[0]})`,
      header: 'Location (lat, long)',
    },
  ]

  const handleFilterChange = (value: IFilterValue) => setFilterValue(value)

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
          {/* TODO Both the active sessions list and map view can be factored out to simplify Main */}
          <Grid item xs={12} lg={6}>
            <Card>
              {loading && (
                <Box
                  height={400}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              )}
              {!loading && activeSessions !== null && (
                <React.Fragment>
                  <SessionFilterInput
                    value={filterValue}
                    onChange={handleFilterChange}
                  />
                  <Table
                    columns={activeSessionColumnSpec}
                    data={applyFilterToActiveSession(filterValue, activeSessions)}
                    rowKey="sessionId"
                    maxHeight={1200}
                    onRowClick={handleRowClick}
                    selectedEntries={selectedActiveSession ? [selectedActiveSession] : []}
                  />
                </React.Fragment>
              )}
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              {loading && (
                <Box
                  height={400}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              )}
              {!loading && (
                <Typography
                  style={{ height: '400px', lineHeight: '400px', backgroundColor: '#eaeaea' }}
                  align="center"
                >
                  Placeholder for map view
                </Typography>
              )}
            </Card>
          </Grid>
          {selectedActiveSession && (
            <LocationHistoryGridItem session={selectedActiveSession} />
          )}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
