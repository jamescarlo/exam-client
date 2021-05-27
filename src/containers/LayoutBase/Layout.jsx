import {
  CaretDownOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, message, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Dashboard from './DashboardBase/Dashboard'
import { StyledLayoutWrapper } from './styles'
const { Header, Sider, Content } = Layout
const key = 'updateable'

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [userDetails, setUserDetails] = useState({})

  // we parse session storage on component mount and store it to state
  useEffect(() => {
    if (typeof sessionStorage.getItem('auth') !== 'undefined' && sessionStorage.getItem('auth')) {
      const parsedAuth = JSON.parse(sessionStorage.getItem('auth'))
      setUserDetails(parsedAuth)
    }
  }, [sessionStorage.getItem('auth')])

  const logOutHandler = () => {
    message.loading({ content: 'Logging out current session...', key, duration: 2.5 })
    setTimeout(() => {
      window.location = '/'
      sessionStorage.clear()
    }, 2500)
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <PieChartOutlined />,
      to: `/admin-zone/${userDetails.id}/dashboard`,
    },
  ]

  return (
    <StyledLayoutWrapper>
      <Sider width={300} className='sider-wrapper' trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>{collapsed ? <h1>A</h1> : <h1>A TEAM</h1>}</div>
        <Menu theme='dark' mode='inline' defaultActiveFirst>
          {/* maps menu items array */}
          {menuItems.map((items, index) => (
            <Menu.Item key={index} icon={items.icon}>
              <Link to={items.to}>{items.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <div className='header-trigger-wrapper'>
            <Button
              onClick={() => setCollapsed(!collapsed)}
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuOutlined />}
            />
            <h3>Admin Panel</h3>
          </div>
          <div className='top-actions'>
            <div className='profile-action'>
              <Popover
                placement='bottomRight'
                content={
                  <Button onClick={() => logOutHandler()} type='text'>
                    Logout
                  </Button>
                }
                trigger='click'
              >
                {/* checks if userDetails is not empty */}
                <span>
                  Hi, {userDetails ? userDetails.user_name : ''}
                  <CaretDownOutlined />
                </span>
              </Popover>
            </div>
          </div>
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path='/admin-zone/:id/dashboard'>
              <Dashboard />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </StyledLayoutWrapper>
  )
}

export default MainLayout
