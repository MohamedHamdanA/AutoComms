import { motion } from "framer-motion";

const Youtube = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
        
        {/* 🔹 Background (Gradient + Large Text) */}
        <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
            
            {/* Large "AutoComms" Text in Background */}
            <motion.h1 
                className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2 }}
            >
                AutoComms
            </motion.h1>
        </div>

        {/* 🔹 Main Content Section */}
        <section className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg">
                <h2 className="text-3xl font-bold">Hello Youtube!</h2>
            </div>
        </section>
        
    </div>
);
};

export default Youtube