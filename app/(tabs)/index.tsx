import { useNavigation } from "@react-navigation/native";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View style={styles.wrapper}>
      <Image source={require('../../assets/images/mainlogo.png')} style={styles.mainlogoImg} />
      <Text style={styles.welcomeTxt}>Welcome to RideHub!</Text>
      <View style={styles.btnWrapper}>
        <Button title="Đăng nhập" onPress={() => navigation.navigate('Login')}/>
        <Button title="Đăng ký"/>
      </View> 
    </View>
  ); 
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
    height: 130,
    justifyContent: 'space-between',
    marginTop: 30,
    padding: 20,
  },
});
