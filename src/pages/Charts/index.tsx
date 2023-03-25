import TATChart from "./TATChart";
import TTFByHourChart from "./TTFByHourChart";
import FTDChart from "./FTDChart";
import StageStackChart from "./StageStackChart";
import TTFByCountryChart from "./TTFByCountryChart";
import OrdersTimeChart from "./OrdersTimeChart";
import OrdersTimeChartGranular from "./OrdersTimeChartGranular";
import FTDByCountryChart from "./FTDByCountryChart";
import ContactRateChart from "./ContactRateChart";
import TouchesPerTicketChart from "./TouchesPerTicket";
import RevenueTimeChart from "./RevenueTimeChart";

export default function Charts() {
  return (
    <section
      id="page-container"
      className="flex flex-col bg-gray-50 w-screen pt-12 px-6"
    >
      <div id="table-contents" className="h-auto mb-96">
        <h1 className="text-black font-bold mb-4">Table of Contents</h1>
        <ul className="pl-4 mb-6">
          <li className="mb-2 text-black inline-block transition ease-in-out delay-50">
            🚚 Fulfillment
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#fulfill-delivery"
            >
              Understanding time to fulfill and deliver orders
            </a>
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block mr-80 transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#stages"
            >
              Understanding end to end delivery times
            </a>
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block mr-80 transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#market-size"
            >
              Understanding market size
            </a>
          </li>
          <br></br>
          <li className="mb-2 text-black inline-block transition ease-in-out delay-50">
            💁 Customer Support
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#contact-rate"
            >
              Understanding contact rate
            </a>
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#turn-around-time"
            >
              Understanding turn around time
            </a>
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#touches-per-ticket"
            >
              Understanding touches per ticket
            </a>
          </li>
          <br></br>
          <li className="mb-2 text-black inline-block transition ease-in-out delay-50">
            🗃️ Appendix
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#fulfill-dist"
            >
              Appendix A: Time to Fulfillment Distribution
            </a>
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#delivery-dist"
            >
              Appendix B: Time to Deliver Distribution
            </a>
          </li>
          <br></br>
          <li className="ml-6 mb-2 inline-block transition ease-in-out delay-50">
            <a
              className="w-full hover:bg-zinc-800 text-blue-600 underline hover:text-white h-5 mb-8"
              href="#orders-time-granular"
            >
              Appendix C: Orders over Time Granular View
            </a>
          </li>
        </ul>
      </div>
      <div id="area 1">
        <div id="fulfill-delivery" className="mt-20 pt-1">
          <TTFByCountryChart />
          <FTDByCountryChart />
        </div>
        <div id="stages" className="pt-12 mb-12">
          <StageStackChart />
        </div>
        <div id="market-size" className="pt-6">
          <OrdersTimeChart />
          <RevenueTimeChart />
        </div>
      </div>
      <div id="area 2">
        <div id="contact-rate" className="pt-28">
          <ContactRateChart />
        </div>
        <div id="turn-around-time" className="mt-56 pt-24">
          <TATChart />
        </div>
        <div id="touches-per-ticket" className="mt-56 pt-24">
          <TouchesPerTicketChart />
        </div>
      </div>
      <div id="fulfill-dist" className="pt-4">
        <TTFByHourChart />
      </div>
      <div id="delivery-dist" className="pt-4">
        <FTDChart />
      </div>
      <div id="orders-time-granular" className="pt-4 mb-48">
        <OrdersTimeChartGranular />
      </div>
    </section>
  );
}
