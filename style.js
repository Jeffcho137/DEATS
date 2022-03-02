import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#2e8b57',
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
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    create_acc_button: {
      width: '60%',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',

    },
    login_button: {
      width: '60%',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',
    },

    signup_info: {
      width: '100%',
      alignItems: 'center',
      height: '30%',
      marginBottom: '10%',
    },

    signup_input: {
      width: '70%',
      height: '15%',
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',
      textAlign: 'center',
    },

    singup_buttons: {
      flex: 0.35,
      alignItems: 'center',
      width: '100%',
    },

    signup_text: {
      flex: 0.2,
      textAlign: 'center',
      width: '80%',
      fontSize: 25,
      marginBottom: 20,
    },

    signup_create: {
      width: '50%',
      borderWidth: 1,
      height: '40%',
      borderRadius: 5,
    },

    login_text: {
      flex: 0.2,
      textAlign: 'center',
      width: '80%',
      fontSize: 25,
      marginBottom: 20,
    },

    login_info: {
      width: '100%',
      alignItems: 'center',
      height: '30%',
    },

    login_input: {
      width: '70%',
      height: '15%',
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',
    },

    login_buttons: {
      flex: 0.35,
      alignItems: 'center',
      width: '100%'
    },

    login: {
      width: '50%',
      borderWidth: 1,
      height: '40%',
      borderRadius: 5,
    },

    unsuccessful_login: {
      width: '90%',
      fontSize: 15,
      textAlign: 'center',
      color: 'red',
      marginTop: 10,
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

    profile_name: {
      fontSize: 20,
    },

    phone_number: {
      flex: 0.1,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    profile_text: {
      fontSize: 15,
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
      flex: 0.3,
      borderRadius: 5,
      borderWidth: 1,
      height: 50,
      fontSize: 40,
      textAlign: 'center',
    },

    map: {
      width: Dimensions.get("window").width,
      height: "90%",
    // height: Dimensions.get("window").height,
    },

    upload_container:{
      elevation:2,
      height:200,
      width:200,
      backgroundColor:'#efefef',
      position:'relative',
      borderRadius:999,
      overflow:'hidden',
    },
    
    upload_btn_container:{
      opacity:0.7,
      position:'absolute',
      right:0,
      bottom:0,
      backgroundColor:'lightgrey',
      width:'100%',
      height:'25%',
    },
    
    upload_button:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 21
    },
    modalView: {
      margin: 100,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 200,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
      marginBottom: 2
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 100,
      textAlign: "center"
    },
})

export default styles;
