import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'

import SessionFilterInput, { IFilterValue } from './SessionFilterInput'

describe('SessionFilterInput test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should show an editable textbox', async () => {
    const Wrapper = () => {
      const [value, setValue] = React.useState<IFilterValue>({
        filterCategory: 'driver',
        filterText: 'test',
      })
      const handleChange = (val: any) => setValue(val)

      return <SessionFilterInput onChange={handleChange} value={value} />
    }
    const { getByDisplayValue } = render(<Wrapper />)

    const inputBox = getByDisplayValue('test')
    fireEvent.input(inputBox, { target: { value: 'foo bar' } })
    expect(inputBox).toHaveValue('foo bar')
  })
})
