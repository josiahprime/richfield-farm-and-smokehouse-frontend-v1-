import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";

const logsData = [
  { id: 1, timestamp: "2025-01-25 09:15:23", user: "Admin", action: "Updated product details.", level: "Info" },
  { id: 2, timestamp: "2025-01-25 08:47:11", user: "Admin", action: "Deleted user account #34.", level: "Warning" },
  { id: 3, timestamp: "2025-01-24 20:33:07", user: "Admin", action: "Added a new product.", level: "Info" },
  { id: 4, timestamp: "2025-01-24 18:12:45", user: "System", action: "Server restarted.", level: "Warning" },
  { id: 5, timestamp: "2025-01-24 15:03:14", user: "System", action: "Database backup completed.", level: "Info" },
  { id: 6, timestamp: "2025-01-23 14:22:09", user: "Admin", action: "Failed login attempt.", level: "Error" },
  { id: 7, timestamp: "2025-01-22 12:11:55", user: "User123", action: "Password changed.", level: "Info" },
  { id: 8, timestamp: "2025-01-21 10:08:42", user: "System", action: "Low disk space warning.", level: "Warning" },
];

const LEVEL_COLORS = {
  Info: "bg-blue-100 text-blue-700",
  Warning: "bg-yellow-100 text-yellow-700",
  Error: "bg-red-100 text-red-700",
};

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Extract unique users for filter dropdown
  const users = useMemo(() => {
    const uniqueUsers = [...new Set(logsData.map((log) => log.user))];
    return uniqueUsers;
  }, []);

  // Filter logs based on search and filters
  const filteredLogs = useMemo(() => {
    return logsData.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUser = selectedUser === "All" || log.user === selectedUser;
      const matchesLevel = selectedLevel === "All" || log.level === selectedLevel;
      return matchesSearch && matchesUser && matchesLevel;
    });
  }, [searchTerm, selectedUser, selectedLevel]);

  // Pagination logic
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  // Compute summary stats
  const topUsers = useMemo(() => {
    const counts = {};
    logsData.forEach(({ user }) => {
      counts[user] = (counts[user] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, []);

  const commonActions = useMemo(() => {
    const counts = {};
    logsData.forEach(({ action }) => {
      counts[action] = (counts[action] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, []);

  // Dummy export function
  const exportCSV = () => {
    alert("Export functionality coming soon!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">System Logs</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {filteredLogs.length} log entries found
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
            aria-label="Export logs to CSV"
          >
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Users</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All Levels</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Top Active Users</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {topUsers.map(([user, count]) => (
                <li key={user}>
                  <span className="font-medium">{user}</span> — {count} actions
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Most Common Actions</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              {commonActions.map(([action, count], idx) => (
                <li key={idx}>
                  <span className="font-medium">{action}</span> — {count} times
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-gray-300">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-gray-300">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-gray-300">Action</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase dark:text-gray-300">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {currentLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No logs found.
                  </td>
                </tr>
              ) : (
                currentLogs.map(({ id, timestamp, user, action, level }) => (
                  <tr
                    key={id}
                    className="hover:bg-green-50 dark:hover:bg-green-900 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300 font-mono text-sm">{timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${LEVEL_COLORS[level]}`}
                      >
                        {user}
                      </span>
                    </td>
                    <td className="px-6 py-4">{action}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${LEVEL_COLORS[level]}`}
                      >
                        {level}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Previous
          </button>
          <span className="text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Logs;
