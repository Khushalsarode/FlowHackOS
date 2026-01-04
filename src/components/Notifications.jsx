// Notifications.jsx
import { useState, useEffect } from "react";
import { FaBell, FaCheck, FaTimes, FaExclamationCircle } from "react-icons/fa";

export default function Notifications() {
  /* ---------------- Dummy Notification Data ---------------- */
  const dummyNotifications = [
    {
      id: "n1",
      title: "New Idea Collaboration Request",
      description: "Arjun Mehta wants to collaborate on 'HackMap Module'.",
      type: "info",
      time: "5m ago",
      read: false,
      actions: ["Accept", "Decline"]
    },
    {
      id: "n2",
      title: "Momentum Alert",
      description: "Your Flow score dropped below 50 in 'Scope Killer Module'.",
      type: "warning",
      time: "30m ago",
      read: false,
      actions: []
    },
    {
      id: "n3",
      title: "Hack Completed",
      description: "You earned 50 points for 'AI Chatbot Integration'.",
      type: "success",
      time: "1h ago",
      read: true,
      actions: []
    },
    {
      id: "n4",
      title: "New Team Member",
      description: "Diya Sharma joined your team in 'Demo or Die'.",
      type: "info",
      time: "2h ago",
      read: false,
      actions: ["Message"]
    },
    {
      id: "n5",
      title: "System Maintenance",
      description: "Scheduled maintenance on Jan 5th from 2 AM to 5 AM IST.",
      type: "system",
      time: "1d ago",
      read: true,
      actions: []
    },
  ];

  const [notifications, setNotifications] = useState(dummyNotifications);

  /* ---------------- Actions ---------------- */

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  /* ---------------- Type Colors ---------------- */
  const typeColor = {
    info: "bg-blue-600 text-white",
    warning: "bg-yellow-500 text-zinc-900",
    success: "bg-green-600 text-white",
    system: "bg-zinc-500 text-white",
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 px-4">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
          >
            <FaCheck /> Mark All Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 && (
            <p className="text-zinc-500 text-center py-10">No notifications to show.</p>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-start p-4 rounded-xl shadow-md hover:shadow-lg transition ${
                n.read ? "bg-zinc-800/70" : "bg-zinc-900 border-l-4 border-indigo-400"
              }`}
            >
              {/* Icon + Content */}
              <div className="flex gap-3 flex-1">
                <div className="mt-1">
                  {n.type === "info" && <FaBell className="text-blue-400" />}
                  {n.type === "warning" && <FaExclamationCircle className="text-yellow-400" />}
                  {n.type === "success" && <FaCheck className="text-green-400" />}
                  {n.type === "system" && <FaTimes className="text-zinc-400" />}
                </div>
                <div>
                  <p className="text-white font-medium">{n.title}</p>
                  <p className="text-zinc-400 text-sm">{n.description}</p>
                  <p className="text-zinc-500 text-xs mt-1">{n.time}</p>

                  {/* Action Buttons */}
                  {n.actions.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {n.actions.map((a, idx) => (
                        <button
                          key={idx}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs"
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex flex-col items-end gap-2 ml-3">
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-xs text-green-400 hover:text-green-500"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
