import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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

/* tslint:disable */
const mockData = [
  {
    sessionId: '123',
    device: {
      os: 'ios',
      osVersion: '10.0.0',
      location: {
        type: 'Point',
        coordinates: [10, 20.1],
      },
    },
    driver: {
      id: 'abcd',
      firstName: 'John',
      lastName: 'Doe',
    },
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
    timestamp: new Date(),
  },
  {
    sessionId: '456',
    device: {
      os: 'android',
      osVersion: '8.4.0',
      location: {
        type: 'Point',
        coordinates: [12, 29.4],
      },
    },
    driver: {
      id: 'efgh',
      firstName: 'Beth',
      lastName: 'Simon',
    },
    vehicle: {
      regNumber: 'def456',
      vehicleType: 'truck',
    },
    timestamp: new Date(),
  },
  {
    sessionId: '789',
    device: {
      os: 'ios',
      osVersion: '11.3.0',
      location: {
        type: 'Point',
        coordinates: [8, 40.3],
      },
    },
    driver: {
      id: 'ijkl',
      firstName: 'Rose',
      lastName: 'McCarthy',
    },
    vehicle: {
      regNumber: 'ghi789',
      vehicleType: 'ute',
    },
    timestamp: new Date(),
  },
]
/* tslint:enable */

const applyFilterToActiveSession = (filterValue: IFilterValue, data: any[]) => {
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
  const [selectedActiveSession, setSelectedActiveSession] = React.useState<any>(null)

  const handleRowClick = (row: any) => {
    if (selectedActiveSession !== null && selectedActiveSession.sessionId === row.sessionId) {
      setSelectedActiveSession(null)
    } else {
      setSelectedActiveSession(row)
    }
  }

  const columnsSpec: Array<IColSpec | string> = [
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
          <Grid item xs={12} lg={6}>
            <Card>
              <SessionFilterInput
                value={filterValue}
                onChange={handleFilterChange}
              />
              <Table
                columns={columnsSpec}
                data={applyFilterToActiveSession(filterValue, mockData)}
                rowKey="sessionId"
                maxHeight={1200}
                onRowClick={handleRowClick}
                selectedEntries={selectedActiveSession ? [selectedActiveSession] : []}
              />
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <Typography
                style={{ height: '400px', lineHeight: '400px', backgroundColor: '#eaeaea' }}
                align="center"
              >
                Placeholder for map view
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
