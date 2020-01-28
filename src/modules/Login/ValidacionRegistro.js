import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import {View, NetInfo, Dimensions, ActivityIndicator, AsyncStorage} from 'react-native';
const { width } = Dimensions.get('window');


class ValidacionRegistro extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id_usuario: this.props.navigation.getParam('id_usuario'),
          user: this.props.navigation.getParam('telefono'),
          pass: this.props.navigation.getParam('pass'),
          tiempo: '', telefono: '', email: '', loading: false
        };
    }

    componentDidMount(){
        console.log(this.state)
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        axios.get('http://35.203.42.33:3003/webservice/tiempos/tiempos_solicitud')
        .then(response => {
            response.data.datos.forEach(element => {
                this.setState({
                    tiempo: element["tiempo"],
                    email: element["email_soporte"],
                    telefono: element["telefono"],
                    loading: true

                });         
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    SaveSession = async () => {
        let campo = this.state.user;
        let passwd = this.state.pass;

        try {
    
          await AsyncStorage.setItem('campo', campo);
          await AsyncStorage.setItem('passwd', passwd);
    
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    goHome = () =>{
        this.SaveSession();
        this.props.navigation.push('Home', {id_usuario: this.state.id_usuario});
    }
    
    render() {
        if(this.state.loading == true){
            return (
            <Container>
                <Content>
                <Grid>
                    <Row>
                        <Col style={{display:'flex',alignItems:'center',alignContent:'center', marginTop:50}}><FontAwesome5 name='check-circle' size={250} style={{color:'#2ecc71'}} /></Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10}}>
                            <Text style = {{textAlign:'center'}}>Tu solicitud de registro como conductor ha sido enviada para su validación, se te notificará el resultado en un máximo de {this.state.tiempo} horas.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style = {{display: 'flex', alignItems:'center',alignContent:'center',marginTop:20}}>
                            <Text style = {{textAlign:'center'}}>{this.state.telefono}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style = {{display: 'flex', alignItems:'center',alignContent:'center',marginTop:20}}>
                            <Text style = {{textAlign:'center'}}>{this.state.email}</Text>
                        </Col>
                    </Row>
                    <Row><Col><Button onPress={this.goHome} block style = {{marginLeft: 70, marginRight: 70, marginTop:50, backgroundColor:'#ff8834'}}><Text>OK</Text></Button></Col></Row>
                </Grid>
                </Content>
            </Container>
            );
        }else{
            return(
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10}}>
                  <ActivityIndicator size={80} color="#ff8834" />
                </View>
            );
        }
    }
}

export default ValidacionRegistro;