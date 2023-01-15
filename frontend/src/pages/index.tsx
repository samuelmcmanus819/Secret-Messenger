import type { NextPage } from 'next'

import SecondaryColumn from 'components/layout/index/secondary-column'
import PrimaryColumn from 'components/layout/index/primary-column'
import { ChattingUserProvider } from 'contexts/chatting-user-context'

const Home: NextPage = () => {
  return (
    <div className='flex flex-row'>
      <ChattingUserProvider>
        <SecondaryColumn />
        <PrimaryColumn />
      </ChattingUserProvider>
    </div>
  )
}

export default Home
