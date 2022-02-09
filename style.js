import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    home_text: {
        color: "#323",
    },

    order_sel: {
      flex: 0.25,
      width: 350,
      alignItems: 'center',
      marginBottom: 20,
    },

    order_sel_text: {
      alignSelf: 'flex-start',
      fontSize: 20,
    },

    order_sel_place_options: {
      flex: 0.7,
      width: 350,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }, 

    order_sel_single_place: {
      flex: 0.3,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 4,
    },

    order_sel_input: {
      flex: 0.25,
      width: 350,
      flexDirection: 'row',
      marginBottom: 10,

    }, 

    order_sel_input_box: {
      flex: 1,
      marginLeft: 10,
    }, 

    single_input: {
      borderRadius: 3,
      borderWidth: 1,
      height: 30,
      marginBottom: 10,
      fontSize: 15,
      textAlign: 'center',
    }, 

    order_sel_times: {
      flex: 0.7,
      width: 350,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }, 

    order_sel_times_text: {
      fontSize: 15,
    },

    single_input_times: {
      flex: 0.3,
      borderRadius: 3,
      borderWidth: 1,
      height: 30,
      marginBottom: 10,
      fontSize: 15,
      textAlign: 'center',
    }, 
})

export default styles;
