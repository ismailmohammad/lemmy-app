import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Constants, Facebook } from 'expo';

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
          this.setState({title: "Hi ${profile.name}!"})
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

  render() {
    return (
      <ScrollView style={styles.scroll_container}>
      <View style={styles.container}>

        {/*  Title of the App for Login Screen */}
        <Text style={styles.title}>
        {/* Displays the title which is stored in this.state.title */}
            {this.state.title}
        </Text>

        {/* Mohammad Ismail Logo */}
        <Image
          source={{ uri: 'http://ismailmohammad.github.io/img/profile_2_bak.png' }}
          style={{ height: 120, width: 120, padding:24 }}
        />

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
        />

        {/* Login Button */}
        <Button
          title="Login"
          color="#000000"
          onPress={this._handleButtonPress}
        />

        {/* Register Button */}
        <Button
          title="Register"
          color="#000099"
          onPress={this._handleRegisterPress}
          style={{ padding:24 }}
        />

        {/* Clear Button */}
        <Button
          title="Clear Fields"
          onPress={this._handleClearFieldsPress}
          color="#ff0000"
        />

         {/* Testing Facebook Login*/}
        <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
        />
        </View>
    </ScrollView>
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
});
