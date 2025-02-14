import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Classes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch("http://localhost:5000/api/classes/my-classes", {
        //             method: "GET",
        //             credentials: "include",
        //         }); 
        //         if (!response.ok) throw new Error("Failed to fetch data");
        //         const result = await response.json();
        //         setData(result.classes);
        //     } catch (err) {
        //         setError(err.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchData();
        setData([
            {
                "class_id": 1,
                "user_id": 1,
                "class_name": "AIML a-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.146Z"
            },{
                "class_id": 2,
                "user_id": 1,
                "class_name": "AIML b-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.14"
            },{
                "class_id": 1,
                "user_id": 1,
                "class_name": "IT a-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.146Z"
            },{
                "class_id": 2,
                "user_id": 1,
                "class_name": "IT b-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.14"
            },{
                "class_id": 1,
                "user_id": 1,
                "class_name": "ECE a-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.146Z"
            },{
                "class_id": 2,
                "user_id": 1,
                "class_name": "ECE b-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.14"
            },{
                "class_id": 1,
                "user_id": 1,
                "class_name": "ECE C-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.146Z"
            },{
                "class_id": 2,
                "user_id": 1,
                "class_name": "b-section",
                "schedule": null,
                "created_at": "2025-02-13T12:59:08.14"
            }]);
        setLoading(false);
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-auto">
            {/* Background */}
            <div
                className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500"
                style={{ pointerEvents: "none" }}
            >
                <motion.h1
                    className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2 }}
                >
                    AutoComms
                </motion.h1>
            </div>

            {/* Main Content */}
            <section className="relative mt-24 z-10 flex flex-col items-center justify-center min-h-screen p-6">
                <div className="p-6 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">Classes</h2>

                    {/* Fetch Status */}
                    {loading && <p className="text-gray-700">Loading...◌</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Data Display - List View */}
                    {!loading && !error && (
                        <div className="mt-4 w-full">
                            {data.map((item) => (
                                <motion.div
                                    key={item.class_id}
                                    className="p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => navigate(`/classes/${item.class_id}`)}
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-black">
                                            {item.class_name}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <motion.button
                className="fixed z-20 top-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => navigate("/createclass")}
            >
                <span className="text-lg font-medium">Create</span>
                <Plus size={24} />
            </motion.button>

        </div>
    );
};

export default Classes;
