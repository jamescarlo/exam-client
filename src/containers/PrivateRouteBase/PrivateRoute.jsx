import React, { useEffect, Suspense } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Loader from '../../components/Loader'

const LayoutBase = React.lazy(() => import('../LayoutBase/Layout'))

const PrivateRoute = () => {
  const history = useHistory()
  useEffect(() => {
    if (!sessionStorage.getItem('auth')) {
      history.push('/unauthorized')
    }
  }, [sessionStorage.getItem('auth')])

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Switch>
          <Route path='/admin-zone/:id' component={LayoutBase} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )
}

export default PrivateRoute