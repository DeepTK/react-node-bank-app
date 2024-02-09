import React, { useState, useEffect } from 'react'
import Loader from 'Loader/Loaderimage'
import ModalRes from 'ModalRes'
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
import { Card, CardHeader } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
// import ModalGenreUpdate from './ModalGenreUpdate'
import TransactionTable from './TransactionTable'

const Transaction = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')
  const [allTransactionData, setAllTransactionData] = useState([])

  const modal_close = () => {
    setModal(!modal)
    if (header.toUpperCase() === 'SUCCESS') {
      window.location.reload()
    }
  }
  const getAllTransaction = () => {
    setLoader('block')
    fetch(
      constants.url +
        `transaction/all_transaction${
          decrypt(localStorage.getItem('role')) == 'customer'
            ? '?id=' + decrypt(localStorage.getItem('id'))
            : ''
        }`,
      {
        method: 'get',
        headers: {
          x_access_token: localStorage.getItem('token')
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          if (result.success === true) {
            setLoader('none')
            setAllTransactionData(result.data)
          } else {
            setAllTransactionData([])
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          setAllTransactionData([])
          console.log(error)
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const [userBal, setUserBal] = useState('0')
  const getUserBalance = () => {
    setLoader('block')
    fetch(
      constants.url +
        `user/user_balance${
          decrypt(localStorage.getItem('role')) == 'customer'
            ? '?id=' + decrypt(localStorage.getItem('id'))
            : ''
        }`,
      {
        method: 'get',
        headers: {
          x_access_token: localStorage.getItem('token')
        }
      }
    )
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          if (result.success === true) {
            setLoader('none')
            setUserBal(result.data[0].balance)
          } else {
            setLoader('none')
            setUserBal(0)
          }
        },
        error => {
          setLoader('none')
          setUserBal(0)
          console.log(error)
        }
      )
  }

  useEffect(() => {
    getAllTransaction()
    if (decrypt(localStorage.getItem('role')) == 'customer') {
      getUserBalance()
    }
  }, [])

  return (
    <div className='content'>
      <Loader show={loader} />
      <ModalRes
        header={header}
        open_v={modal}
        clicker={modal_close}
        alert_msg={alertmessage}
        img={alert_img}
      />
      <Card className='bg-transparent' style={{ boxShadow: 'none' }}>
        {decrypt(localStorage.getItem('role')) == 'customer' && (
          <CardHeader>
            <h4 className='m-0'>
              <b>Balance :- {userBal}</b>
            </h4>
          </CardHeader>
        )}
        <CardBody>
          <TransactionTable data={allTransactionData} />
        </CardBody>
      </Card>
    </div>
  )
}

export default Transaction
