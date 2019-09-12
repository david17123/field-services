import React from 'react'
import ReactDOM from 'react-dom'

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
  <div>Hello world</div>,
  getMountPoint('root'),
)
