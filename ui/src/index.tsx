import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import { PMain } from './pages/PMain'

import 'semantic-ui-css/semantic.min.css'
import './css/App.css'
import './css/fonts.css'

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route path="/">
                  <PMain/>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
