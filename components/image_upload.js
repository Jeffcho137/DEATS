import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../style';

export default class ImageUpload extends Component {
  constructor(props){
    super(props)
    this.state = {
      uploadedImagUri: null
    }
  }

  pickImage = async () => {
    let selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,1],
        quality: 1,
      });
    
      console.log(JSON.stringify(selectedImage));
    
      if (!selectedImage.cancelled) {
        this.setState({uploadedImagUri: selectedImage.uri});
      }
    };

  render() {
    return (
      <View style={styles.upload_container}> 

        {
          this.state.uploadedImagUri && <Image source={{ uri: this.state.uploadedImagUri }} style={{ width: 200, height: 200 }} />
        }
        <View style={styles.upload_btn_container}>
        <TouchableOpacity onPress={this.pickImage} style={styles.upload_button} >
        <Text>{this.state.uploadedImagUri ? 'Edit' : 'Take or upload a'} photo</Text>
        <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
        </View>

      </View>  
    )
  }
}