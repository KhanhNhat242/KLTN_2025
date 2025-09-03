import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RootStrackParamList = {
  Signup: {
    step: number,
  }
}

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStrackParamList>>()

  return (
    <View style={styles.wrapper}>
      <Image source={require('../../assets/images/mainlogo.png')} style={styles.mainlogoImg} />
      <Text style={styles.welcomeTxt}>Welcome to RideHub!</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnTxt}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Signup', {step: 1})}>
          <Text style={styles.btnTxt}>Đăng ký</Text>
        </TouchableOpacity>
      </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainlogoImg: {
    width: 140,
    height: 40,
  },
  welcomeTxt: {
    fontSize: 30,
  },
  btnWrapper: {
    width: '100%',
    height: '25%',
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 20,
  },
  btn: {
    width: '100%',
    backgroundColor: '#1677FF',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
  },
  btnTxt: {
    color: '#fff',
    textAlign: 'center',
  },
});
