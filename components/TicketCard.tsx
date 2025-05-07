import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { formatCurrency, formatDateTime, getElapsedTime } from '@/utils/ticketUtils';
import { Ticket } from '@/context/TicketContext';
import { useTickets } from '@/context/TicketContext';
import { CreditCard, Clock, Check } from 'lucide-react-native';

interface TicketCardProps {
  ticket: Ticket;
  showPayButton?: boolean;
  animateEntry?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({ 
  ticket, 
  showPayButton = false,
  animateEntry = false
}) => {
  const { calculateFee, payTicket } = useTickets();
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<string>('');
  const [scaleAnim] = useState(new Animated.Value(animateEntry ? 0.9 : 1));
  const [opacityAnim] = useState(new Animated.Value(animateEntry ? 0 : 1));

  useEffect(() => {
    if (animateEntry) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animateEntry, scaleAnim, opacityAnim]);

  useEffect(() => {
    // Update values periodically if ticket is still pending
    if (ticket.status === 'pending') {
      const interval = setInterval(() => {
        setCurrentValue(calculateFee(ticket.entryTime));
        setElapsedTime(getElapsedTime(ticket.entryTime));
      }, 60000); // Update every minute
      
      // Initial update
      setCurrentValue(calculateFee(ticket.entryTime));
      setElapsedTime(getElapsedTime(ticket.entryTime));
      
      return () => clearInterval(interval);
    } else {
      setCurrentValue(ticket.currentValue);
      setElapsedTime(getElapsedTime(ticket.entryTime));
    }
  }, [ticket, calculateFee]);

  const handlePayment = async () => {
    if (ticket.status === 'pending') {
      await payTicket(ticket.number);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.ticketNumber}>Ticket #{ticket.number}</Text>
        <View style={[
          styles.statusBadge, 
          ticket.status === 'paid' ? styles.paidBadge : styles.pendingBadge
        ]}>
          <Text style={styles.statusText}>
            {ticket.status === 'paid' ? 'Pago' : 'Pendente'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Entrada:</Text>
          <Text style={styles.infoValue}>{formatDateTime(ticket.entryTime)}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tempo:</Text>
          <View style={styles.timeContainer}>
            <Clock size={16} color="#64748B" />
            <Text style={styles.infoValue}>{elapsedTime}</Text>
          </View>
        </View>
        
        {ticket.paymentTime && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pagamento:</Text>
            <Text style={styles.infoValue}>{formatDateTime(ticket.paymentTime)}</Text>
          </View>
        )}
        
        <View style={styles.divider} />
        
        <View style={styles.valueContainer}>
          <Text style={styles.valueLabel}>Valor:</Text>
          <Text style={[
            styles.valueAmount,
            currentValue === 0 ? styles.freeValue : null
          ]}>
            {currentValue === 0 ? 'GRÁTIS' : formatCurrency(currentValue)}
          </Text>
        </View>
      </View>
      
      {showPayButton && ticket.status === 'pending' && (
        <TouchableOpacity 
          style={styles.payButton}
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <CreditCard size={20} color="#FFFFFF" />
          <Text style={styles.payButtonText}>Realizar Pagamento</Text>
        </TouchableOpacity>
      )}
      
      {ticket.status === 'paid' && (
        <View style={styles.paidContainer}>
          <Check size={20} color="#10B981" />
          <Text style={styles.paidText}>Pagamento Confirmado</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ticketNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  paidBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '400',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  valueAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  freeValue: {
    color: '#10B981',
  },
  payButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  paidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  paidText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '500',
  },
});