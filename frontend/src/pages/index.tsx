import type { NextPage } from 'next'

import SecondaryColumn from 'components/layout/index/secondary-column'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col'>
      <SecondaryColumn />
    </div>
  )
}

export default Home
