import HamburgerMenu from "./header/hamburger-menu";

interface props {
  children: React.ReactNode
}

const Layout = ({ children }: props) => {
  return (
    <div className="h-96 w-[500px] bg-primary-main">
      <header className='bg-primary-light '>
        <HamburgerMenu /> 
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout;