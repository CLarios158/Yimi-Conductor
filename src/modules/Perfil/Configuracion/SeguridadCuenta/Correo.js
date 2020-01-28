import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row, Button, H3, Card, CardItem, Body, Input, View, Switch} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import {NetInfo, Dimensions, Alert} from 'react-native';
const { width } = Dimensions.get('window');

class Correo extends Component {
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
            correo: '', correo2: '', isConnected: true
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
    
    updateCorreo = () =>{
        axios.post('http://35.203.42.33:3000/mail',{correo: this.state.correo2})
        .then(response => {
            axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido:this.state.apellido, correo: this.state.correo2,
            num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
            .then(response=> {
                Alert.alert(
                    'Aviso',
                    'Se ha actualizo tu correo electrónico con éxito!',
                    [
                    {text: 'OK', onPress: () => this.props.navigation.navigate('SeguridadCuenta')},
                    ]
                );
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        
    }

    onValidateInput= () =>{
        var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if(this.state.isConnected != false){
            if(this.state.correo.trim() == ""){
                this.setState(() => ({ errorCorreo: "Ingresa tu correo" }));
            }else if(!validateCorreo.test(this.state.correo)){
                this.setState(() => ({ errorCorreo: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorCorreo: "" }));
            }
        
            if(this.state.correo2.trim() == ""){
                this.setState(() => ({ errorCorreo2: "Ingresa tu correo" }));
            }else if(!validateCorreo.test(this.state.correo2)){
                this.setState(() => ({ errorCorreo2: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorCorreo2: "" }));
            }
            
            if(this.state.correo != this.state.correo2 && validateCorreo.test(this.state.correo) && validateCorreo.test(this.state.correo2)){
                this.setState(() => ({ errorCorreo2: "El correo no coincide" }));
            }

            if(this.state.correo2.trim() != "" && this.state.correo.trim() != "" && validateCorreo.test(this.state.correo) && validateCorreo.test(this.state.correo2)){
                this.setState(() => ({ errorCorreo: "" }));
                this.setState(() => ({ errorCorreo2: "" }));
                this.updateCorreo();
            }
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
                        <Row><Col style={{marginLeft:20, marginTop:30}}><H3>Ingresa su nuevo correo para guardar</H3></Col></Row>
                        <Row>
                            <Col style={{marginLeft:20, marginRight:20, marginTop:10}}>
                                <Input value={this.state.correo} onChangeText={correo => this.setState({ correo })} placeholder="Correo Electrónico" style = {{borderBottomWidth: 0.5}}></Input>
                                {!!this.state.errorCorreo && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorCorreo}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{marginLeft:20, marginRight:20, marginTop:10}}>
                                <Input value={this.state.correo2} onChangeText={correo2 => this.setState({ correo2 })} placeholder="Confirmar Correo Electrónico" style = {{borderBottomWidth: 0.5}}></Input>
                                {!!this.state.errorCorreo2 && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorCorreo2}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row><Col><Button onPress={this.onValidateInput} block style = {{backgroundColor:'#ff8834', marginLeft: 20, marginRight: 20, marginTop:50}}><Text>Confirmar</Text></Button></Col></Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Correo;