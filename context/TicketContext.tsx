import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateTicketNumber } from '@/utils/ticketUtils';

export interface Ticket {
  id: string;
  number: string;
  entryTime: string;
  paymentTime: string | null;
  status: 'pending' | 'paid';
  currentValue: number;
  paymentMethod?: 'pix' | 'credit' | 'debit' | null;
}

interface TicketContextType {
  tickets: Ticket[];
  currentTicket: Ticket | null;
  addTicket: () => Promise<Ticket | null>;
  getTicket: (number: string) => Ticket | undefined;
  payTicket: (number: string, paymentMethod: 'pix' | 'credit' | 'debit') => Promise<Ticket | undefined>;
  calculateFee: (entryTime: string) => number;
  hasUnpaidTicket: boolean;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentTicket, setCurrentTicket] = useState<Ticket | null>(null);
  const hasUnpaidTicket = tickets.some(ticket => ticket.status === 'pending');

  // Load tickets from storage on initial load
  useEffect(() => {
    const loadTickets = async () => {
      try {
        const storedTickets = await AsyncStorage.getItem('tickets');
        if (storedTickets) {
          const parsedTickets = JSON.parse(storedTickets);
          setTickets(parsedTickets);
          
          // Set current ticket if there's a pending one
          const pendingTicket = parsedTickets.find((t: Ticket) => t.status === 'pending');
          setCurrentTicket(pendingTicket || null);
        }
      } catch (error) {
        console.error('Failed to load tickets:', error);
      }
    };

    loadTickets();
  }, []);

  // Save tickets to storage whenever they change
  useEffect(() => {
    const saveTickets = async () => {
      try {
        await AsyncStorage.setItem('tickets', JSON.stringify(tickets));
      } catch (error) {
        console.error('Failed to save tickets:', error);
      }
    };

    if (tickets.length > 0) {
      saveTickets();
    }
  }, [tickets]);

  const calculateFee = (entryTime: string): number => {
    const entryDate = new Date(entryTime);
    const currentDate = new Date();
    
    const minutesElapsed = (currentDate.getTime() - entryDate.getTime()) / 60000;
    
    if (minutesElapsed <= 15) {
      return 0;
    }
    
    const hoursElapsed = minutesElapsed / 60;
    
    if (hoursElapsed <= 12) {
      return 15;
    }
    
    const extraHours = Math.ceil(hoursElapsed - 12);
    return 15 + (extraHours * 5);
  };

  const addTicket = async (): Promise<Ticket | null> => {
    if (hasUnpaidTicket) {
      return null;
    }

    const newTicket: Ticket = {
      id: Date.now().toString(),
      number: generateTicketNumber(),
      entryTime: new Date().toISOString(),
      paymentTime: null,
      status: 'pending',
      currentValue: 0,
    };

    setTickets(prevTickets => [...prevTickets, newTicket]);
    setCurrentTicket(newTicket);
    return newTicket;
  };

  const getTicket = (number: string): Ticket | undefined => {
    return tickets.find((ticket) => ticket.number === number);
  };

  const payTicket = async (number: string, paymentMethod: 'pix' | 'credit' | 'debit'): Promise<Ticket | undefined> => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.number === number && ticket.status === 'pending') {
        const updatedTicket = {
          ...ticket,
          paymentTime: new Date().toISOString(),
          status: 'paid',
          currentValue: calculateFee(ticket.entryTime),
          paymentMethod,
        };
        setCurrentTicket(null);
        return updatedTicket;
      }
      return ticket;
    });

    setTickets(updatedTickets);
    return updatedTickets.find((ticket) => ticket.number === number);
  };

  const value = {
    tickets,
    currentTicket,
    addTicket,
    getTicket,
    payTicket,
    calculateFee,
    hasUnpaidTicket,
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};