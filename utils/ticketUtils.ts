import { Ticket } from '@/context/TicketContext';

// Generate a random 8-digit ticket number
export const generateTicketNumber = (): string => {
  const min = 10000000; // 8 digits (starting from 10000000)
  const max = 99999999; // 8 digits (ending at 99999999)
  return Math.floor(min + Math.random() * (max - min)).toString();
};

// Format currency to BRL
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Format date to readable format
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate elapsed time and return formatted string
export const getElapsedTime = (startTime: string): string => {
  const start = new Date(startTime).getTime();
  const now = new Date().getTime();
  
  const diffMs = now - start;
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs === 0) {
    return `${diffMins} minutos`;
  }
  
  return `${diffHrs} horas e ${diffMins} minutos`;
};

// Get remaining free time in minutes (if under 15 minutes)
export const getRemainingFreeTime = (startTime: string): number => {
  const start = new Date(startTime).getTime();
  const now = new Date().getTime();
  
  const diffMs = now - start;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 15) {
    return 15 - diffMins;
  }
  
  return 0;
};

// Get WhatsApp support URL
export const getWhatsAppSupportUrl = (ticketNumber?: string): string => {
  const phoneNumber = '5511999999999'; // Replace with actual support number
  const message = ticketNumber 
    ? `Olá, preciso de ajuda com o ticket ${ticketNumber}.`
    : 'Olá, preciso de ajuda com o estacionamento.';
    
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};