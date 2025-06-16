'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaCheck, FaSpinner, FaTimes, FaArrowRight, FaTrash } from 'react-icons/fa';

interface Message {
  _id: string;
  userId: string;
  text: string;
  createdAt: string;
  isAdmin: boolean;
}

interface Ticket {
  _id: string;
  userId: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  subject: string;
  status: 'open' | 'in-progress' | 'closed';
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  open: {
    label: 'Open',
    icon: <FaCheck className="w-4 h-4" />,
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
    nextStatus: 'in-progress',
    nextLabel: 'Start Progress',
    nextIcon: <FaArrowRight className="w-4 h-4" />,
  },
  'in-progress': {
    label: 'In Progress',
    icon: <FaSpinner className="w-4 h-4 animate-spin" />,
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    nextStatus: 'closed',
    nextLabel: 'Close Ticket',
    nextIcon: <FaTimes className="w-4 h-4" />,
  },
  closed: {
    label: 'Closed',
    icon: <FaTimes className="w-4 h-4" />,
    color: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    nextStatus: 'open',
    nextLabel: 'Reopen',
    nextIcon: <FaCheck className="w-4 h-4" />,
  },
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/support/tickets', {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store' // Отключаем кэширование
      });
      if (!response.ok) throw new Error('Failed to fetch tickets');
      const data = await response.json();
      
      // Обновляем список тикетов
      setTickets(data);
      
      // Если есть выбранный тикет, обновляем его тоже
      if (selectedTicket) {
        const updatedSelectedTicket = data.find((t: Ticket) => t._id === selectedTicket._id);
        if (updatedSelectedTicket) {
          setSelectedTicket(updatedSelectedTicket);
        }
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    // Уменьшаем интервал обновления до 2 секунд
    const interval = setInterval(fetchTickets, 2000);
    return () => clearInterval(interval);
  }, [selectedTicket?._id]); // Добавляем зависимость от выбранного тикета

  // Функция для обновления тикета в списке
  const updateTicketInList = (updatedTicket: Ticket) => {
    setTickets(prevTickets => 
      prevTickets.map(ticket => 
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      )
    );
    // Если это выбранный тикет, обновляем его тоже
    if (selectedTicket?._id === updatedTicket._id) {
      setSelectedTicket(updatedTicket);
    }
  };

  // Send message
  const sendMessage = async (ticketId: string, message: string) => {
    if (!message.trim()) return;

    try {
      const response = await fetch('/api/support/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-is-admin': 'true'
        },
        body: JSON.stringify({
          ticketId,
          text: message,
          userEmail: 'admin@smartliving.com'
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to send message');
      }

      const updatedTicket = await response.json();
      updateTicketInList(updatedTicket);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  // Update ticket status
  const updateTicketStatus = async (ticketId: string, newStatus: 'open' | 'in-progress' | 'closed') => {
    setIsUpdatingStatus(ticketId);
    try {
      const response = await fetch(`/api/support/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to update status');
      }

      const updatedTicket = await response.json();
      updateTicketInList(updatedTicket);
    } catch (error) {
      console.error('Error updating ticket status:', error);
      alert('Failed to update ticket status. Please try again.');
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  // Delete ticket
  const deleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    try {
      const response = await fetch(`/api/support/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to delete ticket');
      }

      setTickets(tickets.filter(ticket => ticket._id !== ticketId));
      if (selectedTicket?._id === ticketId) {
        setSelectedTicket(null);
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('Failed to delete ticket. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <button
            onClick={() => router.refresh()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-xl font-semibold mb-4">Tickets</h2>
            <div className="space-y-2">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedTicket?._id === ticket._id
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
                      <p className="text-sm text-gray-500">{ticket.userEmail}</p>
                      <p className="text-sm text-gray-500">
                        {ticket.firstName} {ticket.lastName}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                          statusConfig[ticket.status].color
                        }`}
                      >
                        {statusConfig[ticket.status].icon}
                        {statusConfig[ticket.status].label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateTicketStatus(ticket._id, statusConfig[ticket.status].nextStatus as Ticket['status']);
                        }}
                        disabled={isUpdatingStatus === ticket._id}
                        className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                          isUpdatingStatus === ticket._id
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                        }`}
                      >
                        {isUpdatingStatus === ticket._id ? (
                          <FaSpinner className="w-3 h-3 animate-spin" />
                        ) : (
                          statusConfig[ticket.status].nextIcon
                        )}
                        {statusConfig[ticket.status].nextLabel}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
            {selectedTicket ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedTicket.subject}</h2>
                    <p className="text-sm text-gray-500">{selectedTicket.userEmail}</p>
                    <p className="text-sm text-gray-500">
                      {selectedTicket.firstName} {selectedTicket.lastName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                        statusConfig[selectedTicket.status].color
                      }`}
                    >
                      {statusConfig[selectedTicket.status].icon}
                      {statusConfig[selectedTicket.status].label}
                    </span>
                    <button
                      onClick={() => updateTicketStatus(selectedTicket._id, statusConfig[selectedTicket.status].nextStatus as Ticket['status'])}
                      disabled={isUpdatingStatus === selectedTicket._id}
                      className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                        isUpdatingStatus === selectedTicket._id
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
                      }`}
                    >
                      {isUpdatingStatus === selectedTicket._id ? (
                        <FaSpinner className="w-4 h-4 animate-spin" />
                      ) : (
                        statusConfig[selectedTicket.status].nextIcon
                      )}
                      {statusConfig[selectedTicket.status].nextLabel}
                    </button>
                    <button
                      onClick={() => deleteTicket(selectedTicket._id)}
                      className="px-3 py-1 rounded-full flex items-center gap-2 bg-red-100 text-red-800 hover:bg-red-200"
                    >
                      <FaTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {selectedTicket.messages?.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${
                        message.isAdmin ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isAdmin
                            ? 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                            : 'bg-indigo-600 text-white rounded-br-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isAdmin ? 'text-gray-500' : 'text-indigo-100'}`}>
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={() => sendMessage(selectedTicket._id, newMessage)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a ticket to view conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 