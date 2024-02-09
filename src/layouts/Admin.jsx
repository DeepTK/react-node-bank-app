import React, { useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import DemoNavbarAdmin from 'components/Navbars/DemoNavbarAdmin.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'
import AdminRoutes from 'AdminRoutes'
import Login from 'Login'
import auto_log_out from 'global/auto_log_out'

const Admin = props => {
  const mainPanelRef = useRef(null)

  useEffect(() => {
    setInterval(() => {
      auto_log_out('banker')
    }, 2000)

    if (
      window.location.pathname === '/admin' ||
      window.location.pathname === '/admin/'
    ) {
      props.history.push({ pathname: '/admin/transaction' })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      mainPanelRef.current.scrollTop = 0
      document.scrollingElement.scrollTop = 0
    }
    if (props.history.action === 'PUSH') {
      handleScroll()
    }
    return () => {
      // cleanup
    }
  }, [props.history.action])

  return (
    <div className='wrapper'>
      <Sidebar
        {...props}
        routes={AdminRoutes}
        bgColor={'black'}
        activeColor={'info'}
      />

      <div className='main-panel' ref={mainPanelRef}>
        <DemoNavbarAdmin {...props} routes={AdminRoutes} />
        <Switch>
          {AdminRoutes.map((prop, key) => (
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

export default Admin
