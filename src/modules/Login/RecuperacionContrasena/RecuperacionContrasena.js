import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Content, Text, Grid, Col, Row, Button, H3, Input} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

class Contraseña extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            isConnected: true,
            passnew: '',
            passnew2: '',
            secureTextEntry1: true,
            secureTextEntry2: true
        }
    }

    onIconPress1 = () =>{
        this.setState({
            secureTextEntry1: !this.state.secureTextEntry1
        });
    }

    onIconPress2 = () =>{
        this.setState({
            secureTextEntry2: !this.state.secureTextEntry2
        });
    }

    modificarContrasena = () =>{
        axios.put('http://35.203.42.33:3000/modificar_contrasena',{id_usuario: this.state.id_usuario, pass: this.state.passnew2})
        .then(response=> {
            Alert.alert(
                'Aviso',
                'Se ha actualizo tu contraseña con exito!',
                [
                {text: 'OK', onPress: () =>this.props.navigation.navigate('Login')},
                ]
            );
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onValidateInput= () =>{
        var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;
        if(validateContrasena.test(this.state.passnew) && this.state.passnew.trim() != ""){
            this.setState(() => ({ error2: "" }));
        }else{
            if(this.state.passnew.trim() == "" ){
                this.setState(() => ({ error2: "Ingresa tu contraseña" }));
            }else{
                this.setState(() => ({ error2: "Formato Invalido" }));
            }
        }
        if(validateContrasena.test(this.state.passnew2) && this.state.passnew2.trim() != ""){
            this.setState(() => ({ error3: "" }));
        }else{
            if(this.state.passnew2.trim() == "" ){
                this.setState(() => ({ error3: "Ingresa tu contraseña" }));
            }else{
                this.setState(() => ({ error3: "Formato Invalido" }));
            }
        }
        
        if (this.state.passnew2 != this.state.passnew ) {
            this.setState(() => ({ error3: "La contraseña no coincide" }));
        }else{                
            if (this.state.passnew.trim() != "" && this.state.passnew2.trim() != "" && validateContrasena.test(this.state.passnew) && validateContrasena.test(this.state.passnew2)) {
                this.modificarContrasena();
            }
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row><Col style={{marginLeft:20, marginTop:30}}><H3>Ingresa su nueva contraseña</H3></Col></Row>
                        <Row>
                            <Col style={{marginLeft:20, marginRight:20, marginTop:10}}>
                                <Input value={this.state.passnew} onChangeText={passnew => this.setState({ passnew})} placeholder="Contraseña nueva"  style = {{borderBottomWidth: 0.5}} secureTextEntry={this.state.secureTextEntry1}></Input>
                                {!!this.state.error2 && (
                                    <Text style={{ color: "red", fontSize:11}}>{this.state.error2}</Text>
                                )}
                            </Col>
                            <Col style={{marginTop:20, position:'absolute', marginLeft:360}}>
                                <TouchableOpacity onPress={this.onIconPress1} style={{height:30}}>
                                    <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginLeft:20, marginRight:20, marginTop:10}}>
                                <Input value={this.state.passnew2} onChangeText={passnew2 => this.setState({ passnew2 })} placeholder="Confirmar nueva contraseña" style = {{borderBottomWidth: 0.5}} secureTextEntry={this.state.secureTextEntry2}></Input>
                                {!!this.state.error3 && (
                                    <Text style={{ color: "red", fontSize:11}}>{this.state.error3}</Text>
                                )}
                                {!!this.state.error4 && (
                                    <Text style={{ color: "red", fontSize:11}}>{this.state.error4}</Text>
                                )}
                            </Col>
                            <Col style={{marginTop:20, position:'absolute', marginLeft:360}}>
                                <TouchableOpacity onPress={this.onIconPress2} style={{height:30}}>
                                    <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row><Col style={{marginLeft:20}}><Text style={{fontSize:10}}>La contraseña debe ser de 6 digitos e incluir al menos una letra y un numero.</Text></Col></Row>
                        <Row><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, marginTop:20, backgroundColor:'#ff8834'}}><Text>Confirmar</Text></Button></Col></Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Contraseña;