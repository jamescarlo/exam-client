import React from 'react'
import { StyledFixedPageWrapper } from './Globalstyles'
import LoadingComponent from 'react-loader-spinner'

const Loader = () => (
  <StyledFixedPageWrapper>
    <LoadingComponent type='Bars' color='var(--primary)' height={100} width={100} />
  </StyledFixedPageWrapper>
)
export default Loader
