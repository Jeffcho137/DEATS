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
      width: 300,
      alignItems: 'center',
      // backgroundColor: 'coral',
      // marginBottom: -5,

    },

    order_sel_text: {
      alignSelf: 'flex-start',
      fontSize: 20,
    },

    order_selection_place_options: {
      flexDirection: 'row',
      alignItems: 'center',
    }, 

    order_sel_input: {
      flex: 0.25,
      width: 300,
      alignItems: 'center',
      // backgroundColor: "coral",
      marginBottom: 10,
      flexDirection: 'row',

    }, 

    order_sel_input_box: {
      // backgroundColor: "white",
      marginLeft: 30,
    }, 

    single_input: {
      borderRadius: 3,
      borderWidth: 1,
    }
})

export default styles;
