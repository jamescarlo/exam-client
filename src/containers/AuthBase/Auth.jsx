import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { StyledAuthWrapper } from './styles'
import { StyledFixedPageWrapper } from '../../components/Globalstyles'
import { API_URL } from '../../utils/constants'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const key = 'updateable'

const Auth = () => {
  const history = useHistory()
  // form item layout
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  }
  const handleLoginUser = (values) => {
    message.loading({
      content: 'Authenticating user...',
      key,
      duration: 2.5,
    })
    /**
     * directly named to form_item what is the key on API
     * e.g: user_name = values.user_name
     */
    axios
      .post(`${API_URL}/users/login`, values)
      .then((response) => {
        /**
         * code dependent on API return
         * code 2000 is creds is correct
         * code 4009 user does not exists
         * code 4001 password incorrect
         */
        if (response.data.code === 4009 || response.data.code === 4001) {
          const { data } = response
          message.error({
            content: data.message,
            key,
          })
        } else {
          const { token } = response.data
          const { _id, user_name } = response.data.data.user
          const user = {
            id: _id,
            user_name: user_name,
            token: token
          }
          const currentSessionInfo = JSON.stringify(user)
          sessionStorage.setItem('auth', currentSessionInfo)
          message.success({
            content: `Hi ${user.user_name}`,
            key,
          })
          setTimeout(() => {
            history.push(`/admin-zone/${user._id}/dashboard`)
          }, 1500)
        }
      })
      .catch((error) => {
        message.error({
          content: error || 'Oops, something went wrong',
          key,
          duration: 2.5
        })
      })
  }
  return (
    <StyledFixedPageWrapper>
      <StyledAuthWrapper
        {...layout}
        requiredMark={false}
        layout='vertical'
        onFinish={handleLoginUser}
      >
        <Form.Item
          label='Username'
          name='user_name'
          rules={[{ required: true, message: 'Username is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ marginTop: 10 }}>
          <Button size='large' htmlType='submit' block type='primary'>
            LOGIN
          </Button>
        </Form.Item>
      </StyledAuthWrapper>
    </StyledFixedPageWrapper>
  )
}

export default Auth
