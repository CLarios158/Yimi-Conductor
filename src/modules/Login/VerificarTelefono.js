import React, { Component } from 'react';
import { Container, Content, Text, Input, CheckBox, Button, Grid, Col, Row, H3} from 'native-base';
import axios from 'axios'
import {View, NetInfo, Dimensions} from 'react-native';
import {AsyncStorage} from 'react-native';
const { width } = Dimensions.get('window');

class VerificarTelefono extends Component {
    constructor(props) {
        super(props);
        this.state = {
          telefono: '',
          isConnected: true /*this.props.navigation.getParam('isConnected')*/
          //respuesta: ''
        };
    }

    sendCode = () => { 
        if(this.state.isConnected != false){
            axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono});
            this.setState(() => ({ nameError: "" }));
            this.props.navigation.navigate('CodigoVerificacion',{telefono: this.state.telefono});
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

    Legal = () =>{
        this.props.navigation.navigate('Legal');
    }

    validatePhone = () =>{
        var validate = /^[0-9]{10}$/;
        if(this.state.isConnected != false){
            axios.post('http://35.203.42.33:3000/validar_cuenta',{campo: this.state.telefono})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                    respuesta: element["respuesta"]
                    })  
                });
                if(validate.test(this.state.telefono) && this.state.telefono.trim() != "" && this.state.respuesta == 0){
                    this.setState(() => ({ nameError: "" }));
                    this.sendCode();
                }else if(this.state.respuesta == 1){
                    this.setState(() => ({ nameError: "Número de Teléfono Existente" }));
                }else{
                    this.setState(() => ({ nameError: "Favor de ingresar 10 dígitos" }));
                } 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }) 
        } 
    }

    onValidateInput= () =>{        
        if(this.state.isConnected != false){ 
            if (this.state.telefono.trim() === "") {
                this.setState(() => ({ nameError: "Campo obligatorio" }));
            } else { 
                this.validatePhone();  
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
                                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'absolute', margin:0}}>
                                <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                                </View> 
                                :<View></View>
                            }
                        </Row>
                        <Row style = {{marginTop: 80}}><Col style={{display:'flex',alignContent: 'center', alignItems: 'center'}}><H3>Ingresa tu número de teléfono</H3></Col></Row>
                        <Row>
                            <Col style={{display:'flex',alignContent: 'center', alignItems: 'center'}}>
                                <Input value={this.state.telefono} onChangeText={(telefono) => this.setState({ telefono })} maxLength={10} style = {{borderBottomWidth: 0.5, marginBottom:20, textAlign :'center', marginTop: 20, width:250}} placeholder='Número de teléfono' keyboardType = "numeric"/>
                            </Col> 
                        </Row>
                        <Row>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginBottom:5}}>
                            {!!this.state.nameError && (
                                <Text style={{ color: "red", fontSize:11}}>{this.state.nameError}</Text>
                            )}
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{width:20, marginLeft:80}}><CheckBox checked={true}  style={{backgroundColor:'#ff8834', borderColor:'#ff8834'}}/></Col>
                            <Col style={{marginRight:60}}><Button onPress={this.Legal} transparent style={{height:20}}><Text style={{color:'gray'}}>Acepto términos y condiciones</Text></Button></Col>  
                        </Row>
                        <Row style={{marginTop:40}}>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                                <Button onPress={this.onValidateInput} block style={{backgroundColor:'#ff8834'}}><Text> Siguiente </Text></Button>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default VerificarTelefono;