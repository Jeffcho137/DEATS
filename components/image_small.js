import React, { Component } from 'react'
import { Image } from 'react-native'
import styles from '../style';

const Logo = () => (
   <Image source={require('./../logo_deats.png')} style={styles.logo_image_small} />
)
export default Logo;