import TATChart from './TATChart'
import TTFChart from './TTFChart'

function Data() {
    return (
      <section id='page-container' className='flex bg-white w-screen'>
        <section id='charts-analysis' className='pt-12 px-24 w-full bg-gray-50'>
          <TTFChart />
          <TATChart />
        </section>
      </section>
    )
}

export default Data