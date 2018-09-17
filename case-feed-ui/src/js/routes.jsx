import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Case from 'views/case';
import Dashboard from 'views/dashboard';

// NOTE: order matters for these routes. If you have a more generic route above a specific one,
// the generic route will intercept specific route requests. (e.g. /pricing has to come before /).
module.exports = (
  <div className="container">
    <Switch>
      <Route path="/case" component={Case} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </div>
);
