import React from 'react'
import {
  ConfigContainer,
  LogoContainer,
  MenuContainer,
  MenuDivisor,
  MenuNav,
} from './styles'
import { IoFlash, IoImages, IoLibrary } from 'react-icons/io5'
import { FaHeart, FaShoppingBasket, FaUserCircle } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiGamepadFill, RiSearch2Fill } from 'react-icons/ri'
import { useRouter } from 'next/router'

const AsideMenu: React.FC = () => {

  const router = useRouter()

  return (
    <MenuContainer>
      <LogoContainer>
        <FaUserCircle size={'1.6rem'} />
      </LogoContainer>
      <MenuDivisor />
      <MenuNav>
        <ul>
          <li className={'active'} >
            {router.route === "/game/[slug]" && <RiGamepadFill size={'1.8rem'} />}
            {router.route === "/search" && <RiSearch2Fill size={'1.8rem'} />}
          </li>
          <li className={router.route === "/home" ? 'active' : null} onClick={()=>router.push('/home')} >
            <HiHome size={'1.8rem'} />
          </li>
          <li className={router.route === "/hot" ? 'active' : null} onClick={()=>router.push('/hot')}>
            <IoFlash size={'1.6rem'} />
          </li>
          <li className={router.route === "/favorites" ? 'active' : null} onClick={()=>router.push('/favorites')}>
            <FaHeart size={'1.6rem'} />
          </li>
          <li className={router.route === "/library" ? 'active' : null} onClick={()=>router.push('/library')}>
            <IoLibrary size={'1.6rem'} />
          </li>
          <li className={router.route === "/store" ? 'active' : null} onClick={()=>router.push('/store')}>
            <FaShoppingBasket size={'1.6rem'} />
          </li>
          <li />
        </ul>
      </MenuNav>
      <MenuDivisor />
      <ConfigContainer>
        <FiMoreHorizontal color={'#fff'} size={'1.6rem'} />
      </ConfigContainer>
    </MenuContainer>
  )
}

export default AsideMenu
