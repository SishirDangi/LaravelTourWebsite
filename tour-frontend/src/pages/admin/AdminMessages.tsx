import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const statusLabels: { [key: number]: string } = {
  1: "Pending",
  2: "Checked",
};

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status_id: number;
  created_at: string;
}

interface CustomSelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function formatDateTime(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString(undefined, options);
}

const ITEMS_PER_PAGE = 10;

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || "Select...";

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && (
        <label className="block mb-1 font-semibold text-gray-700">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <FaChevronDown
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          size={20}
        />
      </button>

      {isOpen && (
        <ul
          tabIndex={-1}
          role="listbox"
          className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(opt.value);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-400 ${value === opt.value ? "bg-gray-200 font-semibold" : ""}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/contact-messages`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Message[] = await res.json();
      setMessages(data);
      setError("");
    } catch {
      setError("Failed to load messages.");
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (id: number, newStatusId: number) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/contact-messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_id: newStatusId }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updatedMessage = await res.json();
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? updatedMessage.data : msg))
      );
      toast.success("Status updated successfully");
    } catch {
      toast.error("Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteMessage = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/contact-messages/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete message");
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      toast.success("Message deleted successfully");
    } catch {
      toast.error("Error deleting message");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        msg.name.toLowerCase().includes(searchLower) ||
        msg.email.toLowerCase().includes(searchLower) ||
        (msg.phone && msg.phone.toLowerCase().includes(searchLower));

      const msgDate = new Date(msg.created_at);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      const afterFrom = fromDate ? msgDate >= fromDate : true;
      const beforeTo = toDate ? msgDate <= new Date(toDate.getTime() + 86400000) : true;

      const matchesStatus = statusFilter === "all" || String(msg.status_id) === statusFilter;

      return matchesSearch && afterFrom && beforeTo && matchesStatus;
    });
  }, [messages, searchTerm, dateFrom, dateTo, statusFilter]);

  const sortedMessages = useMemo(() => {
    const msgs = [...filteredMessages];

    switch (sortBy) {
      case "date_asc":
        msgs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "name_asc":
        msgs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        msgs.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date_desc":
      default:
        msgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return msgs;
  }, [filteredMessages, sortBy]);

  const totalPages = Math.ceil(sortedMessages.length / ITEMS_PER_PAGE);
  const paginatedMessages = sortedMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const closeModal = () => setModalMessage(null);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "1", label: "Pending" },
    { value: "2", label: "Checked" },
  ];

  const sortOptions = [
    { value: "date_desc", label: "Date: Newest First" },
    { value: "date_asc", label: "Date: Oldest First" },
    { value: "name_asc", label: "Name: A-Z" },
    { value: "name_desc", label: "Name: Z-A" },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={5000} />
      <h1 className="text-3xl text-center font-semibold font-['Winky_Rough',sans-serif] mb-6 text-orange-500">
        Contact Messages
      </h1>

      {/* Search bar full width */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by Name, Email, Phone"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
      </div>

      {/* Filters grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mb-6">
        <input
          type="date"
          value={dateFrom}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDateFrom(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDateTo(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <CustomSelect
          options={statusOptions}
          value={statusFilter}
          onChange={(val: string) => {
            setStatusFilter(val);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={() => {
            setSearchTerm("");
            setDateFrom("");
            setDateTo("");
            setStatusFilter("all");
            setCurrentPage(1);
          }}
          className="col-span-full md:col-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Sort */}
      <div className="mb-4 max-w-xs">
        <CustomSelect
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={(val: string) => {
            setSortBy(val);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-300 bg-white">
        <table className="min-w-full table-fixed">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="p-3 text-left">S.N.</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Sent At</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMessages.map((msg, index) => (
              <tr
                key={msg.id}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="p-3">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className="p-3 max-w-[150px] break-words">{msg.name}</td>
                <td className="p-3 max-w-[180px] break-words">{msg.email}</td>
                <td className="p-3">{msg.phone || "-"}</td>
                <td
                  className="p-3 max-w-[300px] break-words cursor-pointer hover:underline"
                  onClick={() => setModalMessage(msg.message)}
                  title="Click to view full message"
                >
                  {msg.message.length > 100
                    ? msg.message.slice(0, 100) + "..."
                    : msg.message}
                </td>
                <td className="p-3">{formatDateTime(msg.created_at)}</td>
                <td className="p-3 text-center">
                  <button
                    disabled={updatingId === msg.id}
                    onClick={() =>
                      updateStatus(msg.id, msg.status_id === 1 ? 2 : 1)
                    }
                    className={`px-3 py-1 rounded font-semibold text-white transition ${
                      msg.status_id === 1
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {statusLabels[msg.status_id]}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    disabled={deletingId === msg.id}
                    onClick={() => setDeleteConfirmId(msg.id)}
                    className="px-3 py-1 rounded text-sm font-semibold border border-red-600 text-red-600 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Messages Found */}
      {paginatedMessages.length === 0 && (
        <p className="mt-4 text-center text-gray-600">No messages found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white border-orange-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Message Modal with vertical scroll */}
      {modalMessage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-4 text-orange-500">
              Message Details
            </h2>
            <div
              className="overflow-y-auto max-h-[60vh] text-justify whitespace-pre-wrap"
              style={{ scrollbarWidth: "thin" /* Firefox */ }}
            >
              {modalMessage}
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200 ease-in-out font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          onClick={() => setDeleteConfirmId(null)}
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200 flex flex-col space-y-4"
          >
            <h3 className="text-xl font-semibold text-orange-500">
              Confirm Delete
            </h3>
            <p>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteMessage(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                disabled={deletingId === deleteConfirmId}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {deletingId === deleteConfirmId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;