import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown, FaSearch, FaCopy, FaTrash, FaSpinner, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL: string = import.meta.env.VITE_API_URL as string;

interface Subscriber {
  id: string | number;
  email: string;
  created_at: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  options: SelectOption[];
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

function CustomSelect({ label, options, value, onChange }: CustomSelectProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel: string =
    options.find((opt: SelectOption) => opt.value === value)?.label || "Select...";

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && (
        <label className="block mb-1 font-semibold text-gray-700">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedLabel}</span>
        <FaChevronDown
          className={`ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          size={20}
        />
      </button>
      {isOpen && (
        <ul
          tabIndex={-1}
          role="listbox"
          className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {options.map((opt: SelectOption) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(opt.value);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-400 ${
                value === opt.value ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const AdminSubscribers = (): React.ReactElement => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date_desc");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
  const [filterFromDate, setFilterFromDate] = useState<string>("");
  const [filterToDate, setFilterToDate] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const ITEMS_PER_PAGE: number = 10;

  const fetchSubscribers = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      const res: Response = await fetch(`${API_BASE_URL}/subscribers`);
      const data: { data?: Subscriber[]; subscribers?: Subscriber[] } = await res.json();
      if (!res.ok) throw new Error("Failed to fetch subscribers");
      setSubscribers(Array.isArray(data.data) ? data.data : data.subscribers || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load subscribers.";
      setError(errorMessage);
      toast.error(errorMessage); // Show toast notification
      console.error("Error fetching subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id: string | number): Promise<void> => {
    setDeletingId(id);
    setSubmitting(true);
    try {
      const res: Response = await fetch(`${API_BASE_URL}/subscribers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete subscriber");
      setSubscribers((prev: Subscriber[]) => prev.filter((s: Subscriber) => s.id !== id));
      toast.success("Subscriber deleted successfully");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error deleting subscriber";
      toast.error(errorMessage);
      console.error("Error deleting subscriber:", err);
    } finally {
      setDeletingId(null);
      setSubmitting(false);
    }
  };

  const filteredSubscribers: Subscriber[] = useMemo(() => {
    const lowerSearch: string = searchTerm.toLowerCase();

    return subscribers.filter((s: Subscriber) => {
      const matchesEmail: boolean = s.email.toLowerCase().includes(lowerSearch);

      const createdDate: number = new Date(s.created_at).setHours(0, 0, 0, 0);
      const fromDate: number | null = filterFromDate
        ? new Date(filterFromDate).setHours(0, 0, 0, 0)
        : null;
      const toDate: number | null = filterToDate
        ? new Date(filterToDate).setHours(0, 0, 0, 0)
        : null;

      const matchesFrom: boolean = fromDate !== null ? createdDate >= fromDate : true;
      const matchesTo: boolean = toDate !== null ? createdDate <= toDate : true;

      return matchesEmail && matchesFrom && matchesTo;
    });
  }, [subscribers, searchTerm, filterFromDate, filterToDate]);

