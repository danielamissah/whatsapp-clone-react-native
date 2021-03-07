import { StyleSheet } from 'react-native';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        padding: 10

    },
    messageBox: {
        borderRadius: 5,
        padding: 10

    },

    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 2


    },
    message: {
    },

    time: {
        alignSelf: "flex-end",
        color: 'grey'
    }
});

export default styles;