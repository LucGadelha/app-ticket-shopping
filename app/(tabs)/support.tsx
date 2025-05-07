import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { getWhatsAppSupportUrl } from '@/utils/ticketUtils';
import { MessageSquare, Phone, Mail, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function SupportScreen() {
  const [ticketNumber, setTicketNumber] = useState('');
  
  const handleWhatsAppSupport = () => {
    const supportUrl = getWhatsAppSupportUrl(ticketNumber.trim() || undefined);
    Linking.openURL(supportUrl);
  };
  
  const handlePhoneCall = () => {
    Linking.openURL('tel:+551199999999');
  };
  
  const handleEmail = () => {
    Linking.openURL('mailto:suporte@parkingshopping.com?subject=Suporte%20Estacionamento');
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Suporte</Text>
        <Text style={styles.subtitle}>Como podemos ajudar?</Text>
      </View>
      
      <View style={styles.whatsappCard}>
        <View style={styles.whatsappIconContainer}>
          <MessageSquare size={24} color="#25D366" />
        </View>
        <View style={styles.whatsappContent}>
          <Text style={styles.whatsappTitle}>Suporte via WhatsApp</Text>
          <Text style={styles.whatsappDescription}>
            Nosso atendimento está disponível das 8h às 22h para ajudar com qualquer problema.
          </Text>
          
          <View style={styles.ticketInputContainer}>
            <TextInput
              style={styles.ticketInput}
              placeholder="Número do ticket (opcional)"
              value={ticketNumber}
              onChangeText={setTicketNumber}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>
          
          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={handleWhatsAppSupport}
            activeOpacity={0.8}
          >
            <Text style={styles.whatsappButtonText}>Iniciar Conversa</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.contactOptionsContainer}>
        <Text style={styles.contactOptionsTitle}>Outras formas de contato</Text>
        
        <TouchableOpacity
          style={styles.contactOption}
          onPress={handlePhoneCall}
          activeOpacity={0.7}
        >
          <View style={[styles.contactIconContainer, styles.phoneIconContainer]}>
            <Phone size={20} color="#3B82F6" />
          </View>
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactTitle}>Telefone</Text>
            <Text style={styles.contactValue}>(11) 9999-9999</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.contactOption}
          onPress={handleEmail}
          activeOpacity={0.7}
        >
          <View style={[styles.contactIconContainer, styles.emailIconContainer]}>
            <Mail size={20} color="#8B5CF6" />
          </View>
          <View style={styles.contactTextContainer}>
            <Text style={styles.contactTitle}>E-mail</Text>
            <Text style={styles.contactValue}>suporte@parkingshopping.com</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.faqContainer}>
        <Text style={styles.faqTitle}>Perguntas Frequentes</Text>
        
        <View style={styles.faqItem}>
          <View style={styles.faqHeader}>
            <HelpCircle size={18} color="#64748B" />
            <Text style={styles.faqQuestion}>Como recuperar um ticket perdido?</Text>
          </View>
          <Text style={styles.faqAnswer}>
            Em caso de perda do ticket, procure o balcão de atendimento do estacionamento com o documento do veículo. Será cobrada uma taxa administrativa.
          </Text>
        </View>
        
        <View style={styles.faqItem}>
          <View style={styles.faqHeader}>
            <HelpCircle size={18} color="#64748B" />
            <Text style={styles.faqQuestion}>O que fazer em caso de danos ao veículo?</Text>
          </View>
          <Text style={styles.faqAnswer}>
            Antes de sair do estacionamento, informe ao supervisor e preencha um formulário de ocorrência no balcão de atendimento.
          </Text>
        </View>
        
        <View style={styles.faqItem}>
          <View style={styles.faqHeader}>
            <HelpCircle size={18} color="#64748B" />
            <Text style={styles.faqQuestion}>Como validar meu ticket com compras?</Text>
          </View>
          <Text style={styles.faqAnswer}>
            Apresente suas notas fiscais no balcão de atendimento ao cliente do shopping para receber a validação conforme as regras promocionais vigentes.
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
  whatsappCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  whatsappIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  whatsappContent: {
    flex: 1,
  },
  whatsappTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  whatsappDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  ticketInputContainer: {
    marginBottom: 16,
  },
  ticketInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  contactOptionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  contactOptionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  phoneIconContainer: {
    backgroundColor: '#EFF6FF',
  },
  emailIconContainer: {
    backgroundColor: '#F5F3FF',
  },
  contactTextContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  contactValue: {
    fontSize: 14,
    color: '#64748B',
  },
  faqContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginLeft: 8,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#64748B',
    paddingLeft: 26,
    lineHeight: 20,
  },
});