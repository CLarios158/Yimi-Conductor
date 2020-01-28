import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row, Button, Card, CardItem, Body, Input, Switch, H3} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import {NetInfo, Dimensions, View} from 'react-native';
const { width } = Dimensions.get('window');

class Telefono extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.navigation.getParam('nombre'),
            apellido: this.props.navigation.getParam('apellido'),
            curp: this.props.navigation.getParam('curp'),
            telefono: this.props.navigation.getParam('telefono'),
            foto: this.props.navigation.getParam('foto'),
            id_ciudad: this.props.navigation.getParam('id_ciudad'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_tipo_conductor: this.props.navigation.getParam('id_tipo_conductor'),
            correo: this.props.navigation.getParam('correo'), isConnected: true
        }
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    CodigoV = () =>{
        axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono});
        this.props.navigation.navigate('CodigoV',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
        correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor});
    }

    onValidateInput= () =>{
        var validate = /^[0-9]{10}$/;

        if(this.state.isConnected != false){
            axios.post('http://35.203.42.33:3000/validar_cuenta',{campo: this.state.telefono})
            .then(response => {
                // handle success
                response.data.data.forEach(element => {
                    this.setState({
                    respuesta: element["respuesta"]
                    })  
                });

                if (this.state.telefono.trim() == "") {
                    this.setState(() => ({ nameError: "Ingrese tu Teléfono" }));
                }else if (!validate.test(this.state.telefono)){
                    this.setState(() => ({ nameError: "Favor de ingresar 10 digitos" }));              
                }else if(this.state.respuesta == 1){
                    this.setState(() => ({ nameError: "Número de Teléfono Existente" }));
                }else{
                    this.CodigoV();
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row>            
                            {!this.state.isConnected 
                                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0}}>
                                <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                                </View> 
                                :<View></View>
                            }
                        </Row>
                        <Row>
                            <Col>
                                <Card >
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col style={{width:'26%', marginTop:10}}>
                                                     <Text> Conectado</Text>
                                                </Col>
                                                <Col style={{width:'12%', marginTop:13}}>
                                                    <Switch value={true} />
                                                </Col>
                                                <Col style={{width:'23%'}}></Col>
                                                <Col style={{width:'13%'}}>
                                                    <FontAwesome5 name='exclamation-circle' size={40} style={{color:'#fc2d00'}}/>
                                                </Col>
                                                <Col style={{width:'13%'}}>
                                                    <FontAwesome5 name='question-circle' size={40} style={{color:'#ff8834'}}/>
                                                </Col>
                                                <Col style={{width:'13%'}}>
                                                    <FontAwesome5 name='cog' size={40} style={{color:'#ff8834'}}/>
                                                </Col>
                                            </Row>       
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row><Col style={{marginLeft:20, marginTop:30}}><H3>Ingresa su nuevo teléfono para guardar</H3></Col></Row>
                        <Row>
                            <Col style={{marginLeft:20, marginRight:20, marginTop:10}}>
                                <Input value={this.state.telefono} onChangeText={telefono => this.setState({ telefono })} keyboardType='numeric' maxLength={10} placeholder="Número Teléfono" style = {{borderBottomWidth: 0.5}}></Input>
                                {!!this.state.nameError && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.nameError}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, marginTop:20, backgroundColor:'#ff8834'}}><Text>Confirmar</Text></Button></Col></Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Telefono;