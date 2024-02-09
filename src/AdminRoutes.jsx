import Login from 'Login.jsx'
import dashboard_icon from 'img/dashboard_menu_icon.png'
import billing from 'img/billing.png'
import red_logout from 'img/redlogout.png'
import Transaction from 'views/Transaction/Transaction'
import CreateTransaction from 'views/Transaction/CreateTransaction'

var AdminRoutes = [  
  {
    path: '/transaction',
    name: 'Transaction',
    icon: billing,
    component: Transaction,
    layout: '/admin',
    sub_menu: []
  },  
  {
    path: '/create-transaction',
    name: 'Create Transaction',
    icon: dashboard_icon,
    component: CreateTransaction,
    layout: '/admin',
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
export default AdminRoutes