  const sortedSubscribers: Subscriber[] = useMemo(() => {
    const list: Subscriber[] = [...filteredSubscribers];
    switch (sortBy) {
      case "email_asc":
        list.sort((a: Subscriber, b: Subscriber) => a.email.localeCompare(b.email));
        break;
      case "email_desc":
        list.sort((a: Subscriber, b: Subscriber) => b.email.localeCompare(a.email));
        break;
      case "date_asc":
        list.sort((a: Subscriber, b: Subscriber) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "date_desc":
      default:
        list.sort((a: Subscriber, b: Subscriber) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return list;
  }, [filteredSubscribers, sortBy]);

  const totalPages: number = Math.ceil(sortedSubscribers.length / ITEMS_PER_PAGE);
  const paginatedSubscribers: Subscriber[] = sortedSubscribers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const sortOptions: SelectOption[] = [
    { value: "date_desc", label: "Newest First" },
    { value: "date_asc", label: "Oldest First" },
    { value: "email_asc", label: "Email A-Z" },
    { value: "email_desc", label: "Email Z-A" },
  ];

  // Show error message if there's an error
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setError("");
                    fetchSubscribers();
                  }}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <FaSpinner className="animate-spin mr-2 h-3 w-3" />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const copyAllEmailsToClipboard = (): void => {
    if (subscribers.length === 0) {
      toast.info("No subscribers to copy");
      return;
    }
    const emails: string = subscribers.map((s: Subscriber) => s.email).join(", ");
    navigator.clipboard
      .writeText(emails)
      .then(() => {
        toast.success("All emails copied to clipboard");
      })
      .catch((err: unknown) => {
        toast.error("Failed to copy emails");
        console.error("Error copying to clipboard:", err);
      });
  };

  const getStatusColor = (subscriber: Subscriber): string => {
    const daysSince = Math.floor((new Date().getTime() - new Date(subscriber.created_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince <= 7) return 'bg-green-600 text-white';
    if (daysSince <= 30) return 'bg-yellow-600 text-white';
    return 'bg-gray-600 text-white';
  };

  const getStatusLabel = (subscriber: Subscriber): string => {
    const daysSince = Math.floor((new Date().getTime() - new Date(subscriber.created_at).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince <= 7) return 'New';
    if (daysSince <= 30) return 'Recent';
    return 'Old';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-center font-semibold font-sans mb-6 text-orange-500">
              Subscribers Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your email subscribers. Copy all emails for bulk campaigns or delete unwanted subscribers.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={copyAllEmailsToClipboard}
              className="inline-flex items-center px-4 py-2 bg-orange-500 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm disabled:opacity-50"
              disabled={submitting || subscribers.length === 0}
            >
              <FaCopy className="mr-2" />
              Copy All Emails
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <div className="mt-4">
                <button
                  onClick={() => {
                    setError("");
                    fetchSubscribers();
                  }}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-orange-500">Search & Filter</h3>
          <p className="mt-1 text-sm text-gray-500">
            Find specific subscribers by email or date range
          </p>
        </div>
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input with Search Icon - FIXED */}
            <div className="w-full">
              <label htmlFor="searchInput" className="block mb-1 font-semibold text-gray-700">
                Search Email
              </label>
              <div className="relative">
                <FaSearch 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                  size={16}
                />
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search by email..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:opacity-50"
                  disabled={submitting}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={submitting}
                  >
                    <FaTimes size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* From Date */}
            <div>
              <label
                htmlFor="fromDate"
                className="block mb-1 font-semibold text-gray-700"
              >
                From Date
              </label>
              <input
                id="fromDate"
                type="date"
                value={filterFromDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFilterFromDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:opacity-50"
                disabled={submitting}
              />
            </div>

            {/* To Date */}
            <div>
              <label
                htmlFor="toDate"
                className="block mb-1 font-semibold text-gray-700"
              >
                To Date
              </label>
              <input
                id="toDate"
                type="date"
                value={filterToDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFilterToDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:opacity-50"
                disabled={submitting}
              />
            </div>

            {/* Sort By */}
            <div className="md:col-span-1">
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
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterFromDate("");
                setFilterToDate("");
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              disabled={submitting}
            >
              <FaTimes className="inline mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-medium">✓</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Subscribers</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {subscribers.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-sm font-medium">N</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">New (≤ 7 days)</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {subscribers.filter(s => 
                        Math.floor((new Date().getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24)) <= 7
                      ).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">R</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Recent (≤ 30 days)</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {subscribers.filter(s => {
                        const days = Math.floor((new Date().getTime() - new Date(s.created_at).getTime()) / (1000 * 60 * 60 * 24));
                        return days > 7 && days <= 30;
                      }).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-lg border border-gray-300 bg-white">
        <div className="px-6 py-4 border-b border-gray-200 bg-orange-500 text-white">
          <div className="flex items-center justify-center flex-wrap gap-4">
            <div className="text-sm text-gray-100">
              Showing {sortedSubscribers.length} of {subscribers.length} subscribers
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-orange-500 text-white">
              <tr>
                <th className="p-3 text-left text-md font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="p-3 text-left text-md font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-left text-md font-medium uppercase tracking-wider">
                  Subscribed At
                </th>
                <th className="p-3 text-center text-md font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No subscribers found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm || filterFromDate || filterToDate 
                          ? "Try adjusting your search or filter criteria." 
                          : "No subscribers yet. They will appear here once users sign up."
                        }
                      </p>
                      {(!searchTerm && !filterFromDate && !filterToDate) && (
                        <button
                          onClick={copyAllEmailsToClipboard}
                          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50"
                          disabled={subscribers.length === 0}
                        >
                          Copy All Emails
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedSubscribers.map((sub: Subscriber, index: number) => {
                  const statusColor = getStatusColor(sub);
                  const statusLabel = getStatusLabel(sub);
                  const daysSince = Math.floor((new Date().getTime() - new Date(sub.created_at).getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <tr key={sub.id} className="hover:bg-gray-100 transition">
                      <td className="p-3">
                        <div className="font-medium text-sm text-gray-900 break-words max-w-xs" title={sub.email}>
                          {sub.email}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {sub.id} • SN: {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                          {statusLabel}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {daysSince} {daysSince === 1 ? 'day' : 'days'} ago
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatDateTime(sub.created_at)}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <button
                          onClick={copyAllEmailsToClipboard}
                          className="px-3 py-1 rounded text-sm font-semibold border border-orange-500 text-orange-500 hover:bg-orange-50 transition disabled:opacity-50"
                          title="Copy all emails"
                          disabled={submitting}
                        >
                          <FaCopy className="h-4 w-4" />
                        </button>
                        <button
                          disabled={deletingId === sub.id}
                          onClick={() => setDeleteConfirmId(sub.id)}
                          className="px-3 py-1 rounded text-sm font-semibold border border-red-600 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                          title={`Delete subscriber: ${sub.email}`}
                        >
                          {deletingId === sub.id ? (
                            <FaSpinner className="animate-spin h-4 w-4" />
                          ) : (
                            <FaTrash className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || submitting}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i: number) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  disabled={submitting}
                  className={`px-3 py-1 border rounded transition ${
                    currentPage === i + 1
                      ? "bg-orange-500 text-white border-orange-500"
                      : "hover:bg-gray-100"
                  } disabled:opacity-50`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || submitting}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
        <p className="mb-1">
          <strong>Note:</strong> Use the "Copy All Emails" button to get all subscriber emails for your email campaigns. 
          Serial numbers reset based on current filters and pagination.
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          onClick={() => setDeleteConfirmId(null)}
          className="fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200 flex flex-col space-y-4"
          >
            <h3 className="text-xl font-semibold text-orange-500">
              Confirm Delete
            </h3>
            <p>
              Are you sure you want to delete this subscriber? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
                disabled={submitting}
              >
                <FaTimes className="inline mr-2" />
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteSubscriber(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                disabled={deletingId === deleteConfirmId}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {deletingId === deleteConfirmId ? (
                  <>
                    <FaSpinner className="animate-spin inline mr-2 h-4 w-4" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="inline mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;