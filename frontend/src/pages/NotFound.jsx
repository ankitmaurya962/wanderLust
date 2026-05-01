import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaCompass, FaMapMarkedAlt, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(250,204,21,0.24),transparent_32%)]" />

      <Navbar />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 pb-14 pt-28">
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            className="mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center rounded-full border border-yellow-400/35 bg-black/45 p-6 shadow-2xl shadow-yellow-400/10 backdrop-blur-sm sm:max-w-[380px]"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/15">
              <div className="absolute h-[78%] w-px bg-white/15" />
              <div className="absolute h-px w-[78%] bg-white/15" />
              <span className="absolute top-4 text-xs font-semibold tracking-[0.35em] text-yellow-300">
                N
              </span>
              <span className="absolute bottom-4 text-xs font-semibold tracking-[0.35em] text-white/60">
                S
              </span>
              <span className="absolute right-4 text-xs font-semibold tracking-[0.35em] text-white/60">
                E
              </span>
              <span className="absolute left-5 text-xs font-semibold tracking-[0.35em] text-white/60">
                W
              </span>

              <motion.div
                className="absolute inset-8 rounded-full border border-dashed border-yellow-300/45"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="relative text-[8.5rem] text-yellow-400 drop-shadow-[0_0_28px_rgba(250,204,21,0.42)] sm:text-[10rem]"
                animate={{ rotate: [0, 22, -14, 360] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaCompass />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
          >
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur-sm">
              <FaMapMarkedAlt />
              Route not found
            </p>

            <h1 className="text-7xl font-bold leading-none text-white sm:text-8xl md:text-9xl">
              404
            </h1>

            <h2 className="mt-5 text-3xl font-semibold text-white md:text-5xl">
              Your compass is spinning.
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-200 md:text-lg">
              This destination is not on the map anymore. Head back to the
              trailhead or search through stays that are ready for your next
              trip.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                <FaArrowLeft />
                Back to Home
              </Link>

              <Link
                to="/listings"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:border-yellow-300 hover:text-yellow-300"
              >
                <FaSearch />
                Explore Listings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
