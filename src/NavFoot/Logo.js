import { Link } from "react-router-dom";
import logoImage from "../assets/logo.jpg";

const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img src={logoImage} alt="Prime-D Logo" className="h-10" />
    <span className="text-lg font-semibold text-gray-700">Prime-D</span>
  </Link>
);

export default Logo;
