import { Link } from "react-router-dom";

const NavigationLinks = () => (
  <div className="space-x-6 flex flex-col md:flex-row mt-2 md:mt-0 text-gray-700">
    <Link to="/features" className="hover:text-gray-900">
      Features
    </Link>
    <Link to="/pricing" className="hover:text-gray-900">
      Pricing
    </Link>
    <Link to="/about" className="hover:text-gray-900">
      About
    </Link>
    <Link to="/contact" className="hover:text-gray-900">
      Contact
    </Link>
    <Link to="/primeTreads" className="hover:text-gray-900">
      Prime-Treads
    </Link>
  </div>
);

export default NavigationLinks;
