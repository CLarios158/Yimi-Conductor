import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row, Button, Icon, H3} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import {View, NetInfo, Dimensions, ActivityIndicator, AsyncStorage} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class Documento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            telefono: this.props.navigation.getParam('telefono'),
            pass: this.props.navigation.getParam('pass'),
            estado_identificacion: null, foto_identificacion:'',
            estado_licencia: null, foto_licencia:'',
            estado_foto: null, foto_perfil: '',
            estado_carta: null, foto_carta:'',
            estado_pruebat: null, foto_prueba:'',
            estado_comprobante: null, foto_comprobante:'',
            isConnected: true, loading: false
        };
    }

    SaveStatus = async () => {
        let complete = '1';
        try {
    
          await AsyncStorage.setItem('completeDocs', complete);
    
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post('http://35.203.42.33:3000/consultar_doc1',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_identificacion: element["estado_out"],
                        foto_identificacion: element["archivo_out"],
                    });    
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc2',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({ 
                        estado_licencia: element["estado_out"],
                        foto_licencia: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc3',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_foto: element["estado_out"],
                        foto_perfil: element["archivo_out"]
                    });        
                });
            });        
            axios.post('http://35.203.42.33:3000/consultar_doc8',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_carta: element["estado_out"],
                        foto_carta: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc9',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_comprobante: element["estado_out"],
                        foto_comprobante: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc10',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_pruebat: element["estado_out"],
                        foto_prueba: element["archivo_out"],
                    });        
                });
            });
            this.setState({loading: true});
        })
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener.remove();
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    IdentificacionOficial = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('IdentificacionOficial', {id_usuario: this.state.id_usuario, estado: this.state.estado_identificacion, foto: this.state.foto_identificacion});
        }
    }

    LicenciaConducir = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('LicenciaConducir', {id_usuario: this.state.id_usuario, estado: this.state.estado_licencia, foto: this.state.foto_licencia})
        }
    }

    CartaAntecedentes = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('CartaAntecedentes', {id_usuario: this.state.id_usuario, estado: this.state.estado_carta, foto: this.state.foto_carta})
        }
    }

    ComprobanteD = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('ComprobanteD', {id_usuario: this.state.id_usuario, estado: this.state.estado_comprobante, foto: this.state.foto_comprobante})
        }
    }

    PruebaToxicologixa = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('PruebaToxicologica', {id_usuario: this.state.id_usuario, estado: this.state.estado_pruebat, foto: this.state.foto_prueba})
        }
    }

    FotoPerfil = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('FotoPerfil', {id_usuario: this.state.id_usuario, estado: this.state.estado_foto, foto: this.state.foto_perfil})
        }
    }
    
    onValidateInput= () =>{
        
        if(this.state.estado_licencia == 0 
            && this.state.estado_identificacion == 0 
            && this.state.estado_foto == 0 
            && this.state.estado_carta == 0
            && this.state.estado_comprobante == 0 
            && this.state.estado_pruebat == 0){
            this.setState({ errorDoc: ""});
            this.SaveStatus();    
            this.props.navigation.navigate('CuentaBancariaRegistro', {id_usuario: this.state.id_usuario, telefono: this.state.telefono, pass: this.state.pass});
        }else{
            this.setState(() => ({ errorDoc: "Por favor cargue todos los documentos correctamente" }));
        }
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
                            <Row style={{marginTop:10, marginBottom:20}}><Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><H3>Cargue los siguientes documentos</H3></Col></Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Identificación oficial (IFE/INE/Pasaporte)</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_identificacion == null 
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.IdentificacionOficial} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Licencia de Conducir</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_licencia == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.LicenciaConducir} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>                        
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Foto de Perfil</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_foto == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.FotoPerfil} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Carta de no antecedentes penales</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_carta == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.CartaAntecedentes} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Comprobante de domicilio</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_comprobante == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.ComprobanteD} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Prueba toxicológica 3 elementos</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_pruebat == null  
                                        ? <Text style={{fontSize:10}}>Cargar</Text>
                                        : <FontAwesome5 name='file-archive' size={20} color="#ff8834" style={{paddingLeft:10}}/>  
                                    }                                  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.PruebaToxicologixa} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row style={{marginTop:15}}>
                                <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                                    {!!this.state.errorDoc && (
                                        <Text style={{ color: "red", fontSize:13}}>{this.state.errorDoc}</Text>
                                    )}
                                </Col>
                            </Row>                       
                            <Row><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, marginTop:20, marginBottom:20, backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button></Col></Row>
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

export default withNavigation(Documento);