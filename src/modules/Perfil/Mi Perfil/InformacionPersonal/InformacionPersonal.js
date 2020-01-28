import React, { Component } from 'react';
import { Container, Content, Grid, Col, Row, Text, Button, Input, Card, CardItem, Body, Switch} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import {View, NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');

class InformacionPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            nombre_old: this.props.navigation.getParam('nombre'),
            apellido_old: this.props.navigation.getParam('apellido'),
            curp_old: this.props.navigation.getParam('curp'),
            nombre_new: this.props.navigation.getParam('nombre'),
            apellido_new: this.props.navigation.getParam('apellido'),
            curp_new: this.props.navigation.getParam('curp'),
            msg: '', isConnected:true
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    modificarInformacion = () =>{       
        axios.post('http://35.203.42.33:3000/registrar_validacion_dp',{id_usuario: this.state.id_usuario, nombre_old: this.state.nombre_old,
        nombre_new: this.state.nombre_new, apellido_old: this.state.apellido_old, apellido_new: this.state.apellido_new, curp_old: this.state.curp_old,
        curp_new: this.state.curp_new})
        .then(response=> {
            response.data.data.forEach(element => {
                this.setState({                        
                    msg: element["msg"],
                });         
            });
            alert(this.state.msg);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onValidateInput= () =>{
        var validateCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
        var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;
        
        if(this.state.isConnected != false){
            if(this.state.nombre_new.trim() == "" ){
                this.setState(() => ({ errorNombre: "Ingresa tu Nombre" }));
            }else if(!validateNombres.test(this.state.nombre_new)){
                this.setState(() => ({ errorNombre: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorNombre: "" }));
            }

            if(this.state.apellido_new.trim() == "" ){
                this.setState(() => ({ errorApellido: "Ingresa tu Apellido" }));
            }else if(!validateNombres.test(this.state.apellido_new)){
                this.setState(() => ({ errorApellido: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorApellido: "" }));
            }
            
            if(this.state.curp_new.trim() == ""){
                this.setState(() => ({ errorCurp: "" }));
            }else if(!validateCurp.test(this.state.curp_new.toUpperCase())){
                this.setState(() => ({ errorCurp: "Formato Invalido" }));
            }else{
                this.setState(() => ({ errorCurp: "" }));
            }

            if(this.state.nombre_new.trim() != "" && validateNombres.test(this.state.nombre_new) && this.state.apellido_new.trim() != "" &&  validateNombres.test(this.state.apellido_new) && this.state.curp_new.trim() != "" && validateCurp.test(this.state.curp_new.toUpperCase())){
                console.log('update')
                //this.modificarInformacion();
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
                                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0, marginBottom:5}}>
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
                        <Row>
                            <Col> 
                                <Text style = {{marginLeft:20, marginTop:15}}>Nombre (s)</Text>
                                <Input value={this.state.nombre_new} onChangeText={nombre_new => this.setState({ nombre_new })} style = {{borderBottomWidth: 0.5, width:200, marginLeft:20}}></Input>
                                {!!this.state.errorNombre && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0, marginLeft:20}}>{this.state.errorNombre}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text style = {{marginLeft:20, marginTop:15}}>Apellido (s)</Text>
                                <Input value={this.state.apellido_new} onChangeText={apellido_new => this.setState({ apellido_new })} style = {{borderBottomWidth: 0.5, width:200, marginLeft:20}}></Input>
                                {!!this.state.errorApellido && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0, marginLeft:20}}>{this.state.errorApellido}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text style = {{marginLeft:20, marginTop:15}}>CURP</Text>
                                <Input value={this.state.curp_new} onChangeText={curp_new => this.setState({ curp_new })} maxLength={18} style = {{borderBottomWidth: 0.5, width:200, marginLeft:20}}></Input>
                                {!!this.state.errorCurp && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:2, marginLeft:20}}>{this.state.errorCurp}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row><Col><Button block onPress={this.onValidateInput} style = {{marginLeft: 20, marginRight: 20, marginTop:20, backgroundColor:'#ff8834'}}><Text>Guardar</Text></Button></Col></Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default InformacionPersonal;