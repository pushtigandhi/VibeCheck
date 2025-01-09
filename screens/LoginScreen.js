import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput,
   SafeAreaView, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import { doLogin as doLogin_, doSignup as doSignup_ } from "../API";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../constants";

const BRAND_ICON = require("../assets/icon.png")

const doLogin = async (email, password, navigation) => {
  if (!email || !password) return;
  try {
    const { status: loginStatus, message: loginMessage } = await doLogin_(email, password)
    if (loginStatus === 200) {
      // success 
      navigation.navigate("Home")
    } else {
      // failure
      alert(`Login failed.\n${loginMessage}`)
    } 
  } catch (e) {
    console.log(e)
    alert(`Login failed.\nError: ${e.message}`);
  }
}

const doSignup = async (email, password, handle, firstName, lastName, navigation) => {
  try {
    const signupStatus = await doSignup_(email, password, handle, firstName, lastName)
    if (signupStatus === 201) {
      alert("Signup successful\nPlease verify your email address to login.")
    } else if (signupStatus === 409) {
      alert("Signup failed\nEmail already exists.")
    } else {
      alert("Signup failed")
    }
  } catch (e) {
    console.log(e)
    alert(`Signup failed.\nError: ${e.message}`);
  }
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [handle, setHandle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUp, setSignUp] = useState(false);

  let passwordInput;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters long,
    // contain at least one uppercase letter, one lowercase letter, and one number
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    // Name should be at least two characters long
    return name.length >= 2;
  };

  const validateHandle = (handle) => {
    // Handle should not contain any special characters or punctuation except underscores

    if(handle.length >=2) {
        const regex = /^[a-zA-Z0-9_]+$/;
        return regex.test(handle);
    }
    return false;   
  };

  const showAlert = () => {
    Alert.alert(
      'Invalid input(s)',
      errorMessage,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  const validateSignUp = () => {
    setErrorMessage('');
    if (!email || !password || !handle || !firstName || !lastName){
      setErrorMessage('Please fill in all the fields.');
      showAlert();
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number');
      showAlert();
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      showAlert();
      return;
    }
    if (!validateName(firstName)) {
        setErrorMessage('First name should be at least two characters long');
        showAlert();
        return;
    }
    if (!validateName(lastName)) {
        setErrorMessage('Last name should be at least two characters long');
        showAlert();
        return;
    }
    if (!validateHandle(handle)) {
      setErrorMessage('Handle should not contain any special characters or punctuation except underscores');
      showAlert();
      return;
    }

    // If all validations pass, proceed with sign-up logic here
    // console.log('First Name:', firstName);
    // console.log('Last Name:', lastName);
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('Handle:', handle);

    doSignup(email, password, handle, firstName, lastName, navigation)
  };
  
  return (
    <SafeAreaView 
      style={styles.loginRoot}
      >
      <KeyboardAvoidingView 
        behavior="position"
        keyboardVerticalOffset={150}
        style={styles.imageAndText}
      >
        <View style={styles.imageBox}>
          <Image
            source={BRAND_ICON}
            style={{ width: 140, height: 140 }}
          />
        </View>

        {/* Input Form */}
        <View
          style={styles.inputsRoot}
        >
          <Text style={styles.label}>*Email:</Text>
          <TextInput
            style={[styles.textInputRoot, styles.textInput]}
            placeholder="user@mail.com"
            placeholderTextColor={COLORS({opacity:1}).primary}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            onSubmitEditing={() => { passwordInput.focus(); }}
            blurOnSubmit={false}
          />
          <Text style={styles.label}>*Password:</Text>
          <View style={[styles.passwordInputRoot, styles.textInputRoot]}>
            <TextInput
              ref={(input) => { passwordInput = input; }}
              style={[styles.textInput, styles.passwordInput]}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="password"
              placeholderTextColor={COLORS({opacity:1}).primary}
              secureTextEntry={!showPassword}
              onChangeText={(password) => setPassword(password)}
              ///onSubmitEditing={() => doLogin(email, password, navigation)}
            />
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            />
          </View>
          {isSignUp && (
            <View>
                <Text style={styles.label}>*First Name:</Text>
                <TextInput
                    style={[styles.textInputRoot, styles.textInput]}
                    autoCapitalize="none"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    onSubmitEditing={() => { passwordInput.focus(); }}
                    blurOnSubmit={false}
                />
                <Text style={styles.label}>*Last Name:</Text>
                <TextInput
                    style={[styles.textInputRoot, styles.textInput]}
                    autoCapitalize="none"
                    onChangeText={(lastName) => setLastName(lastName)}
                    onSubmitEditing={() => { passwordInput.focus(); }}
                    blurOnSubmit={false}
                />
                <Text style={styles.label}>*@:</Text>
                <TextInput
                    style={[styles.textInputRoot, styles.textInput]}
                    placeholder="username"
                    placeholderTextColor={COLORS({opacity:1}).primary}
                    autoCapitalize="none"
                    onChangeText={(handle) => setHandle(handle)}
                    onSubmitEditing={() => { passwordInput.focus(); }}
                    blurOnSubmit={false}
                />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>

      {/* Login Button */}
      {!isSignUp && (
        <View style={styles.buttonsRoot}>
            <Pressable
            style={styles.loginButton}
            onPress={() => doLogin(email, password, navigation)}
            >
            <Text style={[styles.textBottom, styles.linkText]}>Login</Text>
            </Pressable>
            <View
            style={{flexDirection: "row",
            justifyContent:"center"}}>
            <Text
                style={styles.textBottom}>
                Don't have an account?
            </Text>
            <Pressable
                style={styles.loginButton}
                onPress={() => setSignUp(true)}
            >
                <Text style={[styles.textBottom, styles.linkText, styles.signupText]}>Sign Up</Text>
            </Pressable>
            </View>
        </View>
      )}
      {isSignUp && (
        <View style={styles.buttonsRoot}>
            <Pressable
            style={styles.loginButton}
            onPress={() => validateSignUp()}
            >
            <Text style={[styles.textBottom, styles.linkText]}>Sign Up</Text>
            </Pressable>
            <View
            style={{flexDirection: "row",
            justifyContent:"center"}}>
            <Text
                style={styles.textBottom}>
                Have an account?
            </Text>
            <Pressable
                style={styles.loginButton}
                onPress={() => setSignUp(false)}
            >
                <Text style={[styles.textBottom, styles.linkText, styles.signupText]}>Login</Text>
            </Pressable>
            </View>
        </View>
      )}
      

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginRoot: {
    height: "100%",
    backgroundColor: "#fff",
    alignItems: 'center',
    width: "100%",
    display: "flex",
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    paddingVertical: "10%",
  },
  imageBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  imageAndText: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textInput: {
    overflow: "hidden",
    padding: 20,
  },
  textInputRoot: {
    backgroundColor: COLORS({opacity:0.3}).tertiary,
    padding: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
  passwordInputRoot: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "100%",
  },
  passwordInput: {
    flex: 9,
  },
  eyeButton: {
    padding: 5,
    flex: 1,
  },
  linkText: {
    color: COLORS({opacity:1}).primary,
    textDecorationLine: "underline",
    textDecorationColor: COLORS({opacity:1}).primary,
  },
  signupText: {
    marginLeft: 10,
  },
  textBottom: {
    fontSize:20,
    marginTop:9,
    color: COLORS({opacity:1}).grey,
  },
  inputsRoot: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: "5%",
  },
  buttonsRoot: {
      flexDirection: "column",
      alignItems: "center"
  },
}); 