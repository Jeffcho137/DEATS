import { StyleSheet, Dimensions } from "react-native";
import { COLOR_CROCODILE } from "./utils/Constants";

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
      textAlign: 'center',
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
      flex: 0.3,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 10,
      marginTop: 10,
    },

    home_options: {
      flex: 0.8,
      width: '60%',
    },

    home_buttons: {
      flex: 0.4,
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 40,
      backgroundColor: 'lightgray',
      borderColor: COLOR_CROCODILE,
    },

    profile_heading: {
      // flex: 0.6,
      width: '90%',
      alignItems:'flex-end',
      paddingTop: 20,
    },

    profile_name: {
      fontSize: 20,
    },

    phone_number: {
      flex: 0.9,
      width: '90%',
      paddingTop: 20,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },

    profile_modal_text:{
      textAlign: 'center',
      fontSize: 15,
      marginBottom: 20,
    },

    profile_modal: {
      marginBottom: '10%',
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    profile_new_num: { 
      width: '70%',
      // height: '15%', 
      fontSize: 15,     
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: '5%',
      textAlign: 'center',
    },

    profile_modal_btns: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-evenly',
      // backgroundColor: 'coral',
    },

    profile_modal_cancel: {
      borderRadius: 3,
      borderWidth: 1,
      width: 80,
      paddingTop: 5,
      paddingBottom: 5,
      // height: 30,
    },

    profile_modal_update: {
      borderRadius: 3,
      borderWidth: 1,
      width: 80,
      paddingTop: 5,
      paddingBottom: 5,
      // height: 30,
    },

    profile_modal_edit: {
      // width: 50,
      paddingTop: 5,
      paddingBottom: 5,
    },

    profile_text: {
      fontSize: 18,
    },

    profile_acc_btns: {
      marginBottom: 30,
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

    past_deliveries_cont: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // marginTop: 50,
    },

    past_deliveries_none: {
      fontSize: 20,
      // backgroundColor: 'coral',
      flex: 0.2,
    },

    past_del_make: {
      flex: 0.1,
      // backgroundColor: 'coral',
      justifyContent: 'center',
      width: '60%',
      marginTop: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#006400",
    },

    past_text: {
      fontSize: 17, 
      textAlign: 'center', 
      color: "#006400",
    },

    order_sel: {
      flex: 0.32,
      width: 350,
      alignItems: 'center',
      borderWidth: 1, 
      borderRadius: 15, 
      padding: 15,
      paddingBottom: 20,
      // marginBottom: 20,
    },

    order_rev: {
      flex: 0.28,
      width: '90%',
      alignItems: 'center',
      marginBottom: 400,
    },

    order_sel_text: {
      alignSelf: 'flex-start',
      fontSize: 20,
      marginBottom: 10,
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
      borderColor: '#006400',
      borderWidth: 1,
      borderRadius: 4,
    },

    single_input_order_sel: {
      alignSelf: 'center',
      borderRadius: 15,
      borderWidth: 1,
      // height: '80%',
      width: 200,
      fontSize: 18,
      textAlign: 'center',
      marginTop: 10,
    }, 

    order_sel_input: {
      flex: 0.28,
      // justifyContent: 'center',
      alignItems: 'center',
      width: 350,
      borderWidth: 1, 
      borderRadius: 15, 
      padding: 15,
      // marginTop: 50,
    }, 

    order_sel_times: {
      width: 350,
      // marginTop: -70,
      flex: 0.28,
      borderWidth: 1, 
      borderRadius: 15, 
      padding: 15 ,
      paddingBottom: 20,
      marginBottom: 50,
    }, 

    order_sel_input_second: {
      // flex: 0.50,
      // justifyContent: 'center',
      alignItems: 'center',
      // width: '1000%',
      // marginTop: 10,
    }, 

    deliver_sel_input: {
      width: '90%',
      // flexDirection: 'column',
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',

    }, 

    del_sel_locations: {
      width: '90%',
    },

    del_sel_loc_text: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: COLOR_CROCODILE,
    },

    del_sel_input_box: {
      flex:1,
      justifyContent: 'center',
      // marginLeft: '2%',
      // marginBottom: 150
      width: '80%',
    }, 

    del_confirm_text: {
      // alignSelf: 'flex-start',
      fontSize: 16,
      marginBottom: 30,
      width: '95%',
      textAlign: 'center',
    },

    single_input: {
      alignSelf: 'center',
      borderRadius: 10,
      borderWidth: 1,
      height: '30%',
      width: '90%',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 15,
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

    order_sel_loc: {
      width: '95%',
      textAlign: 'center',
      fontSize: 17,
    },

    searching_text: {
      flex: 0.1,
      borderRadius: 5,
      //borderWidth: 1,
      height: 30,
      fontSize: 17,
      textAlign: 'center',
    },

    searching_text_hardcode: {
      flex: 0.1,
      borderRadius: 5,
      //borderWidth: 1,
      color: COLOR_CROCODILE,
      height: 30,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },

    del_match: {
      flex: 0.7,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    cancel_order: {
      bottom: 50,
      position: 'absolute',
    },

    map: {
      width: Dimensions.get("window").width,
      height: "92%",
    },

    del_map: {
      width: Dimensions.get("window").width,
      height: "75%",
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

    bottomView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 21
    },

    modalViewPayment: {
      width: '100%',
      height: '40%',
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

    modalView: {
      width: '80%',
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
      backgroundColor: "#006400",
      marginBottom: 2
    },
    buttonClose: {
      backgroundColor: "#006400",
    },

    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },

    textModalPayment: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },

    modalTextPayment: {
      marginBottom: '8%',
    },

    modal_text: {
      marginBottom: '10%',
    },

    modalText: {
      marginBottom: 10,
      textAlign: "center", 
      fontSize: 30,
    },

    deliverer_is: {
      textAlign: "center", 
      fontSize: 17,
    },

    logo_image: {
      height:120,
      marginBottom:50,
      width: Dimensions.get('window').width / 2.8 ,
    },

    logo_image_small: {
      height: 70,
      marginBottom: 50,
      marginLeft: 80,
      marginRight: -50,
      resizeMode: 'contain',
      width: Dimensions.get('window').width/2,
    },

    del_search_current_requests: {
      fontSize: 30,
      marginBottom: '10%',
    },
    del_search_all_requests: {
      flex: 0.8,
      width: '90%',
      alignItems:'center',
      // backgroundColor: 'coral',
    },

    del_search_requests: {
      width: '90%',
    },  

    del_search_single_request: {

      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%',
      borderWidth: 1,
      borderRadius: 3,
    },
    del_modal_text: {
      marginBottom: '10%',
      width: '80%',
      // backgroundColor: 'coral',
    },
    del_modal_buttons: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-evenly',
      // backgroundColor: 'coral',
    },

    del_modaL_cancel: {
      borderRadius: 3,
      borderWidth: 1,
      width: 80,
      paddingTop: 5,
      paddingBottom: 5,
      // height: 30,
    },

    del_modaL_match: {
      borderRadius: 3,
      borderWidth: 1,
      width: 80,
      paddingTop: 5,
      paddingBottom: 5,
      // height: 30,
    },

    status: {
      flex: 0.7,
      width: '100%',
      width: '90%',
      //alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'space-evenly',
    },

    status_text:{
      flex: 0.9,
      fontSize: 22,
    },

    status_single_update: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'lightgrey',
      borderRadius: 15,
      borderColor: COLOR_CROCODILE,
      borderWidth: 1,
      paddingLeft: 15,
      // height: 50,
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 50,
      // paddingRight: 10,
    },  

    status_yes_button:{
      // flex: 0.1,
//flexWrap,
// width: '190%',
textAlign:'right',
justifyContent: 'space-between'},

    orderItemStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      margin: 25
  },

  usernameStyle: {
      fontSize: 24,
      fontWeight: "600"
  },

  locationStyle: {
      fontSize: 15,
      fontWeight: "500"
  },

  rewardStyle: {
    fontSize: 15,
    fontWeight: "500",
    color: "green"
},


  modalNameStyle: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 10
},

modalUsernameStyle: {
  fontSize: 18,
  textAlign: "center",
  fontWeight: "500",
  marginBottom: 20
},

modalLocDescriptionStyle: {
  fontSize: 20,
  fontWeight: "500",
  marginBottom: 2
},

modalLocationStyle: {
  fontSize: 18,
},

swipeLeftButton: {
  flex: 1,
  margin: 8,
  borderRadius: 10,
  backgroundColor: "brown",
  justifyContent: 'center',
  alignItems: 'flex-end',
},

swipeText: {
  alignSelf: 'center',
  color: 'white',
  fontSize: 15,
  fontWeight: 'bold'
},

swipeRightButton: {
  flex: 1,
  margin: 8,
  marginLeft: 0,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center'
}})

export default styles;
