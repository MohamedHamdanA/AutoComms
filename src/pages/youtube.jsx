import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Reusable component for the three circular buttons
const ThreeButtons = () => (
  <>
    {/* Upload Video */}
    <button
      className="w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow-sm flex items-center justify-center"
      aria-label="Upload Video"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5-5 5 5M12 4v12"
        />
      </svg>
    </button>
    {/* Go Live */}
    <button
      className="w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow-sm flex items-center justify-center"
      aria-label="Go Live"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10l4.553-2.276A2 2 0 0122.447 9.514v5.028a2 2 0 01-2.894 1.79L15 14V10z"
        />
        <rect
          x="3"
          y="8"
          width="12"
          height="8"
          rx="2"
          ry="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
    {/* Create Post */}
    <button
      className="w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 shadow-sm flex items-center justify-center"
      aria-label="Create Post"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 4H7a2 2 0 00-2 2v11.586a1 1 0 001.707.707L11 17.414M11 4l9.293 9.293a1 1 0 010 1.414l-8.586 8.586a1 1 0 01-1.414 0L3.293 14.707a1 1 0 010-1.414L11 4z"
        />
      </svg>
    </button>
  </>
);

const Youtube = () => {
  const [channelData, setChannelData] = useState(null);
  const [latestVideo, setLatestVideo] = useState(null);

  useEffect(() => {
    fetch("/api/channel-data")
      .then((res) => res.json())
      .then((data) => setChannelData(data))
      .catch((err) => console.error("Error fetching channel data:", err));

    fetch("/api/latest-video")
      .then((res) => res.json())
      .then((data) => setLatestVideo(data))
      .catch((err) => console.error("Error fetching video data:", err));
  }, []);

  // Dummy data for the chart (replace with real data)
  const chartLabels = [
    "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", 
    "Day 6", "Day 7", "Day 8", "Day 9", "Day 10",
    "Day 11", "Day 12", "Day 13", "Day 14", "Day 15",
    "Day 16", "Day 17", "Day 18", "Day 19", "Day 20",
    "Day 21", "Day 22", "Day 23", "Day 24", "Day 25",
    "Day 26", "Day 27", "Day 28"
  ];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Views (Last 28 Days)",
        data: [1, 3, 2, 5, 6, 10, 9, 7, 4, 8, 3, 5, 2, 0, 2, 1, 3, 4, 6, 7, 8, 5, 4, 2, 3, 1, 0, 1],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Views: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.2)" }
      }
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden mt-20">
      {/* Full-screen Background Gradient */}
      <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
        <motion.h1
          className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2 }}
        >
          AutoComms
        </motion.h1>
      </div>

      {/* Main Container */}
      <section className="relative z-10 p-4 flex justify-center">
        <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl text-black text-center shadow-lg w-full max-w-[1200px]">
          {/* Outer container: stack vertically on small screens, row on md+ */}
          <div className="flex flex-col md:flex-row items-start border border-gray-300 rounded-lg p-5 gap-6">
            
            {/* Profile Section */}
            <div className="w-full md:w-[30%] flex flex-col items-center text-center">
              {/* On SMALL screens: show buttons at the top right of the Profile section */}
              <div className="md:hidden flex items-center justify-end gap-4 w-full mb-4">
                <ThreeButtons />
              </div>
              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <img
                src={
                  channelData?.profileImage ||
                  "https://yt3.ggpht.com/IAWVmm4OnMsNf__9H43e6LUNImvBwVlBz71gsXIghNjFZFBSdGLeqtuf73CZdUETPw4tfazldA=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                }
                alt="Profile Image"
                className="w-36 h-35 rounded-full object-cover border-4 border-white"
              />
              <h2 className="text-md font-semibold mt-2">
                {channelData?.channelName || "Your Channel"}
              </h2>
              <p className="text-gray-600 text-sm">
                {channelData?.owner || "Sandeep V"}
              </p>
              <hr className="border-t border-gray-300 w-full my-3" />
              <p className="text-lg font-bold text-left w-full">Channel Analytics</p>
              <p className="text-[12px] text-gray-700 text-left w-full">Current subscribers</p>
              <p className="text-left w-full font-bold text-[40px]">
                {channelData?.subscribers || 0}
              </p>
              <hr className="border-t border-gray-300 w-full my-3" />
              <p className="text-lg font-bold text-left w-full">Summary</p>
              <p className="text-[12px] text-gray-700 text-left w-full">Last 28 days</p>
              <div className="grid grid-cols-2 gap-1 text-gray-700 text-sm font-semibold px-1 w-full">
                <p className="text-left w-full">Views</p>
                <p className="text-right">{channelData?.views || 0}</p>
                <p className="text-left w-full">Likes</p>
                <p className="text-right">{channelData?.likes || 0}</p>
              </div>
            </div>

            {/* Divider for large screens */}
            <div className="hidden md:block border-l border-gray-300 h-120"></div>
            
            {/* Latest Video (Performance) Section */}
            <div className="w-full md:w-[35%] flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-left">Channel Dashboard</h2>
              <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold text-center">Latest Video Performance</h2>
                <div className="relative w-full h-40 rounded-lg overflow-hidden">
                  <img
                    src={
                      latestVideo?.thumbnail ||
                      "https://www.gstatic.com/youtube/img/promos/growth/9784530541269f38ced34bfb5407b15bc3127a7709331f747c777440948b52a5_1280x720.jpeg"
                    }
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
                  <div className="absolute bottom-2 left-2 right-2 text-white font-semibold text-sm sm:text-base line-clamp-2">
                    {latestVideo?.title || "No Title Available"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm font-semibold px-4">
                  <p className="text-left">Views</p>
                  <p className="text-right">{latestVideo?.views || 0}</p>
                  <p className="text-left">Likes</p>
                  <p className="text-right">{latestVideo?.likes || 0}</p>
                  <p className="text-left">Comments</p>
                  <p className="text-right">{latestVideo?.comments || 0}</p>
                </div>
              </div>
              {/* Extra analytics boxes (Performance Section) */}
              <div className="flex flex-wrap gap-11 mt-4 justify-center md:justify-start">
                <div className="p-3 border border-gray-300 rounded-lg w-[140px] flex flex-col items-center">
                  <p className="text-[12px] font-medium leading-none text-center">Total No. of Videos</p>
                  <p className="text-xl font-bold mt-1">
                    {channelData?.totalVideos || 0}
                  </p>
                </div>
                <div className="p-3 border border-gray-300 rounded-lg w-[140px] flex flex-col items-center">
                  <p className="text-[12px] font-medium leading-none text-center">Total Watch Hours</p>
                  <p className="text-xl font-bold mt-1">
                    {channelData?.watchHours || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Analytical Section (Right Column) */}
            <div className="w-full md:w-[35%] lg:w-[40%] flex flex-col items-start gap-4">
              {/* On LARGE screens: Buttons in the Analytical Section */}
              <div className="hidden md:flex items-center justify-end gap-4 w-full">
                <ThreeButtons />
              </div>
              
              {/* Analytics Graph */}
              <div className="mt-2 w-full p-4 bg-white bg-opacity-80 rounded-lg shadow-sm">
                <h3 className="text-md font-bold mb-2 text-gray-700">Analytics Graph</h3>
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
              
              {/* Analytics Cards */}
              <div className="flex flex-wrap gap-6">
                <div className="p-3 border border-gray-300 rounded-lg w-[140px] flex flex-col items-center">
                  <p className="text-[12px] font-medium leading-none text-center">Revenue Generated</p>
                  <p className="text-xl font-bold mt-1">
                    ${channelData?.revenue || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Youtube;
