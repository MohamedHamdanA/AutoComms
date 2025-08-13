// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function GformDetails() {
//     const { formId, classId } = useParams();
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // For demonstration, we are using static data.
//         // In production, uncomment the fetch call and adjust the endpoint.
//         /*
//         const fetchData = async () => {
//           try {
//             const response = await fetch(`http://localhost:5000/api/google-form/responses/${formId}`, {
//               method: "GET",
//               credentials: "include",
//             });
//             if (!response.ok) {
//               throw new Error("Failed to fetch form details");
//             }
//             const result = await response.json();
//             setData(result);
//           } catch (err) {
//             setError(err.message);
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchData();
//         */
//         // Static demonstration data:
//         setData({
//             total_students: 3,
//             responses: 3,
//             completion_status: [
//                 { student_id: 1, email: "student1@example.com", completed: "Yes" },
//                 { student_id: 2, email: "student2@example.com", completed: "No" },
//                 { student_id: 3, email: "student3@example.com", completed: "Yes" },
//             ],
//         });
//         setLoading(false);
//         setError("");
//     }, [formId, classId]);

//     return (
//         <div className="min-h-screen bg-gray-50 p-4">
//             <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
//                 <h1 className="text-3xl font-bold mb-6">Google Form Details</h1>

//                 {loading && <p className="text-gray-600">Loading...</p>}
//                 {error && <p className="text-red-500">{error}</p>}

