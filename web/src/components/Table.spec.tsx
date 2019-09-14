import '@testing-library/jest-dom/extend-expect'
import { cleanup, render } from '@testing-library/react'
import React from 'react'

import Table from './Table'

const data = [
  {
    color: 'red',
    firstName: 'John',
    fruit: 'apple',
    lastName: 'Smith',
  },
  {
    color: 'yellow',
    firstName: 'Luke',
    fruit: 'banana',
    lastName: 'Hanover',
  },
  {
    color: 'orange',
    firstName: 'Alta',
    fruit: 'mandarin',
    lastName: 'Greg',
  },
]

const columns = [
  {
    getFormattedValue: (d: any) => `${d.firstName} ${d.lastName}`,
    header: 'Full name',
  },
  'fruit',
  {
    header: 'Fruit color',
    key: 'color',
  },
]

const rowKey = (d: any) => `${d.firstName} ${d.lastName}`

describe('Table test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should display the table headers properly', async () => {
    const { getByText } = render((
      <Table
        data={data}
        columns={columns}
        rowKey={rowKey}
      />
    ))

    expect(getByText('Full name')).toBeVisible()
    expect(getByText('Fruit')).toBeVisible()
    expect(getByText('Fruit color')).toBeVisible()
  })

  it('should display the table contents properly', async () => {
    const { getByText } = render((
      <Table
        data={data}
        columns={columns}
        rowKey={rowKey}
      />
    ))

    expect(getByText('John Smith')).toBeVisible()
    expect(getByText('Luke Hanover')).toBeVisible()
    expect(getByText('Alta Greg')).toBeVisible()

    expect(getByText('red')).toBeVisible()
    expect(getByText('yellow')).toBeVisible()
    expect(getByText('orange')).toBeVisible()

    expect(getByText('apple')).toBeVisible()
    expect(getByText('banana')).toBeVisible()
    expect(getByText('mandarin')).toBeVisible()
  })
})
