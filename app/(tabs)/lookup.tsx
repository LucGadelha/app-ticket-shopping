import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { useTickets } from '@/context/TicketContext';
import { TicketCard } from '@/components/TicketCard';
import { Search, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function LookupScreen() {
  const { getTicket } = useTickets();
  const [ticketNumber, setTicketNumber] = useState('');
  const [foundTicket, setFoundTicket] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = () => {
    Keyboard.dismiss();
    
    if (!ticketNumber.trim() || ticketNumber.length !== 8) {
      setError('Por favor, insira um número de ticket válido com 8 dígitos.');
      setFoundTicket(null);
      return;
    }
    
    const ticket = getTicket(ticketNumber);
    
    if (ticket) {
      setFoundTicket(ticket);
      setError(null);
    } else {
      setError('Ticket não encontrado. Verifique o número e tente novamente.');
      setFoundTicket(null);
    }
  };
  
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.searchContainer}>
        <Text style={styles.title}>Consulta de Ticket</Text>
        <Text style={styles.subtitle}>Digite o número do seu ticket</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Número do ticket (8 dígitos)"
            value={ticketNumber}
            onChangeText={setTicketNumber}
            keyboardType="numeric"
            maxLength={8}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.8}
          >
            <Search size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {error && (
          <View style={styles.errorContainer}>
            <AlertTriangle size={16} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
      
      {foundTicket && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Ticket Encontrado</Text>
          <TicketCard 
            ticket={foundTicket} 
            showPayButton={foundTicket.status === 'pending'}
          />
        </View>
      )}
      
      {!foundTicket && !error && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Como consultar seu ticket:</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1</Text>
            <Text style={styles.instructionText}>
              Digite o número de 8 dígitos do seu ticket no campo acima
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2</Text>
            <Text style={styles.instructionText}>
              Clique no botão de pesquisa para consultar o status e valor
            </Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3</Text>
            <Text style={styles.instructionText}>
              Caso necessário, realize o pagamento diretamente pelo aplicativo
            </Text>
          </View>
        </View>
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
  searchContainer: {
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
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    marginLeft: 8,
  },
  resultContainer: {
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  instructionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  instructionNumber: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
    marginRight: 12,
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    lineHeight: 22,
  },
});