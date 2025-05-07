import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PricingTable from '@/components/PricingTable';
import { CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function PricingScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Tabela de Valores</Text>
        <Text style={styles.subtitle}>Conheça nossa política de preços</Text>
      </View>
      
      <PricingTable />
      
      <View style={styles.cardContainer}>
        <View style={styles.infoCard}>
          <View style={styles.cardIconContainer}>
            <CreditCard size={24} color="#3B82F6" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Formas de Pagamento</Text>
            <Text style={styles.cardText}>
              Aceitamos cartões de crédito, débito e PIX diretamente pelo aplicativo. 
              Pagamentos em dinheiro podem ser realizados no caixa do estacionamento.
            </Text>
          </View>
        </View>
        
        <View style={styles.infoCard}>
          <View style={styles.cardIconContainer}>
            <AlertCircle size={24} color="#F97316" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Informações Importantes</Text>
            <Text style={styles.cardText}>
              Em caso de perda do ticket, será cobrado o valor correspondente a um dia completo de estacionamento.
              Consulte a administração do shopping para casos especiais.
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.infoTitle}>Vantagens para Clientes</Text>
        
        <View style={styles.bulletItem}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Clientes do cinema têm direito a 30 minutos adicionais gratuitos mediante apresentação do ingresso.
          </Text>
        </View>
        
        <View style={styles.bulletItem}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Compras acima de R$ 200,00 nas lojas do shopping dão direito a 1 hora gratuita de estacionamento.
          </Text>
        </View>
        
        <View style={styles.bulletItem}>
          <View style={styles.bulletPoint} />
          <Text style={styles.bulletText}>
            Restaurantes participantes oferecem validação do ticket de estacionamento.
          </Text>
        </View>
      </View>
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
  cardContainer: {
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  additionalInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginTop: 6,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 20,
  },
});