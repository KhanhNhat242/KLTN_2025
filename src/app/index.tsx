import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function WelcomeScreen() {

  return (
    <View style={styles.wrapper}>
      <Image source={require('../../assets/mainlogo.png')} style={styles.mainlogoImg} />
      <Text style={styles.welcomeTxt}>Welcome to RideHub!</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btn}>
          <Link href='/(auth)/login' style={styles.btnTxt}>Đăng nhập</Link>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Link href={{
            pathname: '/(auth)/signup',
            params: { step: 1 }
          }} style={styles.btnTxt}>Đăng ký</Link>
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