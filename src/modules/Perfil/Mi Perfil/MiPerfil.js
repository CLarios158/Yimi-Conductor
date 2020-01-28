import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Switch, Thumbnail, View} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import {NetInfo, Dimensions, ActivityIndicator} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class MiPerfil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '', apellido: '', curp: '',
            telefono: '', correo: '', foto: '',
            id_ciudad: '', id_tipo_conductor: '', array: [],
            loading: false, isConnected: true, vigencia: '',
            nombre_propietario: '', apellido_propietario: '',
            num_cuenta: '', clabe: '', tipo_banco: '', tipo_pago: '',
            id_usuario: this.props.navigation.getParam('id_usuario')
        }
        
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            axios.post('http://35.203.42.33:3000/VigenciaStatus',{id_usuario:this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({vigencia: element["vigencia"]});         
                });
            }).catch(function (error) {
                // handle error
                console.log(error);
            }); 
            axios.get('http://35.203.42.33:3000/consultar_banco')
            .then(response => {
                response.data.data.forEach(element => {
                    this.state.array.push({'id': element['id_banco'],"nombre":element['nombre_banco']});   
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
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
                        id_tipo_conductor: element["fk_id_conductor_out"]

                    });         
                });
                if(this.state.foto == ""){
                    this.setState({foto: 'https://coffschamber.com.au/wp-content/uploads/2019/02/RAY.jpg', loading: true});
                }else{
                    this.setState({loading: true});
                    this.state.foto = this.state.foto 
                }
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
    };
        
    goTipoServicio = () =>{
        const array = [];
        if(this.state.isConnected != false){    
            axios.get('http://35.203.42.33:3000/consultar_tipo_conductor')
            .then(response => {
                response.data.data.forEach(element => {
                    array.push({"id": element['id_tipo_conductor'],"nombre":element['nombre_tipo_conductor']});
                    this.props.navigation.navigate('Servicio',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
                    correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor, array: array});
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }); 
        }
    }

    goCiudad = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Ciudad',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
            correo: this.state.correo, telefono: this.state.telefono, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor});
        }
    }

    goDatosBancarios = () =>{
        this.props.navigation.navigate('CuentaBancaria',{id_usuario:this.state.id_usuario, array: this.state.array});    
        this.setState({array: []}); 
    }

    goInformacionPersonal = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('InformacionPersonal',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp});
        }
    }

    goFoto = () =>{
        this.props.navigation.navigate('FotoPerfilM',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
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
                                <Card style={{height:70}}>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col style={{width:'18%'}}>
                                                    <View style={{position:'absolute'}}>
                                                        <TouchableOpacity onPress={this.goFoto}>
                                                            <Thumbnail  style={{height:55, width:55, borderRadius:50, padding:0}}  source={this.state.foto ? {uri: this.state.foto} : null}/>
                                                        </TouchableOpacity>   
                                                    </View>                                                                                  
                                                </Col>
                                                <Col style={{width:'40%'}}>
                                                    <Text style={{fontSize:16, fontWeight:'bold',paddingTop:15}}>{this.state.nombre}</Text>
                                                </Col>
                                                <Col style={{width:'42%'}}>
                                                    <Text style={{textAlign:'right'}}>En evaluación</Text>
                                                    <Text style={{textAlign:'right'}}>Expira {this.state.vigencia}</Text>
                                                </Col>
                                            </Row> 
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card style={{height:55}}>
                                    <CardItem>
                                        <Body>                                            
                                            <Row>
                                                <Col style={{marginTop:5, width:'25%'}}>
                                                    <Text style={{paddingLeft:20}}>Nombre</Text>
                                                </Col>
                                                <Col style={{marginTop:5, width:'75%'}}>
                                                    <Text style={{textAlign:'right'}}>{this.state.nombre} {this.state.apellido}</Text>
                                                </Col>
                                            </Row>                                            
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card style={{height:55}}>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col style={{marginTop:5, width:'20%'}}>
                                                    <Text style={{paddingLeft:20}}>CURP</Text>
                                                </Col>
                                                <Col style={{marginTop:5, width:'80%'}}>
                                                    <Text style={{textAlign:'right'}}>{this.state.curp}</Text>
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
                                                        <Left style={{maxWidth:150}}>
                                                            <Text>Tipo de Servicio</Text>                                                            
                                                        </Left>
                                                        <Right>
                                                            {this.state.id_tipo_conductor == null 
                                                                ? <Text style={{fontSize:12}}></Text>
                                                                : this.state.id_tipo_conductor == 1
                                                                ? <Text style={{fontSize:12}}> Taxista</Text>
                                                                : this.state.id_tipo_conductor == 2
                                                                ? <Text style={{fontSize:12}}> Fletero</Text> 
                                                                : <Text style={{fontSize:12}}> Repartidor</Text> 
                                                            }
                                                        </Right>
                                                        <Right style={{maxWidth:50}}>                                                            
                                                            <Button onPress={this.goTipoServicio} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
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
                                                        <Left style={{maxWidth:150}}>
                                                            <Text>Ciudad</Text>                                                            
                                                        </Left>
                                                        <Right>
                                                            {this.state.id_ciudad == null 
                                                                ? <Text style={{fontSize:12}}></Text>
                                                                : this.state.id_ciudad == 1
                                                                ? <Text style={{fontSize:12}}> Colima</Text>
                                                                : this.state.id_ciudad == 2
                                                                ? <Text style={{fontSize:12}}> Manzanillo</Text> 
                                                                : <Text style={{fontSize:12}}></Text>
                                                            }
                                                        </Right>
                                                        <Right style={{maxWidth:50}}>
                                                            <Button onPress={this.goCiudad} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
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
                                                            <Text>Cuenta bancaria</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.goDatosBancarios} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
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
                                                            <Text>Editar información personal</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.goInformacionPersonal} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
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

export default withNavigation(MiPerfil);