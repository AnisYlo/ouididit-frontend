import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import RedButton from './redButton';
import { BACKEND_IP } from "@env";


export default function PaymentModal(props) {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const sendTransaction = ()=>{
    if(!amount || !cardNumber || !expiryDate || !cvv || !cardHolderName){
      Alert.alert('All fields are required.')
      return
    }

    const body = {
      amount : amount,
      userToken : props.userToken,
    }
    fetch(`${BACKEND_IP}/transactions/${props.activityId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          props.setTotal(Number(props.total)+Number(amount))
          props.onClose()
          Alert.alert('Payment made successfully.')
        }
    })
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Card Payment</Text>

          <Input
            style={styles.input}
            placeholder="Amount of Contibution"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            uniti='€'
            require={true}
            maxLength={4}
          />

          <Input
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
            require={true}
            maxLength={16}
          />

          <View style={styles.viewInline}>
            <Input
              style={styles.inlineConponent}
              placeholder="MM/YY"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={setExpiryDate}
              require={true}
              maxLength={7}
            />

            <Input
              style={styles.inlineConponent}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry={true}
              value={cvv}
              onChangeText={setCvv}
              require={true}
              maxLength={3}
            />
          </View>

          <Input
            style={styles.input}
            placeholder="Cardholder Name"
            value={cardHolderName}
            onChangeText={setCardHolderName}
            require={true}
            maxLength={50}
          />
          <View style={styles.viewInline}>  
          <RedButton
              style={styles.inlineConponent}
              buttonText='Cancel'
              onPress={props.onClose}
              title='Cancel'
          />
          <RedButton
          style={styles.inlineConponent}
          buttonText='Submit'
          onPress={sendTransaction}
          title='Submit'
          />
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'ClashGrotesk-Semibold',
  },
  input: {
    height: 40,
    marginBottom: 15,
  },
  viewInline:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  inlineConponent:{
    width:'47%',
    marginBottom: 15,
  }
});