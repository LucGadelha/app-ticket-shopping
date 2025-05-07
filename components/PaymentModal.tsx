import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useTickets, Ticket } from '@/context/TicketContext';
import { formatCurrency } from '@/utils/ticketUtils';
import { CreditCard, Smartphone, Bank, X as Close, CheckCircle2 } from 'lucide-react-native';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  ticket: Ticket;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  ticket,
}) => {
  const { payTicket } = useTickets();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'credit' | 'debit' | null>(null);
  const slideAnim = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handlePayment = async (method: 'pix' | 'credit' | 'debit') => {
    setSelectedMethod(method);
    setProcessing(true);

    // Simulate payment processing
    setTimeout(async () => {
      await payTicket(ticket.number, method);
      setProcessing(false);
      setSuccess(true);
      
      // Close modal after showing success
      setTimeout(() => {
        setSuccess(false);
        setSelectedMethod(null);
        onClose();
      }, 2000);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'pix',
      title: 'PIX',
      icon: <Smartphone size={24} color="#3B82F6" />,
      description: 'Pagamento instantâneo',
    },
    {
      id: 'credit',
      title: 'Cartão de Crédito',
      icon: <CreditCard size={24} color="#3B82F6" />,
      description: 'Visa, Mastercard, Elo',
    },
    {
      id: 'debit',
      title: 'Cartão de Débito',
      icon: <Bank size={24} color="#3B82F6" />,
      description: 'Débito automático',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Pagamento</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              disabled={processing}
            >
              <Close size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Valor a pagar:</Text>
            <Text style={styles.amount}>{formatCurrency(ticket.currentValue)}</Text>
          </View>

          {!processing && !success && (
            <View style={styles.methodsContainer}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={styles.methodButton}
                  onPress={() => handlePayment(method.id as 'pix' | 'credit' | 'debit')}
                >
                  <View style={styles.methodIcon}>
                    {method.icon}
                  </View>
                  <View style={styles.methodInfo}>
                    <Text style={styles.methodTitle}>{method.title}</Text>
                    <Text style={styles.methodDescription}>{method.description}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {processing && (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>
                Processando pagamento via {selectedMethod === 'pix' ? 'PIX' : `cartão de ${selectedMethod}`}...
              </Text>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          )}

          {success && (
            <View style={styles.successContainer}>
              <CheckCircle2 size={48} color="#10B981" />
              <Text style={styles.successText}>Pagamento realizado com sucesso!</Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    padding: 8,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  methodsContainer: {
    gap: 16,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  methodIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  processingContainer: {
    alignItems: 'center',
    padding: 24,
  },
  processingText: {
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 24,
    textAlign: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
    opacity: 0.3,
  },
  dot1: {
    opacity: 0.9,
  },
  dot2: {
    opacity: 0.6,
  },
  dot3: {
    opacity: 0.3,
  },
  successContainer: {
    alignItems: 'center',
    padding: 24,
  },
  successText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 16,
    textAlign: 'center',
  },
});