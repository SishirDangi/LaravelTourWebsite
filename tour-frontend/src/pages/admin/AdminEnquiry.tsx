import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const statusLabels: { [key: number]: string } = {
  1: "Pending",
  2: "Checked",
};

interface Enquiry {
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
        <label className="block mb-1 font-semibold text-gray-700">{label}</label>
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

const AdminEnquiry: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
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
  const [modalEnquiry, setModalEnquiry] = useState<Enquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/enquiries`);
      if (!res.ok) throw new Error("Failed to fetch");
      const response = await res.json();
      // Check if response is successful and extract data
      if (response.success && Array.isArray(response.data)) {
        setEnquiries(response.data);
        setError("");
      } else {
        throw new Error(response.message || "Invalid response format");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load enquiries.";
      setError(message);
      toast.error(message);
      setEnquiries([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id: number, newStatusId: number) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_id: newStatusId }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const response = await res.json();
      if (response.success) {
        setEnquiries((prev) =>
          prev.map((enq) => (enq.id === id ? response.data : enq))
        );
        toast.success(response.message || "Status updated successfully");
      } else {
        throw new Error(response.message || "Failed to update status");
      }
    } catch {
      toast.error("Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteEnquiry = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete enquiry");
      const response = await res.json();
      if (response.success) {
        setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
        toast.success(response.message || "Enquiry deleted successfully");
      } else {
        throw new Error(response.message || "Failed to delete enquiry");
      }
    } catch {
      toast.error("Error deleting enquiry");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEnquiries = useMemo(() => {
    // Defensive check to ensure enquiries is an array
    if (!Array.isArray(enquiries)) {
      return [];
    }
    return enquiries.filter((enq) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        enq.name.toLowerCase().includes(searchLower) ||
        enq.email.toLowerCase().includes(searchLower) ||
        (enq.phone && enq.phone.toLowerCase().includes(searchLower));

      const enqDate = new Date(enq.created_at);
      const fromDate = dateFrom ? new Date(dateFrom) : null;
      const toDate = dateTo ? new Date(dateTo) : null;

      const afterFrom = fromDate ? enqDate >= fromDate : true;
      const beforeTo = toDate ? enqDate <= new Date(toDate.getTime() + 86400000) : true;

      const matchesStatus = statusFilter === "all" || String(enq.status_id) === statusFilter;

      return matchesSearch && afterFrom && beforeTo && matchesStatus;
    });
  }, [enquiries, searchTerm, dateFrom, dateTo, statusFilter]);

  const sortedEnquiries = useMemo(() => {
    const enqs = [...filteredEnquiries];

    switch (sortBy) {
      case "date_asc":
        enqs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "name_asc":
        enqs.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        enqs.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date_desc":
      default:
        enqs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return enqs;
  }, [filteredEnquiries, sortBy]);

  const totalPages = Math.ceil(sortedEnquiries.length / ITEMS_PER_PAGE);
  const paginatedEnquiries = sortedEnquiries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const closeModal = () => setModalEnquiry(null);

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
        Enquiries
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
            {paginatedEnquiries.map((enq, index) => (
              <tr
                key={enq.id}
                onClick={(e) => {
                  // Prevent modal from opening if clicking on buttons
                  if ((e.target as HTMLElement).closest("button")) return;
                  setModalEnquiry(enq);
                }}
                className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="p-3">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td className="p-3 max-w-[150px] break-words">{enq.name}</td>
                <td className="p-3 max-w-[180px] break-words">{enq.email}</td>
                <td className="p-3">{enq.phone || "-"}</td>
                <td className="p-3 max-w-[300px] break-words">
                  {enq.message.length > 100
                    ? enq.message.slice(0, 100) + "..."
                    : enq.message}
                </td>
                <td className="p-3">{formatDateTime(enq.created_at)}</td>
                <td className="p-3 text-center">
                  <button
                    disabled={updatingId === enq.id}
                    onClick={() =>
                      updateStatus(enq.id, enq.status_id === 1 ? 2 : 1)
                    }
                    className={`px-3 py-1 rounded font-semibold text-white transition ${
                      enq.status_id === 1
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {statusLabels[enq.status_id]}
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    disabled={deletingId === enq.id}
                    onClick={() => setDeleteConfirmId(enq.id)}
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

      {/* No Enquiries Found */}
      {paginatedEnquiries.length === 0 && (
        <p className="mt-4 text-center text-gray-600">No enquiries found.</p>
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

      {/* Enquiry Details Modal */}
      {modalEnquiry && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[50vw] max-h-[90vh] p-6 shadow-xl border border-gray-200 flex flex-col overflow-y-auto"
            style={{ scrollbarWidth: "thin" /* Firefox */ }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-500">
              Enquiry Details
            </h2>
            <div className="space-y-4 flex-1">
              <div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Name:</span>
                <p className="text-gray-600 break-words text-sm sm:text-base">{modalEnquiry.name}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Email:</span>
                <p className="text-gray-600 break-words text-sm sm:text-base">{modalEnquiry.email}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Phone:</span>
                <p className="text-gray-600 text-sm sm:text-base">{modalEnquiry.phone || "-"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Message:</span>
                <div
                  className="overflow-y-auto max-h-[40vh] sm:max-h-[50vh] text-justify whitespace-pre-wrap text-gray-600 text-sm sm:text-base"
                  style={{ scrollbarWidth: "thin" /* Firefox */ }}
                >
                  {modalEnquiry.message}
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Sent At:</span>
                <p className="text-gray-600 text-sm sm:text-base">{formatDateTime(modalEnquiry.created_at)}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700 text-sm sm:text-base">Status:</span>
                <p className="text-gray-600 text-sm sm:text-base">{statusLabels[modalEnquiry.status_id]}</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 w-full px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition duration-200 ease-in-out font-semibold text-sm sm:text-base"
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
            className="bg-white rounded-xl w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] p-6 shadow-xl border border-gray-200 flex flex-col space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-orange-500">
              Confirm Delete
            </h3>
            <p className="text-sm sm:text-base">
              Are you sure you want to delete this enquiry? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteEnquiry(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                disabled={deletingId === deleteConfirmId}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 text-sm sm:text-base"
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

export default AdminEnquiry;