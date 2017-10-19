import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import { Constants, Facebook, Google } from 'expo';

export default class App extends Component {
  static navigationOptions = {
    title: 'Login',
  };
  state = {
    username: "",
    passphrase: "",
    title: "Lemmy the Lemon App v1.0.0"
  };

  _handleTextChange = username => {
    this.setState({ username });
  };

  _handleTextChange2 = passphrase => {
    this.setState({ passphrase });
  };

  _handleRegisterPress = () => {
    Alert.alert(
      'Signup Process',
      'Your account has been created!');

  };

  _handleClearFieldsPress = () => {
    this.setState({ username: ""});
    this.setState({ passphrase: ""});
    Alert.alert(
      'Clear Fields',
      'The text fields have been cleared. You may try again now.');
  };

  _handleButtonPress = () => {
    Alert.alert(
      'Login Process',
      'You are now logged in!',
    );
  };

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        '1201211719949057', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );

      switch (type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          this.setState({title: "Hi " + profile.name + "!"})
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}! Welcome to Lemmy the Lemon!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          this.setState({title: "Hi " + user.name + "!"})
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}! Welcome to Lemmy the Lemon!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>

        {/*  Title of the App for Login Screen */}
        <Text style={styles.title}>
        {/* Displays the title which is stored in this.state.title */}
            {this.state.title}
        </Text>



        {/* Text Label for Username */}
        <Text style={styles.text_field}>
            Username
        </Text>

        {/* Field for Username */}

        <TextInput
          value={this.state.username}
          onChangeText={this._handleTextChange}
          style={styles.username_input}
        />

        {/* Text Label for Password */}
        <Text style={styles.text_field}>
            Password
        </Text>

        {/* Field for Password */}
         <TextInput
          value={this.state.passphrase}
          onChangeText={this._handleTextChange2}
          style={styles.password_input}
          secureTextEntry={true}
        />

        <View style={styles.button_layout}>
        {/* Login Button */}
        <Button
          title="Login"
          color="#009900"
          onPress={this._handleButtonPress}
        />

        {/* Register Button */}
        <Button
          title="Register"
          color="#000099"
          onPress={this._handleRegisterPress}
        />
        </View>

        {/* Clear Button */}
        <Button
          title="Clear Fields"
          onPress={this._handleClearFieldsPress}
          color="#ff0000"
        />

        <View style={{padding: 5, flex: 0}}>
         {/* Facebook Login Authentication*/}
        <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
        />
        </View>

        <View style={{padding: 5, flex: 0}}>
        {/* Google Login Authentication */}
        <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}
        />
        </View>


        <View style={{flex: 1, flexDirection: 'row'}}>
        {/* Lemmy the Lemon */}
        <Image
          source={require('../assets/images/the-lemon.png')}
          style={{ height: 100, width: 100}}
        />

        {/* Mohammad Ismail Logo */}
        <Image
          source={require('../assets/icons/lemmy-icon.png')}
          style={{ height: 120, width: 120}}
        />
        </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  scroll_container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  text_field: {
    margin: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  username_input: {
    backgroundColor: 'white',
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'yellow',
  },
  password_input: {
    backgroundColor: 'white',
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'yellow',
  },
  button_layout: {
    flex: 0,
    flexDirection: 'row',
    padding: 5,
  },
});
