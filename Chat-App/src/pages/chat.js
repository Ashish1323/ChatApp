import React, { Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {GiftedChat,Bubble} from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { chatInsert, chatList } from '../actions/chatAction';
import SocketIOClient from 'socket.io-client';

type Props = {
    name?: string,
};
 class Chat extends React.Component<Props> {
     static navigationOptions = ({ navigation }) => ({
         title: (navigation.state.params || {}).name || 'Chat!',
        // headerTitleAlign:"center",
        
             headerTintColor:"white",
             headerStyle: {
                 backgroundColor: "#fb5b5a"
               }
     });

     state = {
         userid:this.props.navigation.state.params.userid,
         messages: [],
     };

    componentDidMount() {
        this.socket = SocketIOClient('http://192.168.0.104:8082/');
        const data = {
            receiver_id: this.props.navigation.state.params.userid,
            sender_id: this.props.userReducer.userAuth._id
        };

        this.socket.emit('getMessage',data);
        this.socket.on('receiveMessage', (chatlist) => {
            if (chatlist) {
                this.setState({messages:chatlist});
            }
        });
    }

    componentDidUpdate(nextProps) {
        if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess ===true ){
            this.setState({
                messages: this.props.chatReducer.chatList
            })
        }
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages:GiftedChat.append(previousState.messages,messages),
    }))
}
    submitChatMessage(messages = []) {
        const date = new Date();
        const timestamp = date.getTime();
        this.onSend(messages)
        let details = { 
            user: {
                _id:this.props.userReducer.userAuth._id
            },
            receiver_id: this.state.userid,
            sender_id: this.props.userReducer.userAuth._id,
            chatdate:date,
            text: messages && messages[0] && messages[0].text
        } 
        // console.log(details);
        // this.props.onChatMessage(details);
        this.socket.emit('chatMessage', details);
    }

    renderBubble = (props) => {
        return (<Bubble {...props}
           textStyle={{
              right:{
                color:'#000000',
            },
            left:{
                color:'#000000',
            },
        }}
            timeTextStyle={{
                right: {
                   color:'#000000',
            },
                 left: {
                    color:'#000000',
            },
        }}
        wrapperStyle={{
            left: {
                backgroundColor:'white',
            },
            right: {
                backgroundColor:'#ADDBE6',
                
            }
        }} />
        );
    }

   
    render() {
        return(
            <View style={{flex:1, marginTop: 0,backgroundColor:'#FDF5E6'}}>
                <GiftedChat
                messages={this.state.messages}
                onSend = {messages =>
                this.submitChatMessage(messages)}
                renderBubble={this.renderBubble}
                user={{
                    _id:this.props.userReducer.userAuth._id,
                }}
                />
            </View>
        )
    }
}

function mapStateToProps(state) {
    return{
      chatReducer: state.chatReducer,
      userReducer: state.userReducer
    };
  }
  function mapDispatchToToProps(dispatch) {
    return{

      onChatMessage:(chatMessage) => dispatch(chatInsert(chatMessage)),
      onGetMessage: (data) => dispatch(chatList(data))
    };
  
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToToProps
  )(Chat);
