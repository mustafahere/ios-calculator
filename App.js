import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const COLORS = {
  gray: '#A5A5A5',
  black: '#333333',
  orange: '#F1A33B',
};

const Button = ({backgroundColor, textColor, label, width, onChangeInput}) => {
  return (
    <TouchableOpacity
      onPress={() => onChangeInput(label)}
      style={{
        width,
        alignItems: 'center',
      }}>
      <View style={[styles.button, {backgroundColor}]}>
        <Text style={[styles.buttonText, {color: textColor}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
const ZeroButton = ({backgroundColor, textColor, onChangeInput}) => {
  return (
    <TouchableOpacity
      onPress={() => onChangeInput('0')}
      style={{
        width: '47%',
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 30,
        borderRadius: 50,
        marginLeft: 10,
      }}>
      <Text style={[styles.buttonText, {color: textColor}]}>0</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [input, setInput] = useState('0');
  const [operation, setOperation] = useState({
    key: null,
    num1: null,
    num2: null,
  });

  const onChangeInput = key => {
    if (key === 'AC') {
      setInput('0');
      setOperation({
        key: null,
        num1: null,
        num2: null,
      });
    } else if (key === '%' && input !== '0') {
      setInput(prv => (prv / 100).toString());
    } else if (key === '.' && input !== '0') {
      setInput(prv => prv.concat('.'));
    } else if (key === '+/-') {
      setInput('-');
    } else if ((Number(key) >= 1 && Number(key) <= 9) || key === '0') {
      setInput(prv => {
        const num = prv === '0' ? key : prv.concat(key);

        setOperation(prv => {
          const obj = {...prv};
          if (obj.num1) {
            obj.num2 = Number(num);
          }
          return obj;
        });

        return num;
      });
    } else if (['×', '÷', '+', '-', '%'].includes(key) && input !== '0') {
      setOperation({
        key,
        num1: Number(input),
        num2: null,
      });
      setInput('');
    } else if (key === '=') {
      let opKey = operation.key;
      if (opKey === '×') opKey = '*';
      if (opKey === '÷') opKey = '/';
      setInput(
        eval(`${operation.num1} ${opKey} ${operation.num2}`)?.toString(),
      );
      setOperation({
        key: null,
        num1: null,
        num2: null,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.childContainer}>
        <View style={styles.section1}>
          <Text style={styles.inputText}>
            {input?.length > 10 ? Number(input)?.toFixed(8) : input}
          </Text>
        </View>
        <View style={styles.section2}>
          <View style={styles.row}>
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.gray}
              textColor="black"
              label="AC"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.gray}
              textColor="black"
              label="+/-"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.gray}
              textColor="black"
              label="%"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={operation.key === '÷' ? 'white' : COLORS.orange}
              textColor={operation.key === '÷' ? COLORS.orange : 'white'}
              label="÷"
              width={'25%'}
            />
          </View>
          <View style={styles.row}>
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="7"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="8"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="9"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={operation.key === '×' ? 'white' : COLORS.orange}
              textColor={operation.key === '×' ? COLORS.orange : 'white'}
              label="×"
              width={'25%'}
            />
          </View>
          <View style={styles.row}>
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="4"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="5"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="6"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={operation.key === '-' ? 'white' : COLORS.orange}
              textColor={operation.key === '-' ? COLORS.orange : 'white'}
              label="-"
              width={'25%'}
            />
          </View>
          <View style={styles.row}>
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="1"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="2"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="3"
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={operation.key === '+' ? 'white' : COLORS.orange}
              textColor={operation.key === '+' ? COLORS.orange : 'white'}
              label="+"
              width={'25%'}
            />
          </View>
          <View style={styles.row}>
            <ZeroButton
              backgroundColor={COLORS.black}
              textColor="white"
              onChangeInput={onChangeInput}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.black}
              textColor="white"
              label="."
              width={'25%'}
            />
            <Button
              onChangeInput={onChangeInput}
              backgroundColor={COLORS.orange}
              textColor="white"
              label="="
              width={'25%'}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  childContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  section1: {
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  inputText: {
    color: 'white',
    paddingBottom: 20,
    paddingRight: 30,
    fontSize: 50,
  },

  section2: {
    height: '60%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default App;
