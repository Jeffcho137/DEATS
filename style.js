import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    landing_logo: {
      flex: 0.3,
      fontSize: 50,
      width: '100%',
      textAlign:'center',
      alignItems:'center',
    },

    landing_buttons: {
      flex: 0.3,
      // backgroundColor: 'coral',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    create_acc_button: {
      // backgroundColor: 'coral',
      width: '60%',
      // height: '20%',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',

    },
    login_button: {
      // backgroundColor: 'coral',
      width: '60%',
      // height: '20%',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',
    },

    home_profile_button: {
      flex: 0.25,
      alignSelf: 'flex-start',
      margin: 10,
    },

    home_options: {
      flex: 0.8,
      width: '60%',
    },

    home_buttons: {
      flex: 0.3,
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 40,
    },

    profile_heading: {
      flex: 0.1,
      width: '90%',
      alignItems:'flex-end',
    },

    phone_number: {
      flex: 0.1,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    payment: {
      flex: 0.1,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10%',
    },
    
    past_orders: {
      width: '90%',
      flex: 0.3,
    },

    past_deliveries: {
      width: '90%',
      flex: 0.3,
    },

    order_sel: {
      flex: 0.25,
      width: '90%',
      alignItems: 'center',
      marginBottom: 20,
    },

    order_sel_text: {
      alignSelf: 'flex-start',
      fontSize: 20,
    },

    order_sel_place_options: {
      flex: 0.7,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }, 

    order_sel_single_place: {
      flex: 0.3,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 4,
    },

    order_sel_input: {
      flex: 0.25,
      width: '90%',
      flexDirection: 'row',
      marginBottom: 10,

    }, 

    deliver_sel_input: {
      flex: 0.2,
      width: '90%',
      flexDirection: 'row',
      marginBottom: 10,

    }, 

    order_sel_input_box: {
      flex: 1,
      marginLeft: '2%',
    }, 

    single_input: {
      borderRadius: 3,
      borderWidth: 1,
      height: '20%',
      width: '100%',
      marginBottom: 10,
      fontSize: 15,
      textAlign: 'center',
    }, 

    order_sel_times: {
      flex: 0.7,
      width: '100%',
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
      height: '30%',
      marginBottom: 10,
      fontSize: 15,
      textAlign: 'center',
    }, 

    searching_text: {
      flex: 0.5,
      borderRadius: 5,
      borderWidth: 1,
      height: 50,
      fontSize: 40,
      textAlign: 'center',
    },

    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },

})

export default styles;
