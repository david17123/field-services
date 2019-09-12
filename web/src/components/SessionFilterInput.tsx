import React from 'react'

import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import NativeSelect from '@material-ui/core/NativeSelect'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) => ({
  searchIcon: {
    marginRight: theme.spacing(1),
  },
  textInput: {
    flex: 1,
    marginRight: theme.spacing(2),
  },
}))

export interface IFilterValue {
  filterText: string
  filterCategory: 'driver' | 'vehicle'
}

interface ISessionFilterInputProps {
  onChange: (newValue: IFilterValue) => void
  value: IFilterValue
}

export default function SessionFilterInput(props: ISessionFilterInputProps) {
  const classes = useStyles(props)

  const handleChange =
    (field: keyof IFilterValue) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      props.onChange({
        ...props.value,
        [field]: event.target.value,
      })
    }

  return (
    <Box display="flex" p={2} alignItems="center">
      <SearchIcon className={classes.searchIcon} color="action" />
      <InputBase
        className={classes.textInput}
        placeholder="Start typing to filter..."
        inputProps={{ 'aria-label': 'start typing to filter' }}
        onChange={handleChange('filterText')}
        value={props.value.filterText}
      />
      <NativeSelect
        value={props.value.filterCategory}
        onChange={handleChange('filterCategory')}
        name="filterBy"
        inputProps={{ 'aria-label': 'filter by' }}
      >
        <option value="driver">By driver</option>
        <option value="vehicle">By vehicle</option>
      </NativeSelect>
    </Box>
  )
}
