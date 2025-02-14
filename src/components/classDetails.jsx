// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowLeft } from "lucide-react";

// const ClassDetail = () => {
//     const { classId } = useParams();
//     const navigate = useNavigate();
//     const [classInfo, setClassInfo] = useState(null);
//     const [googleForms, setGoogleForms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchClassDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
//                     method: "GET",
//                     credentials: "include",
//                 });
//                 if (!response.ok) throw new Error("Failed to fetch class details");
//                 const result = await response.json();
//                 setClassInfo(result.class);
//                 setGoogleForms(result.google_forms);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClassDetails();
//     }, [classId]);

//     return (
//         <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
//                 <motion.h1
//                     className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 0.2, scale: 1 }}
//                     transition={{ duration: 2 }}
//                 >
//                     AutoComms
//                 </motion.h1>
//             <motion.button
//                 className="flex items-center text-white mb-4 hover:underline"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate(-1)}
//             >
//                 <ArrowLeft size={20} /> Back to Classes
//             </motion.button>
//             {loading && <p>Loading class details...</p>}
//             {error && <p className="text-red-400">{error}</p>}
//             {!loading && !error && classInfo && (
//                 <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg">
//                     <h2 className="text-3xl font-bold mb-4">{classInfo.class_name}</h2>
//                     <p className="text-lg mb-4">{classInfo.description || "No description available"}</p>
//                     <h3 className="text-2xl font-semibold mb-2">Google Forms</h3>
//                     {googleForms.length > 0 ? (
//                         <ul className="space-y-3">
//                             {googleForms.map((form) => (
//                                 <li key={form.form_id} className="p-4 bg-gray-800 rounded-lg">
//                                     <a
//                                         href={form.form_url}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-300 hover:underline"
//                                     >
//                                         {form.form_title}
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-300">No forms available for this class.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClassDetail;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ClassDetail = () => {
    const { classId } = useParams();
    const navigate = useNavigate();
    const [classInfo, setClassInfo] = useState(null);
    const [googleForms, setGoogleForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch class details");
                const result = await response.json();
                setClassInfo(result.class);
                setGoogleForms(result.google_forms);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClassDetails();
    }, [classId]);

    return (
        <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
            {/* Background "AutoComms" Text */}
            <motion.h1
                className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2 }}
            >
                AutoComms
            </motion.h1>

            {/* Main Content */}
            <div className="relative z-10 p-6">
                {/* Back to Classes Button */}
                <motion.button
                    className="flex rounded-xl items-center text-white mb-4 px-4 py-2 bg-purple-600  hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/classes")}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Classes
                </motion.button>

                {loading && <p className=" border-4 rounded-xs  text-white">Loading class details...</p>}
                {error && <p className="text-red-400">{error}</p>}
                {!loading && !error && classInfo && (
                    <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg">
                        <h2 className="text-3xl font-bold mb-4">{classInfo.class_name}</h2>
                        <p className="text-lg mb-4">
                            {classInfo.description || "No description available"}
                        </p>
                        <h3 className="text-2xl font-semibold mb-2">Google Forms</h3>
                        {googleForms.length > 0 ? (
                            <ul className="space-y-3">
                                {googleForms.map((form) => (
                                    <li key={form.form_id} className="p-4 bg-gray-800 rounded-lg">
                                        <a
                                            href={form.form_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-300 hover:underline"
                                        >
                                            {form.form_title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-300">No forms available for this class.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClassDetail;