//                 {data && (
//                     <>
//                         <div className="mb-6">
//                             <p className="text-lg">
//                                 Total Students:{" "}
//                                 <span className="font-bold">{data.total_students}</span>
//                             </p>
//                             <p className="text-lg">
//                                 Total Responses:{" "}
//                                 <span className="font-bold">{data.responses}</span>
//                             </p>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Student ID
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Email
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Completed
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {data.completion_status.map((item) => (
//                                         <tr key={item.student_id}>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {item.student_id}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {item.email}
//                                             </td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {item.completed === "Yes" ? (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                         Yes
//                                                     </span>
//                                                 ) : (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                                         No
//                                                     </span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default GformDetails;






// import { ArrowLeft } from "lucide-react";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// //  import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// function GformDetails() {
//     const { formId, classId } = useParams();
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();


//     useEffect(() => {
//         // const fetchData = async () => {
//         //     try {
//         //     const response = await fetch(`http://localhost:5000/api/google-form/responses/${classId}/${formId}`, {
//         //         method: "GET",
//         //         credentials: "include",
//         //     });
//         //     if (!response.ok) {
//         //         throw new Error("Failed to fetch form details");
//         //     }
//         //     const result = await response.json();
//         //     setData(result);
//         //     } catch (err) {
//         //     setError(err.message);
//         //     } finally {
//         //     setLoading(false);
//         //     }
//         // };
//         // fetchData();
//         // For demonstration purposes, we're using static data.
//         // In production, replace this with your API call.
//         const staticData = {
//             total_students: 3,
//             responses: 3,
//             completion_status: [
//                 { student_id: 1, email: "student1@example.com", completed: "Yes" },
//                 { student_id: 2, email: "student2@example.com", completed: "No" },
//                 { student_id: 3, email: "student3@example.com", completed: "Yes" },
//             ],
//         };
//         setData(staticData);
//         setLoading(false);
//         setError(null);
//     }, [formId, classId]);

//     return (

//         <div className="min-h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500 p-4">
//             <div className="relative mt-2  z-10">
//             <motion.button
//                     className="flex rounded-xl  items-center  text-white  px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/classes/:classId")}
//                 >
//                     <ArrowLeft size={20} className="mr-2" />
//                     Back to G-form
//                 </motion.button>
//             </div>

//             <div className="max-w-5xl mx-auto mt-24 bg-white shadow-md rounded-lg p-6">

//                 <h1 className="text-3xl font-bold mb-6">Google Form Details</h1>

//                 {loading && <p className="text-gray-600">Loading...</p>}
//                 {error && <p className="text-red-500">{error}</p>}

//                 {data && (
//                     <>
//                         <div className="mb-6">
//                             <p className="text-lg">
//                                 Total Students: <span className="font-bold">{data.total_students}</span>
//                             </p>
//                             <p className="text-lg">
//                                 Total Responses: <span className="font-bold">{data.completed_count}</span>
//                             </p>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead className="bg-gray-100">
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Student ID
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Email
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                             Completed
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {data.completion_status.map((item) => (
//                                         <tr key={item.student_id}>
//                                             <td className="px-6 py-4 whitespace-nowrap">{item.student_id}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 {item.completed === "Yes" ? (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                         Yes
//                                                     </span>
//                                                 ) : (
//                                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
//                                                         No
//                                                     </span>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default GformDetails;

{/**above one is for checking */}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Bell } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const GformDetails = () => {
    const { formId, classId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //useEffect(() => {
        // For demonstration, using static data.
    //     const staticData = {
    //         total_students: 3,
    //         responses: 3,
    //         completion_status: [
    //             { student_id: 1, email: "student1@example.com", completed: "Yes" },
    //             { student_id: 2, email: "student2@example.com", completed: "No" },
    //             { student_id: 3, email: "student3@example.com", completed: "Yes" },
    //         ],
    //     };
    //     setData(staticData);
    //     setLoading(false);
    //     setError(null);
    // }, [formId, classId]);

    useEffect(() => {
                const fetchData = async () => {
                    try {
                    const response = await fetch(`http://localhost:5000/api/google-form/responses/${classId}/${formId}`, {
                        method: "GET",
                        credentials: "include",
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch form details");
                    }
                    const result = await response.json();
                    setData(result);
                    } catch (err) {
                    setError(err.message);
                    } finally {
                    setLoading(false);
                    }
                };
                fetchData();
                // For demonstration purposes, we're using static data.
                // In production, replace this with your API call.
                // const staticData = {
                //     total_students: 3,
                //     responses: 3,
                //     completion_status: [
                //         { student_id: 1, email: "student1@example.com", completed: "Yes" },
                //         { student_id: 2, email: "student2@example.com", completed: "No" },
                //         { student_id: 3, email: "student3@example.com", completed: "Yes" },
                //     ],
                // };
                // setData(staticData);
                // setLoading(false);
                // setError(null);
            }, [formId, classId]);



    // Calculate completed_count and noCount
    let completedCount = 0;
    let noCount = 0;
    if (data) {
        completedCount = data.completion_status.filter((item) => item.completed === "Yes").length;
        noCount = data.total_students - completedCount;
    }
    const pieData = [
        { name: "Yes", value: completedCount },
        { name: "No", value: noCount },
    ];

    const handleSendReminder = async () => {
        if (!data || !data.completion_status) {
            alert("No data available to send reminders.");
            return;
        }
    
        // ✅ Extract emails of students who haven't completed the form
        const nonFilledStudents = data.completion_status
            .filter(student => student.completed === "No") // Get only those who haven't filled
            .map(student => student.email); // Extract emails
    
        if (nonFilledStudents.length === 0) {
            alert("All students have already completed the form.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:5000/api/google-form/reminder/${classId}/${formId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ emails: nonFilledStudents }) // ✅ Send email list to backend
            });
    
            const result = await response.json();
            alert(result.message); // Show confirmation
        } catch (error) {
            console.error("Error sending reminder:", error);
            alert("Failed to send reminder.");
        }
    };    

    return (
        <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500 overflow-auto">
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
                    className="flex rounded-xl items-center text-white mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/classes")}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Classes
                </motion.button>

                {loading && (
                    <p className="border-4 rounded-xs text-white">Loading class details...</p>
                )}
                {error && <p className="text-red-400">{error}</p>}
                {!loading && !error && data && (
                    <div className="max-w-5xl mt-8 mx-auto bg-white shadow-md rounded-lg p-6">
                        <h1 className="text-3xl font-bold mb-6">Google Form Details</h1>
                        <div className="mb-6">
                            <p className="text-lg">
                                Total Students: <span className="font-bold">{data.total_students}</span>
                            </p>
                            <p className="text-lg">
                                Total Responses: <span className="font-bold">{data.completed_count}</span>
                            </p>
                        </div>

                        {/* Table of Completion Status */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Student ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Completed
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.completion_status.map((item) => (
                                        <tr key={item.student_id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.student_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.completed === "Yes" ? (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Yes
                                                    </span>
                                                ) : (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        No
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pie Chart for Completion Status */}
                        <div className="mt-8">
                            <h2 className="text-xl  font-bold text-center mb-4">Completion Status</h2>
                            <div className="w-full h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.name === "Yes" ? "#4CAF50" : "#F44336"}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value, name) => [`${value}`, name]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Button */}
            <motion.button
                className="fixed z-50 top-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => navigate(`/classes/googleform/create/${classId}`)}
            >
                <span className="text-lg font-medium">Create</span>
                <Plus size={24} />
            </motion.button>
            <motion.button
                className="fixed z-50 bottom-6 right-6 bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 1.1 }}
                onClick={handleSendReminder} // ✅ Calls the reminder API
            >
                <span className="text-lg font-medium">Reminder</span>
                <Bell size={24} />
            </motion.button>

        </div>
    );
};

export default GformDetails;
