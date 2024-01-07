import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'

const root  = document.querySelector('#root')

if(root){
    ReactDom.createRoot(root).render(<App/>)
}