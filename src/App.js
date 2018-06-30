import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { ToastContainer } from 'react-toastify';
import Converter from './components/Containers/Converter';


export class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <Converter />
        </div>
        <ToastContainer />
      </React.Fragment>

    )
  }
}

