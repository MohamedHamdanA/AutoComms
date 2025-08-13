import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import { motion } from "framer-motion";

const Home = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">

            {/* 🔹 Static Background (Particles + Large AutoComms Text) */}
            <div className="fixed inset-0 h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">

                {/* Background "AutoComms" Text */}
                <motion.h1
                    className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    AutoComms
                </motion.h1>

                {/* Particle Background */}
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        fullScreen: { enable: false },
                        background: { color: "transparent" },
                        particles: {
                            number: { value: 90, density: { enable: true, value_area: 800 } },
                            color: { value: ["#6C5CE7", "#00CEC9", "#FAB1A0", "#FFFFFF"] },
                            shape: { type: "circle" },
                            opacity: { value: 0.7, random: true },
                            size: { value: 4, random: true },
                            move: { enable: true, speed: 1.5 },
                        },
                        interactivity: {
                            events: { onHover: { enable: true, mode: "bubble" }, onClick: { enable: true, mode: "push" } },
                            modes: { bubble: { distance: 200, size: 5, duration: 1 } },
                        },
                        detectRetina: true,
                    }}
                    className="absolute top-0 left-0 w-full h-full -z-10"
                />
            </div>

            {/* 🔹 Scrollable Content */}
            <div className="relative z-10 flex flex-col items-center overflow-y-auto">

                {/* Hero Section (Initially Centered) */}
                <section className="w-full min-h-screen flex items-center justify-center">
                    <motion.div
                        className="backdrop-blur-sm hover:scale-105 transition-transform bg-transparent shadow-lg p-10 rounded-xl text-center text-gray-950"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1 className="text-5xl  bg-transparent bg-opacity-10 backdrop-blur-lg rounded-lg font-extrabold bg-gradient-to-r from-cyan-950 via-blue-300 to-purple-500 bg-clip-text text-transparent">
                            Welcome to AutoComms
                        </motion.h1>
                        <motion.p className="mt-4 text-lg text-gray-950">
                            A Unified Communication System for seamless connectivity
                        </motion.p>
                    </motion.div>
                </section>

                {/* Services Section (Visible after scrolling) */}
                <section className="w-full flex flex-col items-center py-20 mt-1">
                    <h2 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-cyan-950 via-blue-400 to-purple-500 text-center mb-8">Services</h2>

                    <div className="flex flex-wrap gap-10 justify-center">
                        {/* Smart Notification System */}
                        <motion.div
                            className="w-80 px-6 py-10 hover:scale-110 transition-transform mt-16 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md text-center"
                            
                        >
                            <h3 className="text-2xl  font-semibold text-gray-950">Smart Notify System</h3>
                            <p className="text-gray-950 mt-2 ">
                                Stay with real-time notifications customized for your needs.
                            </p>
                        </motion.div>

                        {/* Social Media Integration Box */}
                        <motion.div
                            className="w-80 px-6 py-10 hover:scale-110 transition-transform mt-16 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md text-center"
                        >
                            <h3 className="text-2xl  font-semibold text-gray-950">Social Media Integration</h3>
                            <p className="text-gray-950 mt-2">
                                Upload social media posts and send your notify instantly
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Get Started Section */}
                <section className="w-full py-20 flex flex-col items-center">
                    <button className="mt-4 px-6 py-3 bg-gradient-to-r from-cyan-800 to-purple-600 text-white font-bold rounded-full hover:scale-105 transition-transform">
                        Get Started Now!
                    </button>
                </section>
            </div>
        </div>
    )
}
export default Home;

