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
      width: 300,
      alignItems: 'center',
      // backgroundColor: "coral",
      marginBottom: 10,
      // flexDirection: 'row',

    },

    order_sel_text: {
      alignSelf: 'flex-start',
    },

    order_selection_place_options: {
      flexDirection: 'row',
      // backgroundColor: "white",
      alignItems: 'center',
    }, 

    order_sel_input: {
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
