import React from 'react'
import { render } from 'react-dom'
import {App} from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import register from './registerServiceWorker';



render(
    <App />,
    document.getElementById('root')
)
register()
