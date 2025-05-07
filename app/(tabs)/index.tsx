import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useTickets } from '@/context/TicketContext';
import { TicketCard } from '@/components/TicketCard';
import { PaymentModal } from '@/components/PaymentModal';
import { Ticket, AlertTriangle } from 'lucide-react-native';

export default function TicketScreen() {
  const { addTicket, currentTicket, hasUnpaidTicket } = useTickets();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleGenerateTicket = async () => {
    if (isGenerating || hasUnpaidTicket) {
      // Shake animation for error feedback
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }
    
    setIsGenerating(true);
    
    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Generate new ticket
    await addTicket();
    
    // Stop animation
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    
    setIsGenerating(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Estacionamento Shopping</Text>
        <Text style={styles.subtitle}>Emita seu ticket de entrada</Text>
      </View>
      
      <Animated.View
        style={[
          styles.generateButtonContainer,
          {
            transform: [
              { translateX: shakeAnim },
              { scale: pulseAnim },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.generateButton,
            hasUnpaidTicket && styles.generateButtonDisabled,
          ]}
          onPress={handleGenerateTicket}
          activeOpacity={0.8}
          disabled={isGenerating || hasUnpaidTicket}
        >
          <Ticket size={32} color="#FFFFFF" />
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Gerando ticket...' : 'Emitir Ticket'}
          </Text>
        </TouchableOpacity>

        {hasUnpaidTicket && (
          <View style={styles.warningContainer}>
            <AlertTriangle size={20} color="#EF4444" />
            <Text style={styles.warningText}>
              Você possui um ticket pendente. Realize o pagamento antes de emitir um novo ticket.
            </Text>
          </View>
        )}
      </Animated.View>
      
      {currentTicket && (
        <View style={styles.ticketContainer}>
          <Text style={styles.currentTicketTitle}>Ticket Atual</Text>
          <TicketCard 
            ticket={currentTicket} 
            showPayButton={true}
            animateEntry={true}
          />
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Guarde o número do seu ticket: <Text style={styles.infoHighlight}>{currentTicket.number}</Text>
            </Text>
            <Text style={styles.infoDetails}>
              Você pode consultar e pagar seu ticket a qualquer momento na aba "Consulta".
            </Text>
          </View>
        </View>
      )}
      
      {!currentTicket && !hasUnpaidTicket && (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>
            Clique no botão acima para emitir um novo ticket de estacionamento.
          </Text>
        </View>
      )}

      {currentTicket && (
        <PaymentModal
          visible={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          ticket={currentTicket}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  generateButtonContainer: {
    marginBottom: 24,
  },
  generateButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  generateButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  warningText: {
    flex: 1,
    marginLeft: 8,
    color: '#B91C1C',
    fontSize: 14,
  },
  ticketContainer: {
    marginBottom: 24,
  },
  currentTicketTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  infoContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 8,
  },
  infoHighlight: {
    fontWeight: '700',
    color: '#3B82F6',
  },
  infoDetails: {
    fontSize: 14,
    color: '#64748B',
  },
  emptyStateContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
});