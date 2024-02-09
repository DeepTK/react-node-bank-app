import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap'
import AdminRoutes from 'AdminRoutes'
import profile from 'img/transperson.png'
import decrypt from '../../utils/Functions/decrypt'

const Header = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [color, setColor] = useState('transparent')
  const sidebarToggle = useRef(null)
  const { location } = history

  useEffect(() => {
    window.addEventListener('resize', updateColor)
    return () => {
      window.removeEventListener('resize', updateColor)
    }
  }, [])

  const logoutClick = () => {
    setIsOpen(false)
    setColor('transparent')
    window.location.replace('/sign-in')
  }

  const toggle = () => {
    if (isOpen) {
      setColor('transparent')
    } else {
      setColor('dark')
    }
    setIsOpen(!isOpen)
  }

  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const getBrand = () => {
    var brandName = 'Dashboard'
    AdminRoutes.forEach(prop => {
      prop.sub_menu.forEach(subProp => {
        if (history.location.pathname.includes(subProp.layout + subProp.path)) {
          brandName = subProp.name
        }
      })
      if (history.location.pathname.includes(prop.layout + prop.path)) {
        brandName = prop.name
      }
    })
    return brandName
  }

  const openSidebar = () => {
    document.documentElement.classList.toggle('nav-open')
    sidebarToggle.current.classList.toggle('toggled')
  }

  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor('dark')
    } else {
      setColor('transparent')
    }
  }

  const getName = () => {
    try {
      var name = decrypt(localStorage.getItem('username'))
      if (name.length > 22) {
        name = name.substring(0, 22) + '...'
      }
      return name
    } catch (Exception) {}
  }

  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      location.state &&
      location.state.isOpen &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
      sidebarToggle.current.classList.toggle('toggled')
    }
  }, [location.state, location.pathname])

  return (
    <div>
      <Navbar
        color={location.pathname.includes('full-screen-maps') ? 'dark' : color}
        expand='lg'
        className={
          location.pathname.includes('full-screen-maps')
            ? 'navbar-absolute fixed-top'
            : 'navbar-absolute fixed-top ' +
              (color === 'transparent' ? 'navbar-transparent ' : '')
        }
      >
        <Container fluid>
          <div className='navbar-wrapper'>
            <div className='navbar-toggle'>
              <button
                type='button'
                ref={sidebarToggle}
                className='navbar-toggler'
                onClick={openSidebar}
              >
                <span className='navbar-toggler-bar bar1' />
                <span className='navbar-toggler-bar bar2' />
                <span className='navbar-toggler-bar bar3' />
              </button>
            </div>
            <NavbarBrand>{getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={toggle}>
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar className='justify-content-end'>
            <Nav navbar>
              <NavItem>
                <Link to='#' className='nav-link btn-magnify'>
                  <img
                    alt='...'
                    className='img-fluid'
                    style={{ height: '30px', paddingBottom: '5px' }}
                    src={profile}
                  />
                  <p className=''> {getName()}</p>
                </Link>
              </NavItem>
              <Dropdown nav isOpen={dropdownOpen} toggle={dropdownToggle}>
                <DropdownToggle caret nav>
                  <i className='nc-icon nc-bell-55' />
                  <p>
                    <span className='d-lg-none d-md-block'>Help</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    tag='a'
                    style={{ cursor: 'pointer' }}
                    onClick={logoutClick}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
