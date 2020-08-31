import React, {Component} from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image, List, ListItem } from 'react-native';
import {Button, Icon} from 'native-base';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(){
        this.props.onUserList();
    }

    goChat = (userid, name) => {
        this.props.navigation.navigate('Chat', {userid: userid, name: name});
    }

    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true) {
            this.setState({users: this.props.userReducer.userList});
            
        }
    }


render() {
    const { users } = this.state;
    return (
        <View style = {styles.container}>
               <Image
        style={{width:430, height:200, alignItems:"center", justifyContent:"center"}}
        source={{
          uri: 'https://align4profit.com/wp-content/uploads/2017/03/lets-talk-balloons-987w.jpg',
        }}
      />
            {users && users.length>0?
            <View>
                {users.map((item,index) =>
                {
                    return(<TouchableOpacity >
                        <Button  iconLeft full dark onPress={()=>this.goChat(item._id,item.name)} key={index}>
                        <Icon name='home' />
            <Text style={{color:"#fff", alignContent:"center", alignItems:"center"}}> {item.name} </Text>
          </Button>

      
                          
                           </TouchableOpacity>
                    )})}
            </View>:null}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return{
        userReducer: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return{
        onUserList:() => dispatch(userList())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 10
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 50,
        color: '#ffffff',
        backgroundColor: '#000000'
    },
});

