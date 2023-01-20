import HamburgerMenu from "components/layout/header/hamburger-menu";

interface props {
  children: React.ReactNode
}

const Layout = ({ children }: props) => {
  return (
    <div className="flex flex-col h-96 w-[500px] bg-primary-main">
      <header className='bg-primary-light '>
        <HamburgerMenu /> 
      </header>
      <main className="flex flex-row h-[335px]">
        {children}
      </main>
    </div>
  )
}

export default Layout;