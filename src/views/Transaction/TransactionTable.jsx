import moment from 'moment'
import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'

import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import { Link } from 'react-router-dom'
import { Badge, Button } from 'reactstrap'
import decrypt from 'utils/Functions/decrypt'
import constants from 'utils/constants'

const TransactionTable = props => {
  const options = {
    sizePerPageRenderer,
    showTotal: true,
    sizePerPageList: [
      {
        text: '5',
        value: 5
      },
      {
        text: '10',
        value: 10
      },
      {
        text: '25',
        value: 25
      },
      {
        text: '50',
        value: 50
      },
      {
        text: 'All',
        value: props.data.length
      }
    ]
  }
  const columns = [
    {
      dataField: 'id',
      text: '#',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'customer name',
      text: 'Name',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'username',
      text: 'username',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'email',
      text: 'email',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'transaction_type',
      text: 'Transaction Type',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'prev_balance',
      text: 'Previous Balance',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'amount',
      text: 'Transaction amount',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'balance',
      text: 'balance After Transaction',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    },
    {
      dataField: 'inserted_date',
      text: 'Transaction Time',
      formatter: date_formater,
      csvFormatter: (cell, row, rowIndex) =>
        `${moment(cell).format('DD-MM-YYYY HH:mm:ss')}`,
      // sort:'true',
      headerStyle: {
        backgroundColor: '#2c2c2c',
        color: '#ffffff'
      }
    }
  ]
  function date_formater (cell, row) {
    return <span>{moment(cell).format('DD-MM-YYYY HH:mm:ss')}</span>
  }

  return (
    <ToolkitProvider
      keyField='id'
      data={props.data}
      columns={columns}
      exportCSV={{
        fileName: 'Transaction.csv',
        noAutoBOM: true,
        blobType: 'text/csv;charset=utf-8'
      }}
      search
    >
      {props => (
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <MyExportCSV {...props.csvProps} />
            <SearchBar {...props.searchProps} />
          </div>
          <BootstrapTable
            striped
            {...props.baseProps}
            pagination={paginationFactory(options)}
            noDataIndication={'No Record Found'}
          />
          <hr />
        </div>
      )}
    </ToolkitProvider>
  )
}
const { SearchBar } = Search
const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className='btn-group' role='group'>
    {options.map(option => {
      const isSelect = currSizePerPage === `${option.page}`
      return (
        <button
          key={option.text}
          type='button'
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelect ? 'btn-primary' : 'btn-secondary'}`}
        >
          {option.text}
        </button>
      )
    })}
  </div>
)

const MyExportCSV = props => {
  const handleClick = () => {
    props.onExport()
  }
  return (
    <div align='d-flex'>
      <Button className='btn' color='success' onClick={handleClick}>
        Export to CSV
      </Button>
      {decrypt(localStorage.getItem('role')) == 'customer' && (
        <Link
          className='btn btn-primary ml-3'
          to={
            decrypt(localStorage.getItem('role')) == 'customer'
              ? '/subuser/create-transaction'
              : '/admin/create-transaction'
          }
        >
          CREATE TRANSACTION
        </Link>
      )}
    </div>
  )
}

export default TransactionTable
