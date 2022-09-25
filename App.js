import { StatusBar } from 'expo-status-bar';
import { Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Switch } from 'react-native';
import React, { useRef, useState } from 'react'


export default function App() {
  const [isResult, setIsResult] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(''); //using a hook
  const [secondValue, setsecondValue] = useState(''); //using a hook
  let inputHeightRef = useRef();
  let inputWeightRef = useRef();
 
  const handleReset = () => {
    inputWeightRef.current.value = "";
    setsecondValue('');
    inputHeightRef.current.value = "";
    setValue('');
    setIsResult(0);
  }
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const handleCalculation = () => {

    if (isEnabled === true) {
      const getWholeInches = Math.trunc(value) * 12;
      const getDeciInches = value.toString().split('.')[1];
      const fullInches = getWholeInches + Number(getDeciInches);
      const BMIImp = ((secondValue * 703) / (fullInches * fullInches)).toFixed(1);
      setIsResult(BMIImp);
    }
    else {
      const BMI = (secondValue / ((value * value) / 10000)).toFixed(1);
      setIsResult(BMI);
    }
}

return (
  <View style={styles.container}>
    <Text style={styles.bmiResult}>{isResult}</Text>
    <Switch
      style={styles.switchFormat}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#000" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
    <Text style={styles.switchText}>Change to Metric/Imperial</Text>
    <TextInput style={styles.edit1} clearTextOnFocus='true' ref={inputHeightRef} placeholder={!isEnabled ? 'Height (cm)' : 'Height (feet)'} value={value} onChangeText={text => setValue(text)}></TextInput>
    <TextInput style={styles.edit2} clearTextOnFocus='true' ref={inputWeightRef} placeholder={!isEnabled ? 'Weight (kg)' : 'Weight (lbs)'} value={secondValue} onChangeText={text => setsecondValue(text)}></TextInput>
    <Button title='clear' onPress={handleReset}></Button>
    <TouchableOpacity style={styles.button} onPress={handleCalculation}>
      <Text style={styles.textinViewController2}>Calculate BMI</Text>
    </TouchableOpacity>
    <Text style={styles.categoryText}>BMI Categories</Text>
    <Text>Underweight = &#60;18.5</Text>
    <Text>Normal weight = 18.5 - 24.9</Text>
    <Text>Overweight = 25 - 29.9</Text>
    <Text>Obesity = BMI of 30 or greater</Text>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  edit1: {
    borderWidth: 3,
    borderColor: 'purple',
    width: '50%',
    fontSize: 20,
    color: 'black',
    marginBottom: 20
  },
  edit2: {
    borderWidth: 3,
    borderColor: 'purple',
    width: '50%',
    fontSize: 20,
    color: 'black'
  },
  textinViewController: {
    fontSize: 10,
    borderWidth: 3,
    borderColor: 'green',
    color: 'blue'
  },
  textinViewController2: {
    fontSize: 20,
    color: 'black'
  },
  somePlaceholderStyle: {
    fontSize: 5
  },
  button: {
    alignItems: "center",
    backgroundColor: "#40c4ff",
    padding: 10,
    marginTop: 20
  },
  switchFormat: {
    marginBottom: 5,
    alignItems: 'flex-start'
  },
  bmiResult: {
    fontSize: 50,
    marginBottom: 60,
    fontWeight: "700"
  },
  helpText: {
    fontSize: 25,
    fontWeight: '100'
  },
  switchText: {
    marginBottom: 20
  },
  categoryText: {
    marginTop: 20,
    marginBottom: 5,
    fontWeight: '600',
    fontSize: 16
  }
});
