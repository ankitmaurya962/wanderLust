import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-white/10 mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            WanderLust
          </h2>
          <p className="text-sm">
            Discover amazing places around the world. Travel, explore and feel at home.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-medium mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/listings" className="hover:text-yellow-400">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/listings/new" className="hover:text-yellow-400">
                Add Listing
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth / Contact */}
        <div>
          <h3 className="text-white font-medium mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/signin" className="hover:text-yellow-400">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-yellow-400">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} WanderLust. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;