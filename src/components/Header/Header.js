import React from 'react'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

const Header = ({ navbarOpened, toggleNavbar }) => {
  return (
    <>
      <HeaderDesktop />
      <HeaderMobile navbarOpened={navbarOpened} toggleNavbar={toggleNavbar} />
    </>
  )
}

export default Header
