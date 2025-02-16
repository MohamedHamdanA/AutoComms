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


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//  import { motion } from "framer-motion";

function GformDetails() {
    const { formId, classId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500 p-4">
            <div className="max-w-5xl mx-auto mt-24 bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">Google Form Details</h1>

                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {data && (
                    <>
                        <div className="mb-6">
                            <p className="text-lg">
                                Total Students: <span className="font-bold">{data.total_students}</span>
                            </p>
                            <p className="text-lg">
                                Total Responses: <span className="font-bold">{data.completed_count}</span>
                            </p>
                        </div>
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
                    </>
                )}
            </div>
        </div>
    );
}

export default GformDetails;
