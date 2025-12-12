import React from 'react'
import ComponentIndex from '../../../components/ComponentIndex'

const Layout = ({children}) => {
  return (
    <>
        <ComponentIndex.Header/>
        {children}
    </>
  )
}

export default Layout