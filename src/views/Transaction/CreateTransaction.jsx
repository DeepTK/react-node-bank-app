import React, { useState } from 'react'
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label
} from 'reactstrap'
import { Button, FormGroup, Form, Input } from 'reactstrap'
import Loader from 'Loader/Loaderimage'
import ModalRes from 'ModalRes'
import error_img from 'img/error.png'
import success_img from 'img/success.png'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'
import { Link } from 'react-router-dom'
import ModalAuthPassword from 'ModalAuthPassword'
import encrypt from 'utils/Functions/encrypt'

const CreateTransaction = () => {
  const [header, setHeader] = useState('')
  const [modal, setModal] = useState(false)
  const [alertmessage, setAlertmessage] = useState('')
  const [alert_img, setAlert_img] = useState(null)
  const [loader, setLoader] = useState('none')

  const [amount, setAmount] = useState('0')
  const [transactionType, setTransactionType] = useState('DEPOSIT')

  const modal_close = () => {
    setModal(!modal)
    if (header.toUpperCase() == 'SUCCESS') {
      window.location.reload()
    }
  }

  const postData = () => {
    setLoader('block')
    const data = {
      id: decrypt(localStorage.getItem('id')),
      amount: amount,
      transaction_type: transactionType,
      inserted_by: decrypt(localStorage.getItem('username'))
    }

    fetch(constants.url + 'transaction/create_transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        x_access_token: localStorage.getItem('token')
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(
        result => {
          // // console.log(result);
          if (result.success == true) {
            setHeader('Success')
            setAlert_img(success_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          } else {
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage(result.msg)
          }
        },
        error => {
          // console.log(error);
          setHeader('Error')
          setAlert_img(error_img)
          setLoader('none')
          setModal(true)
          setAlertmessage('Something went wrong')
        }
      )
  }

  const [userPassAuthModal, setUserPassAuthModal] = useState(false)
  const [userPassAuthValue, setUserPassAuthValue] = useState('')
  const userPassAuthValueHandler = val => {
    setUserPassAuthValue(val)
  }

  const userPassAuthModalClose = () => {
    setUserPassAuthModal(false)
  }

  const userPassAuthModalOpen = () => {
    setUserPassAuthModal(true)
  }

  console.log(decrypt(localStorage.getItem('id')))
  console.log(encrypt('1'))

  const authenticatePassword = () => {
    setLoader('block')
    if (userPassAuthValue && userPassAuthValue !== '') {
      const data = {
        id: decrypt(localStorage.getItem('id')),
        password: userPassAuthValue
      }

      fetch(constants.url + 'user/password_authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          x_access_token: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(
          result => {
            // // console.log(result);
            if (result.success == true) {
              setLoader('none')
              userPassAuthModalClose()
              postData()
            } else {
              setHeader('Error')
              setAlert_img(error_img)
              setLoader('none')
              setModal(true)
              setAlertmessage(result.msg)
            }
          },
          error => {
            // console.log(error);
            setHeader('Error')
            setAlert_img(error_img)
            setLoader('none')
            setModal(true)
            setAlertmessage('Something went wrong')
          }
        )
    } else {
      setHeader('Error')
      setAlert_img(error_img)
      setLoader('none')
      setModal(true)
      setAlertmessage('Please Enter Valid Password')
    }
  }

  return (
    <>
      <Loader show={loader} />
      <ModalAuthPassword
        open_v={userPassAuthModal}
        clicker={userPassAuthModalClose}
        userPassAuthValue={userPassAuthValue}
        userPassAuthValueHandler={userPassAuthValueHandler}
        authenticatePassword={authenticatePassword}
      />
      <div className='content'>
        <ModalRes
          header={header}
          open_v={modal}
          clicker={modal_close}
          alert_msg={alertmessage}
          img={alert_img}
        />
        <div className='row'>
          <div className='col-md-12'>
            <Card>
              <CardHeader className='d-flex align-items-center justify-content-between'>
                <CardTitle tag='h5' style={{ color: '#007bff' }}>
                  Create Transaction
                </CardTitle>
                <div className=''>
                  <Link className='btn btn-primary' to={ decrypt(localStorage.getItem("role")) == "customer" ? '/subuser/transaction' : '/admin/transaction' }>
                    All Transaction
                  </Link>
                </div>
                {/* <hr /> */}
              </CardHeader>
              <CardBody style={{}}>
                <Form>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <label>Transaction Amount*</label>
                        <Input
                          type='text'
                          name='amount'
                          id='amount'
                          placeholder='amount'
                          autoComplete='off'
                          defaultValue={amount}
                          required
                          onChange={e => setAmount(e.target.value)}
                        ></Input>
                      </FormGroup>
                    </Col>
                    <Col md='6' className=''>
                      <FormGroup>
                        <label>Transaction Type*</label>
                        <Row>
                          <Col>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type='radio'
                                  name='transaction_type'
                                  value='DEPOSIT'
                                  required
                                  defaultChecked={transactionType == 'DEPOSIT'}
                                  onChange={e =>
                                    setTransactionType(e.target.value)
                                  }
                                />
                                DEPOSIT
                              </Label>
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  type='radio'
                                  name='transaction_type'
                                  value='WITHDRAW'
                                  required
                                  defaultChecked={transactionType == 'WITHDRAW'}
                                  onChange={e =>
                                    setTransactionType(e.target.value)
                                  }
                                />
                                WITHDRAW
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button
                    color='primary'
                    type='button'
                    onClick={userPassAuthModalOpen}
                  >
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTransaction
