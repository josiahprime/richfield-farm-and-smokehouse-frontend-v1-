import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const Messages = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      email: "john.doe@example.com",
      subject: "Order Inquiry",
      date: "2025-01-20",
      message: "I want to know about the status of my recent order.",
      replied: false,
    },
    {
      id: 2,
      sender: "Jane Smith",
      email: "jane.smith@example.com",
      subject: "Feedback",
      date: "2025-01-19",
      message: "Great service! Just wanted to say thanks.",
      replied: true,
    },
    // More sample messages...
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");

  const handleReply = () => {
    if (!selectedMessage) return;
    alert(`Reply sent to ${selectedMessage.sender}: ${reply}`);
    setReply("");
    setSelectedMessage({ ...selectedMessage, replied: true });
    setMessages(
      messages.map((msg) =>
        msg.id === selectedMessage.id ? { ...msg, replied: true } : msg
      )
    );
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-6 w-screen">
        <Navbar />
        <div className="bg-gray-50 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Messages</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Messages List */}
              <div className="col-span-1 bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Inbox</h2>
                <ul className="divide-y divide-gray-200">
                  {messages.map((msg) => (
                    <li
                      key={msg.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedMessage?.id === msg.id
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedMessage(msg)}
                    >
                      <p className="font-medium text-gray-800">{msg.sender}</p>
                      <p className="text-sm text-gray-500">{msg.subject}</p>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{msg.date}</span>
                        {msg.replied && (
                          <span className="text-green-600 font-medium">
                            Replied
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Message Viewer */}
              <div className="col-span-2 bg-white p-6 rounded-lg shadow">
                {selectedMessage ? (
                  <>
                    <h2 className="text-lg font-semibold mb-4">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      From: {selectedMessage.sender} (
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-blue-600 underline"
                      >
                        {selectedMessage.email}
                      </a>
                      )
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Date: {selectedMessage.date}
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <p className="text-sm">{selectedMessage.message}</p>
                    </div>

                    <h3 className="text-md font-semibold mb-2">Your Reply</h3>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                      rows="4"
                      placeholder="Type your reply here..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                    <button
                      onClick={handleReply}
                      className="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600"
                      disabled={!reply}
                    >
                      Send Reply
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500">
                    Select a message to view its details and reply.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
