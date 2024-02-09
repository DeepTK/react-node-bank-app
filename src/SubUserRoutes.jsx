import Login from 'Login.jsx'
import billing from 'img/billing.png'
import dashboard_icon from 'img/dashboard_menu_icon.png'
import red_logout from 'img/redlogout.png'
import CreateTransaction from 'views/Transaction/CreateTransaction'
import Transaction from 'views/Transaction/Transaction'

var SubUserRoutes = [
  {
    path: '/transaction',
    name: 'Transaction',
    icon: billing,
    component: Transaction,
    layout: '/subuser',
    sub_menu: []
  },  
  {
    path: '/create-transaction',
    name: 'Create Transaction',
    icon: dashboard_icon,
    component: CreateTransaction,
    layout: '/subuser',
    sub_menu: []
  },      
  {
    // path: "/",
    name: 'Logout',
    icon: red_logout,
    component: Login,
    layout: '/sign-in',
    sub_menu: []
  }
]
export default SubUserRoutes
