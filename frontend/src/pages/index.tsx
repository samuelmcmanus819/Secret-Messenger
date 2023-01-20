import type { NextPage } from 'next'

import SecondaryColumn from 'components/layout/secondary-column'
import PrimaryColumn from 'components/layout/primary-column'

const Home: NextPage = () => {
  return (
    <div className='flex flex-row'>
      <SecondaryColumn />
      <PrimaryColumn />
    </div>
  )
}

export default Home
