import React from 'react'
import { StyledFixedPageWrapper } from './Globalstyles'
import { Link } from 'react-router-dom'

const Unathorized = () => {
  return (
    <StyledFixedPageWrapper>
      <h2>401 Unathorized please login</h2>
      <Link to='/'>Sign in</Link>
    </StyledFixedPageWrapper>
  )
}

export default Unathorized
