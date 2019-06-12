import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Facebook } from 'expo';

const id = '319252258763165';
const facebookImage = 'http://pic.youmobile.org/imgcdn/facebook_light_icon_56.jpg';

class FacebookLogin extends Component {
  // Used to log in to facebook
  logIn = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync(id, {
        permissions: ['public_profile'],
      });

      if (type === 'success') {
        // Log in success
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // Log in failed
        alert('failed');
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.login} onPress={() => this.logIn()}>
        <Image
          source={{
            uri: facebookImage,
          }}
          style={styles.facebookIcon}
        />
        <Text style={styles.loginText}> Continue with Facebook</Text>
      </TouchableOpacity>
    );
  }
}

export default FacebookLogin;

const styles = StyleSheet.create({
  login: {
    width: 300,
    backgroundColor: '#305d99',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
  facebookIcon: {
    width: 30,
    height: 30,
    borderRadius: 5
  }
});
