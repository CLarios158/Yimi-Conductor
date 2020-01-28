import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Switch} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {View, NetInfo, Dimensions, ActivityIndicator} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class SeguridadCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '', apellido: '', curp: '',
            telefono: '', correo: '', foto: '',
            id_ciudad: '', id_tipo_conductor: '',
            loading: false, isConnected: true,
            id_usuario: this.props.navigation.getParam('id_usuario')
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            axios.post('http://35.203.42.33:3000/consultar_usuario',{id_usuario:this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({                        
                        foto: element["fotografia_out"],
                        nombre: element["nombre_out"], 
                        apellido: element["apellido_out"], 
                        curp: element["curp_out"],
                        telefono: element["telefono_out"],
                        correo: element["correo_out"],
                        id_ciudad: element["fk_id_ciudad_out"],
                        id_tipo_conductor: element["fk_id_conductor_out"],
                        loading: true
                    });         
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });         
        });
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener.remove();
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    goPassword = () =>{
        this.props.navigation.navigate('Contrasena',{id_usuario:this.state.id_usuario});
    }

    telefono = () =>{
        this.props.navigation.navigate('Telefono',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
        correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor}); 
    }

    goCorreo = () =>{
        this.props.navigation.navigate('Correo',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
        correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor});
    }

    render() {
        if(this.state.loading == true){
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
                            <Row>
                                <Col>
                                    <Card >
                                        <CardItem >
                                            <Body>
                                                <Row>
                                                    <Col>
                                                        <ListItem style={{borderBottomWidth:0, height:0}}>
                                                            <Left>
                                                                <Text>Contraseña</Text>
                                                            </Left>
                                                            <Right>
                                                                <Button onPress={this.goPassword} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                            </Right>
                                                        </ListItem>
                                                    </Col>
                                                </Row>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card>
                                        <CardItem>
                                            <Body>
                                                <Row>
                                                    <Col>
                                                        <ListItem style={{borderBottomWidth:0, height:0}}>
                                                            <Left>
                                                                <Text>Número de teléfono</Text>
                                                            </Left>
                                                            <Right>
                                                                <Button onPress={this.telefono} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                            </Right>
                                                        </ListItem>
                                                    </Col>
                                                </Row>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Card>
                                        <CardItem>
                                            <Body>
                                                <Row>
                                                    <Col>
                                                        <ListItem style={{borderBottomWidth:0, height:0}}>
                                                            <Left>
                                                                <Text>Correo</Text>
                                                            </Left>
                                                            <Right>
                                                                <Button onPress={this.goCorreo} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                            </Right>
                                                        </ListItem>
                                                    </Col>
                                                </Row>
                                            </Body>
                                        </CardItem>
                                    </Card>
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

export default SeguridadCuenta;