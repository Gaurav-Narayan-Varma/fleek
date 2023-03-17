import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import fleekLogo from "../assets/black_logo_transparent_background.avif";

export default function NavBar() {
  const location = useLocation();

  return (
    <section
      id="nav-bar"
      className="px-5 w-56 shrink-0 h-auto bg-white text-black font-sans border border-stone-200"
    >
      <img
        src={fleekLogo}
        className="h-20 w-auto"
        alt="Fleek logo with transparent background"
      />
      <ul className="">
        <li className={`${location.pathname === "/" && "font-bold"} mb-4`}>
          <Link to="/">📦 Parcel Dashboard</Link>
        </li>
        <li className={`${location.pathname === "/data" && "font-bold"}`}>
          <Link to="/data">📈 Charts & Analysis</Link>
        </li>
      </ul>
    </section>
  );
}
