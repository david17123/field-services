import React from 'react'

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { ISession } from '../graphql/useGetActiveSessions'
import useGetHistoryBySession from '../graphql/useGetHistoryBySession'
import Table, { IColSpec } from './Table'

interface ILocationHistoryGridItemProps {
  session: ISession
}

export default function LocationHistoryGridItem(props: ILocationHistoryGridItemProps) {
  const { history, loading } = useGetHistoryBySession(props.session.sessionId)

  const historyColumnSpec: Array<IColSpec | string> = [
    {
      getFormattedValue: (session) => session.timestamp.toLocaleDateString(undefined, {dateStyle: 'medium', timeStyle: 'medium'}),
      header: 'Timestamp',
    },
    {
      getFormattedValue: (session) => `(${session.device.location.coordinates[1]}, ${session.device.location.coordinates[0]})`,
      header: 'Location (lat, long)',
    },
  ]

  const historyRowKey = (row: any) => row.timestamp.toISOString()

  return (
    <Grid item xs={12}>
      <Card>
        <Box p={2}>
          <Typography variant="h6">
            Location history for&nbsp;
            {`${props.session.driver.firstName} ${props.session.driver.lastName}`}
            &nbsp;on&nbsp;
            {`${props.session.vehicle.regNumber} (${props.session.vehicle.vehicleType})`}
          </Typography>
        </Box>
        <Table
          columns={historyColumnSpec}
          data={history}
          rowKey={historyRowKey}
        />
      </Card>
    </Grid>
  )
}
