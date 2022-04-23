import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfileImgUri, setProfileImgUri } from '../redux/slices/userSlice';

export default function ImageUpload ({ navigation }) {
  const dispatch = useDispatch()
  const profileImgUri = useSelector(selectProfileImgUri)

  const pickImage = async () => {
    let selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3,1],
        quality: 1,
      })
    
      console.log(JSON.stringify(selectedImage))
    
      if (!selectedImage.cancelled) {
        dispatch(setProfileImgUri(selectedImage.uri))
      }
    }
  
  return (
    <View style={styles.upload_container}> 
      {
        profileImgUri && <Image source={{ uri: profileImgUri }} style={{ width: 200, height: 200 }} />
      }
      <View style={styles.upload_btn_container}>
      <TouchableOpacity onPress={pickImage} style={styles.upload_button} >
      <Text>{profileImgUri ? 'Edit' : 'Take or upload a'} photo</Text>
      <AntDesign name="camera" size={20} color="black" />
      </TouchableOpacity>
      </View>
    </View>  
  )
}
