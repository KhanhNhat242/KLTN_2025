import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

interface Props {
    step?: number
    fwstep?: number
}

const Step = ({ step, fwstep }: Props) => {

    if (step === 1 || step === 2 || step === 3 || step === 4) {
        return (
            <View style={styles.wrapper}>
                <Image style={styles.img} source={require('../../../assets/images/bluestep.png')} />
                <Image style={styles.img} source={step === 2 || step === 3 || step === 4 ? require('../../../assets/images/bluestep.png') : require('../../../assets/images/graystep.png')} />
                <Image style={styles.img} source={step === 3 || step === 4 ? require('../../../assets/images/bluestep.png') : require('../../../assets/images/graystep.png')} />
                <Image style={styles.img} source={step === 4 ? require('../../../assets/images/bluestep.png') : require('../../../assets/images/graystep.png')} />
            </View>
        )
    }
    else if (fwstep === 1 || fwstep === 2 || fwstep === 3) {
        return (
            <View style={styles.wrapper}>
                <Image style={styles.fwimg} source={require('../../../assets/images/bluestep.png')} />
                <Image style={styles.fwimg} source={fwstep === 2 || fwstep === 3 ? require('../../../assets/images/bluestep.png') : require('../../../assets/images/graystep.png')} />
                <Image style={styles.fwimg} source={fwstep === 3 ? require('../../../assets/images/bluestep.png') : require('../../../assets/images/graystep.png')} />
            </View>
        )
    }
}

export default Step

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    img: {
        width: '24%',
        height: 5,
    },
    fwimg: {
        width: '33%',
        height: 5,
    },
})