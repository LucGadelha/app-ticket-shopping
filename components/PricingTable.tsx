import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency } from '@/utils/ticketUtils';
import { Clock, Plus } from 'lucide-react-native';

const PricingTable: React.FC = () => {
  const pricingItems = [
    {
      title: 'Primeiros 15 minutos',
      price: 0,
      icon: <Clock size={20} color="#3B82F6" />,
      description: 'Tolerância para entrada e saída do shopping',
    },
    {
      title: 'Até 12 horas',
      price: 15,
      icon: <Clock size={20} color="#3B82F6" />,
      description: 'Valor fixo para período regular',
    },
    {
      title: 'Após 12 horas',
      price: 15,
      additionalHourPrice: 5,
      icon: <Plus size={20} color="#F97316" />,
      description: 'Valor adicional por hora excedente',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabela de Valores</Text>
      
      {pricingItems.map((item, index) => (
        <View key={index} style={styles.pricingItem}>
          <View style={styles.iconContainer}>
            {item.icon}
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>
                {item.price === 0 ? (
                  <Text style={styles.freeText}>GRÁTIS</Text>
                ) : (
                  <>
                    {formatCurrency(item.price)}
                    {item.additionalHourPrice && (
                      <Text style={styles.additionalText}>
                        {' '}+ {formatCurrency(item.additionalHourPrice)}/hora adicional
                      </Text>
                    )}
                  </>
                )}
              </Text>
            </View>
            
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
      
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          * Valores sujeitos a alterações. Consulte sempre a tabela de preços disponível no estacionamento.
        </Text>
      </View>
    </View>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  pricingItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  priceContainer: {
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  freeText: {
    color: '#10B981',
    fontWeight: '600',
  },
  additionalText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#64748B',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
  },
  noteContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  noteText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
});

export default PricingTable;