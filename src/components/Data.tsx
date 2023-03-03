import TATChart from './TATChart'
import TTFChart from './TTFChart'
import FTDChart from './FTDChart'
import StageStackChart from './StageStackChart'

function Data() {
    return (
      <section id='page-container' className='flex flex-col bg-gray-50 w-screen pt-12 px-24'>
        <div className='h-screen'>
          <h1 className='text-black font-bold mb-4'>Table of Contents</h1>
          <ul className='pl-4 mb-6'>
            <li className='mb-2  inline-block transition ease-in-out delay-50'>
              <a className='w-full hover:bg-zinc-800 text-black hover:text-white h-5 mb-8' href='#a1q1'>Understanding time to fulfill and deliver orders - Area 1: Question 1</a>
            </li>
            <li className='mb-2 inline-block mr-80 transition ease-in-out delay-50'>
              <a className='w-full hover:bg-zinc-800 text-black hover:text-white h-5 mb-8' href='#a1q2'>Understanding end to end delivery times for an order - Area 1: Question 2</a>
            </li>
            <li className='mb-2 inline-block transition ease-in-out delay-50'>
              <a className='w-full hover:bg-zinc-800 text-black hover:text-white h-5 mb-8' href='#a2q2'>Understanding turn around times - Area 2: Question 2</a>
            </li>
          </ul>
        </div>
        <TTFChart />
        <FTDChart />
        <StageStackChart />
        <TATChart />
      </section>
    )
}

export default Data