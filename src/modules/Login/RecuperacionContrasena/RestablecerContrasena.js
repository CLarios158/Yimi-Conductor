import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Thumbnail, Radio} from 'native-base';
import {View, NetInfo, Dimensions, ActivityIndicator} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class RestablecerContraseña extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id_usuario: this.props.navigation.getParam('id_usuario'),
          telefono: '', nombre: '', apellido: '',
          correo: '', telefono: '', foto:'', isConnected: true,
          sendEmail: false, sendPhone: true, loading: false
        };
    }

    sendCodePhone = () => { 
        axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono}); 
    }

    sendCodeEmail = () => { 
        axios.post('http://35.203.42.33:3000/mail',{correo: this.state.correo}); 
    }

    CodigoV = () => { 
        if(this.state.isConnected == true){
            if(this.state.sendPhone == true){
                this.sendCodePhone();
                this.props.navigation.navigate('CodigoVerificacionContraseña', {id_usuario: this.state.id_usuario, telefono: this.state.telefono});
            } else{
                this.sendCodeEmail();
            }
        }
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        axios.post('http://35.203.42.33:3000/consultar_usuario',{id_usuario:this.state.id_usuario})
        .then(response => {
            response.data.data.forEach(element => {
                this.setState({
                    nombre: element["nombre_out"],
                    correo: element["correo_out"],
                    telefono: element["telefono_out"],
                    foto: element["fotografia_out"],
                    loading: true
                });         
            });
            if(this.state.foto == ""){
                this.setState({foto: "https://www.webespacio.com/wp-content/uploads/2010/12/perfil-facebook.jpg"})
            }else{
                this.state.foto = this.state.foto 
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    };

    onClickRadio1 = () =>{
        if(this.state.sendPhone == true){
          this.setState({ sendPhone: false});
        }else{
          this.setState({ sendPhone: true, sendEmail:false });
        }
    }
    
    onClickRadio2 = () =>{
        if(this.state.sendEmail == true){
          this.setState({ sendEmail: false });
        }else{
          this.setState({ sendEmail: true, sendPhone:false });
        }
    }

    goLogin = () =>{
        this.props.navigation.navigate('Login');
    }

    render() {
        if(this.state.loading == true){
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
                            <Row style={{marginTop:27, marginBottom:20}}>
                                <Col style={{marginLeft:12}}>
                                    <Text style={{fontSize:15, textAlign:'left'}}>Te enviaremos un código que podras usar para recuperar tu contraseña.</Text>
                                </Col> 
                            </Row>
                            <Row  style={{marginLeft:30, marginRight:30, borderRightWidth:1, borderLeftWidth:1, borderTopWidth:1}}>
                                <Col style={{width:55,paddingTop:10, paddingBottom:10, paddingLeft:10}}>
                                    <Thumbnail style={{height:45, width:45, borderRadius:50}} source= {this.state.foto ? {uri: this.state.foto} : null}/>                                
                                </Col>
                                <Col style={{paddingTop:10, paddingBottom:10}}>
                                    <Text style={{fontWeight:'bold', marginLeft:10, fontSize:18, marginTop:12}}>{this.state.nombre}</Text>
                                </Col> 
                            </Row>
                            <Row style={{marginLeft:30, marginRight:30, borderRightWidth:1, borderLeftWidth:1, borderTopWidth:1}}>
                                <Col style={{width:25,marginLeft:10,paddingTop:10}}>
                                    <Radio onPress={this.onClickRadio1} selected={this.state.sendPhone} />                               
                                </Col>
                                <Col style={{paddingTop:10}}>
                                    <Text>Enviar código por SMS</Text> 
                                </Col> 
                            </Row>
                            <Row style={{marginLeft:30, marginRight:30, borderRightWidth:1, borderLeftWidth:1, borderBottomWidth:1}}>
                                <Col style={{marginLeft:38, paddingBottom:10}}>
                                    <Text>{this.state.telefono}</Text>                              
                                </Col> 
                            </Row>
                            <Row style={{marginLeft:30, marginRight:30, borderRightWidth:1, borderLeftWidth:1}}>
                                <Col style={{width:25,marginLeft:10,paddingTop:10}}>
                                    <Radio onPress={this.onClickRadio2} selected={this.state.sendEmail}/>                               
                                </Col>
                                <Col style={{paddingTop:10}}>
                                    <Text>Enviar código por correo</Text> 
                                </Col> 
                            </Row>
                            <Row style={{marginLeft:30, marginRight:30, borderRightWidth:1, borderLeftWidth:1, borderBottomWidth:1}}>
                                <Col style={{marginLeft:38, paddingBottom:10}}>
                                    <Text>{this.state.correo}</Text>                              
                                </Col> 
                            </Row>
                            <Row style={{marginTop:40}}>
                                <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                                    <Button onPress={this.CodigoV} block style={{backgroundColor:'#ff8834'}}><Text>Enviar</Text></Button>
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}>
                                <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                                    <Button onPress={this.goLogin} block style={{backgroundColor:'#ff8834'}}><Text>Iniciar Sesión</Text></Button>
                                </Col>
                            </Row>
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

export default RestablecerContraseña;