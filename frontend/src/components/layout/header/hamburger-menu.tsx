import { useState } from "react";
import { Divide as Hamburger } from 'hamburger-react'


const HamburgerMenu = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  }


  return (
    <nav className="flex w-36">
      <div className="flex w-full z-10">
        <Hamburger toggled={navbarOpen} toggle={toggleNavbar} size={17} color='#b4acac'/>
      </div>
      <ul className={`list-none fixed top-0 bottom-0 left-0 bg-primary-ultralight h-96 overflow-hidden max-w-36 w-0 z-9  
      ${navbarOpen ? "!w-36" : ""}`}>
      </ul>
    </nav>
  )
}

export default HamburgerMenu;