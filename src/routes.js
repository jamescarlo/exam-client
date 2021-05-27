import React, { Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoadingScreen from './components/Loader'
import PrivateRoute from './containers/PrivateRouteBase/PrivateRoute'

const UnAuthorizedPageBase = React.lazy(() => import('./components/401'))
const AuthBase =  React.lazy(() => import('./containers/AuthBase/Auth'))
// const CreateAccountBase = React.lazy(() => import('./containers/CreateAccountBase/CreateAccount'))
// const UnauthorizedPageBase = React.lazy(() => import('./containers/ErrorsPageBase/401'))

export default () => (
  <Suspense fallback={<LoadingScreen />}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={AuthBase} /> 
        <Route exact path='/unauthorized' component={UnAuthorizedPageBase} />
        <PrivateRoute />
      </Switch>
    </BrowserRouter>
  </Suspense>
)
