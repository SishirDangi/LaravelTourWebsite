import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaSpinner 
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TypeScript interfaces for the data structure
interface Status {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

interface LiveMessageData {
  id: number;
  message: string;
  show_until: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  status?: Status;
}

interface FormData {
  message: string;
  show_until: string;
  status_id: number;
}

const AdminLiveMessage: React.FC = () => {
  const [messages, setMessages] = useState<LiveMessageData[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusesLoading, setStatusesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ 
    message: '', 
    show_until: '', 
    status_id: 7 // Default to Active (ID 7)
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null); // Reference to the form for scrolling

  // Filter statuses to only include IDs 7 and 8 (Active and Inactive)
  const allowedStatusIds = [7, 8];
  const filteredStatuses = Array.isArray(statuses) 
    ? statuses.filter((status): status is Status => allowedStatusIds.includes(status.id))
    : [];

  // Check if statuses are loaded and available
  const hasValidStatuses = filteredStatuses.length > 0;

  useEffect(() => {
    fetchMessages();
    fetchStatuses();
  }, []);

  const fetchMessages = async (): Promise<void> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/live-messages`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status} ${response.statusText}`);
      }
      const responseData = await response.json();
      const data: LiveMessageData[] = (responseData.data || responseData).map((msg: LiveMessageData) => ({
        ...msg,
        show_until: msg.show_until.split('T')[0] // Trim to YYYY-MM-DD
      }));
      setMessages(data);
      setError(null);
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching messages:', error);
      setError(`Failed to load messages: ${error.message}`);
      toast.error('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatuses = async (): Promise<void> => {
    setStatusesLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/statuses`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      const data: Status[] = responseData.data; // Extract statuses from 'data' key
      
      if (Array.isArray(data)) {
        setStatuses(data);
        console.log('Statuses loaded:', data);
        
        // Set default status to Active (ID 7) if available and not editing/creating
        if (!isCreating && editingId === null) {
          const activeStatus = data.find((s: Status) => s.id === 7);
          if (activeStatus) {
            setFormData(prev => ({ ...prev, status_id: activeStatus.id }));
          } else {
            const firstValidStatus = data.filter(s => allowedStatusIds.includes(s.id))[0];
            if (firstValidStatus) {
              setFormData(prev => ({ ...prev, status_id: firstValidStatus.id }));
            }
          }
        }
      } else {
        console.warn('Statuses data is not an array:', data);
        setStatuses([]);
        setError('Invalid statuses data received from server');
        toast.error('Invalid statuses data received from server');
      }
    } catch (err) {
      const error = err as Error;
      console.error('Error fetching statuses:', error);
      
      setStatuses([]);
      setError(`Failed to load statuses: ${error.message}. Using fallback mode.`);
      toast.error(`Failed to load statuses: ${error.message}. Using fallback mode.`);
      
      // Set up fallback statuses
      const fallbackStatuses: Status[] = [
        { id: 7, name: 'Active' },
        { id: 8, name: 'Inactive' }
      ];
      setStatuses(fallbackStatuses);
      setFormData(prev => ({ ...prev, status_id: 7 }));
    } finally {
      setStatusesLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'status_id' ? Number(value) : value }));
    
    if (error) {
      setError(null);
    }
  };

  const startCreate = (): void => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({ 
      message: '', 
      show_until: '', 
      status_id: 7 // Default to Active
    });
    setError(null);
    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startEdit = (msg: LiveMessageData): void => {
    setIsCreating(false);
    setEditingId(msg.id);
    setFormData({ 
      message: msg.message, 
      show_until: msg.show_until.split('T')[0], // Trim to YYYY-MM-DD
      status_id: msg.status_id 
    });
    setError(null);
    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ 
      message: '', 
      show_until: '', 
      status_id: 7
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      setError('Message cannot be empty');
      toast.error('Message cannot be empty');
      return;
    }
    
    if (!formData.show_until) {
      setError('Please select a show until date');
      toast.error('Please select a show until date');
      return;
    }
    
    if (!allowedStatusIds.includes(formData.status_id)) {
      setError('Please select a valid status (Active or Inactive)');
      toast.error('Please select a valid status (Active or Inactive)');
      return;
    }

    const selectedDate = new Date(formData.show_until + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError('Show until date cannot be in the past');
      toast.error('Show until date cannot be in the past');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      let response: Response;
      const submitData = {
        message: formData.message.trim(),
        show_until: formData.show_until,
        status_id: formData.status_id
      };

      if (isCreating) {
        response = await fetch(`${import.meta.env.VITE_API_URL}/live-messages`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(submitData),
        });
      } else {
        if (!editingId) throw new Error('No message ID for update');
        response = await fetch(`${import.meta.env.VITE_API_URL}/live-messages/${editingId}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(submitData),
        });
      }

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          console.error('Failed to parse error response:', jsonError);
        }
        throw new Error(errorMessage);
      }

      await fetchMessages();
      cancelEdit();
      
      setError(null);
      toast.success('Message saved successfully!');
      
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      toast.error(error.message);
      console.error('Error saving message:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMessage = async (id: number): Promise<void> => {
    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/live-messages/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          console.error('Failed to parse error response:', jsonError);
        }
        throw new Error(errorMessage);
      }

      await fetchMessages();
      setError(null);
      toast.success('Message deleted successfully!');
      
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      toast.error(error.message);
      console.error('Error deleting message:', error);
    } finally {
      setSubmitting(false);
      setDeleteConfirmId(null);
    }
  };

  const getStatusNameById = (statusId: number): string => {
    if (!Array.isArray(statuses)) return 'Unknown';
    const status = statuses.find(s => s.id === statusId);
    return status?.name || 'Unknown';
  };

  const getOverallStatus = (msg: LiveMessageData): string => {
    const isActiveDate = new Date(msg.show_until) >= new Date();
    const statusName = getStatusNameById(msg.status_id).toLowerCase();
    
    if (!isActiveDate) return 'Expired';
    if (statusName === 'inactive') return 'Inactive';
    if (statusName === 'active') return 'Active';
    
    return 'Unknown';
  };

  const getOverallStatusColor = (overallStatus: string): string => {
    switch (overallStatus.toLowerCase()) {
      case 'active': return 'bg-green-600 text-white';
      case 'inactive': return 'bg-yellow-600 text-white';
      case 'expired': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  useEffect(() => {
    if (!loading && !submitting) {
      const interval = setInterval(() => {
        fetchMessages();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [loading, submitting]);

  if (loading && statusesLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-center font-semibold font-sans mb-6 text-orange-500">
              Live Messages Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your scrolling announcement messages for the live ticker. 
              Only messages with <span className="font-medium text-green-600">Active</span> status and valid dates will be displayed.
            </p>
            {statusesLoading && (
              <p className="mt-1 text-sm text-yellow-600">
                <FaSpinner className="animate-spin inline mr-1 h-3 w-3" />
                Loading statuses...
              </p>
            )}
          </div>
          {!isCreating && editingId === null && !submitting && (
            <button
              onClick={startCreate}
              className="inline-flex items-center px-4 py-2 bg-orange-500 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-orange-600 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition ease-in-out duration-150 shadow-sm disabled:opacity-50"
              disabled={!hasValidStatuses}
            >
              <FaPlus className="mr-2" />
              Add New Message
            </button>
          )}
        </div>
      </div>

      {!hasValidStatuses && !statusesLoading && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Statuses Not Available</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Unable to load required statuses (Active/Inactive). Using fallback mode.</p>
                <p className="mt-1">You can still manage messages but status selection is limited.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && !statusesLoading && (
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
                    setError(null);
                    fetchMessages();
                    fetchStatuses();
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

      {(isCreating || editingId !== null) && (
        <div ref={formRef} className="mb-8 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-orange-500">
              {isCreating ? 'Create New Message' : `Edit Message #${editingId}`}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isCreating 
                ? 'Create a new announcement message for the live ticker' 
                : 'Update the selected message'
              }
            </p>
          </div>
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    error && !formData.message.trim() ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your announcement message (max 500 characters)"
                  required
                  maxLength={500}
                  disabled={submitting}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.message.length}/500 characters
                </p>
                {error && !formData.message.trim() && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div>
                <label htmlFor="show_until" className="block text-sm font-medium text-gray-700 mb-2">
                  Show Until <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="show_until"
                  name="show_until"
                  value={formData.show_until}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    error && !formData.show_until ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  disabled={submitting}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Messages will stop showing after this date. Must be today or later.
                </p>
                {error && !formData.show_until && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div>
                <label htmlFor="status_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="status_id"
                  name="status_id"
                  value={formData.status_id}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                    error && !allowedStatusIds.includes(formData.status_id) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                  disabled={submitting || !hasValidStatuses}
                >
                  <option value={0}>Select Status</option>
                  {filteredStatuses.map((status: Status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  Only <strong>Active</strong> messages with valid dates will appear in the live ticker.
                </p>
                {filteredStatuses.length === 0 && !statusesLoading && (
                  <p className="mt-1 text-sm text-red-600">
                    No available statuses. Please contact administrator.
                  </p>
                )}
                {error && !allowedStatusIds.includes(formData.status_id) && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-white border border-gray-400 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50"
                  disabled={submitting}
                >
                  <FaTimes className="inline mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !hasValidStatuses || !formData.message.trim() || !formData.show_until}
                  className="px-4 py-2 bg-orange-500 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin inline mr-2 h-4 w-4" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="inline mr-2" />
                      {isCreating ? 'Create Message' : 'Update Message'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Messages</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {messages.filter(msg => getOverallStatus(msg) === 'Active').length}
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
                    <span className="text-yellow-600 text-sm font-medium">!</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Inactive Messages</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {messages.filter(msg => getOverallStatus(msg) === 'Inactive').length}
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
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm font-medium">✕</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Expired Messages</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {messages.filter(msg => getOverallStatus(msg) === 'Expired').length}
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
              Showing {messages.length} messages
            </div>
          </div>
        </div>

        {!loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="p-3 text-left text-md font-medium uppercase tracking-wider">
                    Message
                  </th>
                  <th className="p-3 text-left text-md font-medium uppercase tracking-wider">
                    Show Until
                  </th>
                  <th className="p-3 text-left text-md font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-3 text-center text-md font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((msg: LiveMessageData) => {
                  const overallStatus = getOverallStatus(msg);
                  const statusColor = getOverallStatusColor(overallStatus);
                  const isActiveDate = new Date(msg.show_until) >= new Date();
                  
                  return (
                    <tr key={msg.id} className="hover:bg-gray-100 transition">
                      <td className="p-3">
                        <div className="font-medium text-sm text-gray-900 truncate max-w-xs" title={msg.message}>
                          {msg.message.length > 50 ? `${msg.message.substring(0, 50)}...` : msg.message}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {msg.id} • Created: {new Date(msg.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            isActiveDate ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {isActiveDate ? 'Valid Till' : 'Expired'}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900 mt-1">{msg.show_until}</div>
                        {!isActiveDate && (
                          <div className="text-xs text-red-600 mt-1">
                            Expired {Math.floor((new Date().getTime() - new Date(msg.show_until).getTime()) / (1000 * 60 * 60 * 24))} days ago
                          </div>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                          {overallStatus}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {getStatusNameById(msg.status_id)} • Updated: {new Date(msg.updated_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <button
                          onClick={() => startEdit(msg)}
                          className="px-3 py-1 rounded text-sm font-semibold border border-orange-500 text-orange-500 hover:bg-orange-50 transition disabled:opacity-50"
                          title={`Edit message: ${msg.message}`}
                          disabled={submitting}
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(msg.id)}
                          className="px-3 py-1 rounded text-sm font-semibold border border-red-600 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
                          title={`Delete message: ${msg.message}`}
                          disabled={submitting}
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {messages.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Get started by creating your first live message.
                        </p>
                        {!isCreating && editingId === null && hasValidStatuses && (
                          <button
                            onClick={startCreate}
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors shadow-sm"
                          >
                            Create first message
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {loading && !statusesLoading && (
          <div className="p-3 text-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading messages...</p>
          </div>
        )}

        {!loading && messages.length === 0 && !isCreating && editingId === null && (
          <div className="p-3 text-center bg-gray-50 rounded-b-lg">
            <div className="flex flex-col items-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first live message.
              </p>
              {hasValidStatuses && (
                <button
                  onClick={startCreate}
                  className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors shadow-sm"
                >
                  Create first message
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
        <p className="mb-1">
          <strong>Note:</strong> Only messages with <span className="font-medium text-green-600">Active</span> status and valid{' '}
          <span className="font-medium">Show Until</span> dates will appear in the live ticker.
        </p>
        <p>
          Messages refresh every <span className="font-medium">60 seconds</span> automatically.
        </p>
        {filteredStatuses.length > 0 && (
          <p className="mt-1 text-xs">
            Available statuses: {filteredStatuses.map(s => s.name).join(', ')}
          </p>
        )}
      </div>

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
              Are you sure you want to delete this message? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={async () => await deleteMessage(deleteConfirmId)}
                disabled={submitting}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 text-sm sm:text-base"
              >
                {submitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLiveMessage;