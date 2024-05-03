import React, {useRef, useState} from 'react'
import menu from './HamburgerMenu.module.css'
import menuItems from './MenuItem.module.css'
import {Link} from "react-router-dom";
export const HamburgerMenu = () => {
    const menuRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };
  return (
    <div className={`${menu.menuWrapper}`} ref={menuRef} tabIndex={0} onBlur={closeMenu}>
    <div className={`${menu.hamburgerMenu} ${isOpen ? `${menu.open}` : ''}`} onClick={toggleMenu}>
        <div className={`${menu.bar} ${menu.top}`}></div>
        <div className={`${menu.bar} ${menu.middle}`}></div>
        <div className={`${menu.bar} ${menu.bottom}`}></div>
    </div>
    {isOpen && (
        <ul className={`${menuItems.menuItems} ${isOpen ? `${menuItems.open}` : ''}`} key={isOpen}>
            <li><Link to='/shop'>shop</Link></li>
            <li><Link to='/cart'>cart</Link></li>
        </ul>
    )}
</div>
  )
}
