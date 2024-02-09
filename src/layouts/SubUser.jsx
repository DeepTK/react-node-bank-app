import React, { useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import DemoNavbarSubUser from 'components/Navbars/DemoNavbarSubUser'
import Sidebar from 'components/Sidebar/Sidebar.jsx'
import SubUserRoutes from 'SubUserRoutes'
import Login from 'Login'
import auto_log_out from 'global/auto_log_out'

const SubUser = props => {
  const mainPanel = useRef(null)

  useEffect(() => {
    var interval = setInterval(() => {
      auto_log_out('customer')
    }, 2000)

    if (
      window.location.pathname === '/subuser' ||
      window.location.pathname === '/subuser/'
    ) {
      props.history.push({
        pathname: '/subuser/dashboard'
      })
    }

    return () => clearInterval(interval)
  }, [props.history])

  return (
    <div className='wrapper'>
      <Sidebar
        {...props}
        routes={SubUserRoutes}
        bgColor={'black'}
        activeColor={'info'}
      />

      <div className='main-panel' ref={mainPanel}>
        <DemoNavbarSubUser {...props} routes={SubUserRoutes} />
        <Switch>
          {SubUserRoutes.map((prop, key) => (
            <Route
              {...props}
              path={prop.layout + prop.path}
              component={prop.component}
              key={prop.layout + prop.path}
            />
          ))}
          <Route path='*' component={Login} />
        </Switch>        
      </div>
    </div>
  )
}

export default SubUser
