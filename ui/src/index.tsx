import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import { PMain } from './pages/PMain'
import { PExplore } from './pages/PExplore'

import 'semantic-ui-css/semantic.min.css'
import './css/App.css'
import './css/Block.css'
import './css/fonts.css'
import './css/Link.css'
import './css/Spinner.css'

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route exact path="/">
                  <PMain/>
              </Route>
              <Route exact path="/explore">
                  <PExplore/>
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
