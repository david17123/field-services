import clsx from 'clsx'
import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  tcell: {
    '&:first-child': {
      paddingLeft: theme.spacing(2),
    },
    '&:last-child': {
      paddingRight: theme.spacing(2),
    },
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  thead: {
    '& > tr': {
      '&:hover': {
        backgroundColor: 'inherit',
      },
      cursor: 'default',
    },
    textAlign: 'left',
  },
  trBody: (props: ITableProps) => ({
    '&:hover': {
      backgroundColor: props.onRowClick ? theme.palette.grey[50] : 'inherit',
    },
    '&:last-child': {
      borderBottom: 'none',
    },
    borderBottom: 'solid 1px',
    borderBottomColor: theme.palette.divider,
    cursor: props.onRowClick ? 'pointer' : 'default',
  }),
  trHead: {
    borderBottom: 'solid 1px',
    borderBottomColor: theme.palette.divider,
  },
}))

const getColumnHeader = (colSpec: IColSpec | string): string => {
  if (typeof colSpec === 'object' && colSpec.header) {
    return colSpec.header
  }
  let key = ''
  if (typeof colSpec === 'string') {
    key = colSpec
  } else if (typeof colSpec === 'object' && colSpec.key) {
    key = colSpec.key
  }
  return `${key[0].toUpperCase()}${key.slice(1)}`
}

const getColumnValue = (colSpec: IColSpec | string, row: {[key: string]: any}): string => {
  if (typeof colSpec === 'object' && colSpec.getFormattedValue) {
    return colSpec.getFormattedValue(row)
  }
  let key = ''
  if (typeof colSpec === 'string') {
    key = colSpec
  } else if (typeof colSpec === 'object' && colSpec.key) {
    key = colSpec.key
  }
  return row[key]
}

export interface IColSpec {
  header?: string
  getFormattedValue?: (row: {[key: string]: any}) => string
  /** When header or getFormattedValue is present, they would take precedence */
  key?: string
  className?: string
}

interface ITableProps {
  onRowClick?: (row: {[key: string]: any}) => void
  data: Array<{[key: string]: any}>
  columns: Array<IColSpec | string>
  rowKey: ((row: {[key: string]: any}) => string) | string
}

export default function Table(props: ITableProps) {
  const classes = useStyles(props)

  const getRowKey = (row: {[key: string]: any}): string => {
    if (typeof props.rowKey === 'string') {
      return row[props.rowKey]
    }
    return props.rowKey(row)
  }

  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.trHead}>
          {props.columns.map((colSpec) => (
            <th
              className={clsx(classes.tcell, typeof colSpec === 'object' && colSpec.className)}
              key={getColumnHeader(colSpec)}
            >
              {getColumnHeader(colSpec)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((rowData) => (
          <tr className={classes.trBody} key={getRowKey(rowData)}>
            {props.columns.map((colSpec) => (
              <td
                className={clsx(classes.tcell, typeof colSpec === 'object' && colSpec.className)}
                key={getColumnHeader(colSpec)}
              >
                {getColumnValue(colSpec, rowData)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
