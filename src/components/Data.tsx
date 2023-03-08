import TATChart from './TATChart'
import TTFByHourChart from './TTFByHourChart'
import FTDChart from './FTDChart'
import StageStackChart from './StageStackChart'
import TTFByCountryChart from './TTFByCountryChart'
import OrdersTimeChart from './OrdersTimeChart'
import OrdersTimeChartGranular from './OrdersTimeChartGranular'
import FTDByCountryChart from './FTDByCountryChart'
import ContactRateChart from './ContactRateChart'
import TouchesPerTicketChart from './TouchesPerTicket'
import RevenueTimeChart from './RevenueTimeChart'

function Data() {
    return (
      <section id='page-container' className='flex flex-col bg-gray-50 w-screen pt-12 px-12'>
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
              <a className='w-full hover:bg-zinc-800 text-black hover:text-white h-5 mb-8' href='#turn-around-time'>Understanding turn around times - Area 2: Question 2</a>
            </li>
            <br></br>
            <li className='mb-2 inline-block transition ease-in-out delay-50'>
              <a className='w-full hover:bg-zinc-800 text-black hover:text-white h-5 mb-8' href='#a1q1a'>Appendix</a>
            </li>
          </ul>
        </div>
        <div className='max-w-full'>
          <div id='area 1'>
            <div>
              <TTFByCountryChart />
              <FTDByCountryChart />
            </div>
            <StageStackChart />
            <OrdersTimeChart />
            <RevenueTimeChart />
          </div>
          <div id='area 2'>
            <ContactRateChart />
            <TATChart />
            <TouchesPerTicketChart />
          </div>
          <div id='appendix'>
            <TTFByHourChart />
            <FTDChart />
            <OrdersTimeChartGranular />
          </div>
        </div>
      </section>
    )
}

export default Data