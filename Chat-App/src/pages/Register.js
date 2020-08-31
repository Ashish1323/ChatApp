import React, { Component } from 'react';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {Button, Icon} from 'native-base';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'; 

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            displayname: '',
            email: '',
            password: '',
            errors: {}
        };
        this.validateForm = this.validateForm.bind(this);
    }
     

    handleName = (text) => {
        this.setState({ name: text})
      }

      handleDisplayName = (text) => {
        this.setState({ displayname: text})
      }

    handleEmail = (text) => {
        this.setState({ email: text})
      }
      handlePassword = (text) => {
        this.setState({ password: text})
      }


      validateForm () {
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;
        
        if (name === ''){
            errors.name = "Name cannot be empty.";
        } else {
            errors.name = '';
        }

        if (displayname === ''){
            errors.displayname = " Display name cannot be empty.";
        } else {
            errors.displayname = '';
        }

        if (emailaddr === ''){
          errors.email = "Email address cannot be empty.";
        } else if (emailaddr.length > 0 && !reg.test(emailaddr)){
          errors.email = "Please provide correct email address";
        } else {
          errors.email = '';
        }
    
        if (pass === ''){
          errors.pass = "Password cannot be empty.";
        } else if (pass && pass.length < 5) {
          errors.pass = "Password should be more than 5 characters.";
    
        } else {
          errors.pass = '';
    
        } 
        this.setState({ errors})
        if (errors.name==='' && errors.displayname==='' && errors.email=== '' && errors.pass === ''){
          this.submitForm();
        }
      }

submitForm = async () => {
    let that = this;
    axios.post('http://192.168.0.104:8082/registeruser',{
        name: this.state.name,
        displayname: this.state.displayname,
        email: this.state.email,
        password: this.state.password
    })
    .then(function (response) {
        if(response && response.data && response.data._id) {
            that.props.navigation.navigate('Home');
        } else {
            Toast.show(respone.data.message, 1000); 
        }
    })
    .catch(function (error){
        console.log(error);
    });

}

goToLogin = () => {
    this.props.navigation.navigate('Login');
}

render() {
    const { errors } = this.state;
    return (

        <View style={styles.container}>
              <Image
        style={{width:430, height:200, alignItems:"center", justifyContent:"center", marginBottom:100}}
        source={{
          uri: 'https://align4profit.com/wp-content/uploads/2017/03/lets-talk-balloons-987w.jpg',
        }}
      />

        <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Name..." 
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={this.handleName}/>
           <Text style={[styles.errorstyle]}>{errors.name}</Text>      
          </View>

          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Display Name..." 
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={this.handleDisplayName}/>
           <Text style={[styles.errorstyle]}>{errors.displayname}</Text>      
          </View>
         
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Email..." 
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={this.handleEmail}/>
           <Text style={[styles.errorstyle]}>{errors.email}</Text>      
          </View>
  
  
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..." 
              placeholderTextColor="#fff"
              autoCapitalize="none"
              onChangeText={this.handlePassword}/>
            <Text style={[styles.errorstyle]}>{errors.pass}</Text>  
          </View>
  
  
        
          <TouchableOpacity style={styles.register}
          >
            {/* <Text style={styles.registerText}>Register</Text> */}
            <Button block light onPress={this.validateForm}>
            <Text>Register</Text>
          </Button>
          </TouchableOpacity>

          <TouchableOpacity style={styles.login}
         >
            {/* <Text style={styles.loginText}>LOGIN</Text> */}
            <Button block light  onPress = {this.goToLogin}>
            <Text>Login</Text>
          </Button>
          </TouchableOpacity>
          </View>
    );
  }
}


export default Register;

const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
    },

    inputView:{
      width:"80%",
      backgroundColor:"black",
      borderColor: "black",
      borderWidth: 1.5,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:10,
      paddingTop: 25,
    },
    inputText:{
      height:50,
      color:"white"
    },
    
    register:{
      backgroundColor: 'black',
        padding: 13,
        margin: 10,
        height: 40,
        borderRadius: 5,
        width: 100,
        left: -80,
    },
    login:{
      backgroundColor: 'black',
        padding: 13,
        margin: 10,
        height: 40,
        borderRadius: 5,
        width: 80,
        left: 50,
        marginTop: -47,
    },
    errorstyle:{                          
      fontSize: 10,
     alignSelf: 'center',
     color: 'red'
   },
  
    loginText:{
      color: '#000000',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      bottom: 7,
    },
    registerText: {
      color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 6,
    }
   

  
  });