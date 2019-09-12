import { ApolloProvider } from '@apollo/react-hooks'
import React from 'react'
import ReactDOM from 'react-dom'

import { client as graphqlClient } from './apollo'

const getMountPoint = (id: string = 'root'): HTMLElement => {
  let rootEl = document.getElementById(id)
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = id
    document.getElementsByTagName('body')[0].appendChild(rootEl)
  }
  return rootEl
}

ReactDOM.render(
  (
    <ApolloProvider client={graphqlClient}>
      <div>Hello world</div>
    </ApolloProvider>
  ),
  getMountPoint('root'),
)
