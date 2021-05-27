import React, { useEffect, useState } from 'react'
import { StyleDashboardWrapper } from './styles'
import axios from 'axios'
import { API_URL } from '../../../utils/constants'
import { Row, Col, Select } from 'antd'
import { Bar } from 'react-chartjs-2'
import _ from 'lodash'

const { Option } = Select

const Dashboard = () => {
  const [authToken, setAuthToken] = useState('')
  const [filters, setFilters] = useState([])
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])
  const [propertyId, setPropertyId] = useState('')

  // initial request to get all items and make filter from it.
  useEffect(() => {
    if (typeof sessionStorage.getItem('auth') !== 'undefined' && sessionStorage.getItem('auth')) {
      const parsedAuth = JSON.parse(sessionStorage.getItem('auth'))
      // store to state for the next request
      setAuthToken(parsedAuth.token)
      axios
        .get(`${API_URL}/properties/`, {
          headers: {
            Authorization: `Bearer ${parsedAuth.token}`,
          },
        })
        .then((response) => {
          const { properties } = response.data
          setFilters(properties)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [sessionStorage.getItem('auth')])

  // second request with dependencies
  useEffect(() => {
    if (propertyId && propertyId !== '') {
      axios
        .get(`${API_URL}/properties/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const { property } = response.data
          const propertyExepenses = []
          const propertyIncome = []
          Object.keys(property.expense).map((keys) => {
            propertyExepenses.push(property.expense[keys])
          })
          Object.keys(property.income).map((keys) => {
            propertyIncome.push(property.income[keys])
          })
          // set expense and income
          setExpense(propertyExepenses)
          setIncome(propertyIncome)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [propertyId])

  const dataSets = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Expense',
        data: expense,
        backgroundColor: '#FDA245',
      },
      {
        label: 'Income',
        data: income,
        backgroundColor: '#1BAF77',
      },
    ],
  }
  const options = {
    scales: {
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            // not working...
            callback: function (value) {
              return '$' + value
            },
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }
  return (
    <StyleDashboardWrapper>
      <span>Select Property Name</span>
      <Row>
        <Col span={6}>
          <Select
            onChange={(value) => setPropertyId(value)}
            style={{ width: '100%', margin: '15px 0' }}
          >
            {!_.isEmpty(filters) &&
              filters.map((items, index) => (
                <Option key={index} value={items.propertyId}>
                  {items.propertyName}
                </Option>
              ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Bar data={dataSets} options={options} />
        </Col>
      </Row>
    </StyleDashboardWrapper>
  )
}

export default Dashboard
