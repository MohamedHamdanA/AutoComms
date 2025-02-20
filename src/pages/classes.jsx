// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Plus } from "lucide-react";

// const Classes = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error,setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/api/classes/my-classes", {
//                     method: "GET",
//                     credentials: "include",
//                 });
//                 if (!response.ok) throw new Error("Failed to fetch data");
//                 const result = await response.json();
//                 setData(result.classes);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//         // setData([
//         //     {
//         //         "class_id": 1,
//         //         "user_id": 1,
//         //         "class_name": "AIML a-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.146Z"
//         //     },{
//         //         "class_id": 2,
//         //         "user_id": 1,
//         //         "class_name": "AIML b-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.14"
//         //     },{
//         //         "class_id": 1,
//         //         "user_id": 1,
//         //         "class_name": "IT a-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.146Z"
//         //     },{
//         //         "class_id": 2,
//         //         "user_id": 1,
//         //         "class_name": "IT b-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.14"
//         //     },{
//         //         "class_id": 1,
//         //         "user_id": 1,
//         //         "class_name": "ECE a-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.146Z"
//         //     },{
//         //         "class_id": 2,
//         //         "user_id": 1,
//         //         "class_name": "ECE b-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.146Z"
//         //     },{
//         //         "class_id": 2,
//         //         "user_id": 1,
//         //         "class_name": "b-section",
//         //         "schedule": null,
//         //         "created_at": "2025-02-13T12:59:08.14"
//         //     }]);
//         //setLoading(false);
//     }, []);

//     return (
//         <div className="relative w-full min-h-screen overflow-auto">
//             {/* Background */}
//             <div
//                 className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500"
//                 style={{ pointerEvents: "none" }}
//             >
//                 <motion.h1
//                     className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 0.2, scale: 1 }}
//                     transition={{ duration: 2 }}
//                 >
//                     AutoComms
//                 </motion.h1>
//             </div>

//             {/* Main Content */}
//             <section className="relative mt-18 z-10 flex flex-col items-center justify-center min-h-screen p-6">
//                 <div className="p-6 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg w-full max-w-4xl">
//                     <h2 className="text-3xl font-bold mb-4">Classes</h2>

//                     {/* Fetch Status */}
//                     {loading && <p className="text-gray-700">Loading...◌</p>}
//                     {error && <p className="text-red-500">{error}</p>}

//                     {/* Data Display - List View */}
//                     {!loading && !error && (
//                         <div className="mt-4 w-full">
//                             {data.map((item) => (
//                                 <motion.div
//                                     key={item.class_id}
//                                     className="p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full cursor-pointer"
//                                     whileHover={{ scale: 1.02 }}
//                                     transition={{ duration: 0.3 }}
//                                     onClick={() => navigate(`/classes/${item.class_id}`)}
//                                 >
//                                     <div className="flex-1">
//                                         <h3 className="text-lg font-bold text-black">
//                                             {item.class_name}
//                                         </h3>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </section>

//             <motion.button
//                 className="fixed z-20 top-6 right-6 bg-purple-600 text-white px-4 py-2  md:px-6 md:py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
//                 style={{ pointerEvents: "auto" }}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/createclass")}
//             >
//                 <span className="text-sm md:text-lg font-medium">Create</span>
//                 <Plus size={20} className="md:w-6 md:h-6" />
//             </motion.button>


//         </div>
//     );
// };

// export default Classes;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Classes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch classes when component mounts
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("http://localhost:5000/api/classes/my-classes", {
    //       method: "GET",
    //       credentials: "include",
    //     });
    //     if (!response.ok) throw new Error("Failed to fetch data");
    //     const result = await response.json();
    //     setData(result.classes);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
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

  // Delete a class and update state
  const handleDeleteClass = async (classId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/delete/${classId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete class");
      }
      // Remove the deleted class from state
      setData((prev) => prev.filter((cls) => cls.class_id !== classId));
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

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

      {/* Edit Mode Toggle Button */}
      <div className="absolute top-4 left-4 z-30">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setEditMode((prev) => !prev)}
        >
          {editMode ? "Exit Edit Mode" : "Edit"}
        </button>
      </div>

      {/* Main Content */}
      <section className="relative mt-18 z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="p-6 bg-transparent bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg w-full max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">Classes</h2>

          {/* Fetch Status */}
          {loading && <p className="text-gray-700">Loading...◌</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Class List */}
          {!loading && !error && (
            <div className="mt-4 w-full">
              {data.map((item) => (
                <motion.div
                  key={item.class_id}
                  className="relative p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    // Navigate only if not in edit mode.
                    if (!editMode) navigate(`/classes/${item.class_id}`);
                  }}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black">
                      {item.class_name}
                    </h3>
                  </div>
                  {/* In edit mode, show delete button */}
                  {editMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent parent click (navigation)
                        handleDeleteClass(item.class_id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      X
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <motion.button
        className="fixed z-20 top-6 right-6 bg-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
        style={{ pointerEvents: "auto" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/createclass")}
      >
        <span className="text-sm md:text-lg font-medium">Create</span>
        <Plus size={20} className="md:w-6 md:h-6" />
      </motion.button>
    </div>
  );
};

export default Classes;
