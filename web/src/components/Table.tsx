import clsx from 'clsx'
import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: (props: ITableProps) => ({
    maxHeight: props.maxHeight ? props.maxHeight : 'none',
    overflow: props.maxHeight ? 'auto' : 'visible',
  }),
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
  tdNoData: {
    color: theme.palette.text.hint,
    fontStyle: 'italic',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  thead: {
    textAlign: 'left',
  },
  trBody: (props: ITableProps) => ({
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
    cursor: 'default',
  },
  trNotSelected: (props: ITableProps) => ({
    '&:hover': {
      backgroundColor: props.onRowClick ? theme.palette.grey[50] : 'inherit',
    },
  }),
  trSelected: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
    backgroundColor: theme.palette.grey[200],
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
  maxHeight?: number | string
  selectedEntries?: Array<{[key: string]: any}>
}

export default function Table(props: ITableProps) {
  const classes = useStyles(props)

  const getRowKey = (row: {[key: string]: any}): string => {
    if (typeof props.rowKey === 'string') {
      return row[props.rowKey]
    }
    return props.rowKey(row)
  }

  const selectedEntriesHash: {[key: string]: boolean} = {}
  if (props.selectedEntries) {
    for (const entry of props.selectedEntries) {
      selectedEntriesHash[getRowKey(entry)] = true
    }
  }

  const handleRowClick = (row: {[key: string]: any}) => () => {
    if (props.onRowClick) {
      props.onRowClick(row)
    }
  }

  return (
    <div className={classes.container}>
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
            <tr
              className={clsx(
                classes.trBody,
                !selectedEntriesHash[getRowKey(rowData)] && classes.trNotSelected,
                selectedEntriesHash[getRowKey(rowData)] && classes.trSelected,
              )}
              key={getRowKey(rowData)}
              onClick={handleRowClick(rowData)}
            >
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
          {props.data.length === 0 && (
            <tr className={classes.trBody}>
              <td className={classes.tdNoData} colSpan={props.columns.length}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
