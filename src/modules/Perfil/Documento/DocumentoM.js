import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row, Button, Icon, H3, Card, CardItem, Body, Switch, View} from 'native-base';
import { withNavigation } from 'react-navigation';
import { FontAwesome5 } from '@expo/vector-icons';
import {NetInfo, Dimensions, ActivityIndicator} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class DocumentoM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DocumentoPrivado: null,
            DocumentoPublico: null,
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_cat_documento:'',
            fisica: true,
            moral: false,
            tipo_rfc: null,            
            estado_identificacion: '', comentario_identificacion:'', foto_identificacion: '',
            estado_licencia: '', comentario_licencia:'', foto_licencia: '',
            estado_carta: '', comentario_carta:'', foto_carta: '',
            estado_comprobante: '', comentario_comprobante:'', foto_comprabante: '',
            estado_pruebat: '', comentario_prueba:'', foto_prueba:'' ,loading: false
        };
    }

    IdentificacionOficial = () =>{
        this.props.navigation.navigate('IdentificacionOficialM', {id_usuario: this.state.id_usuario, comentario: this.state.comentario_identificacion, foto: this.state.foto_identificacion});
    }

    LicenciaConducir = () =>{
        this.props.navigation.navigate('LicenciaConducirM', {id_usuario: this.state.id_usuario, comentario: this.state.comentario_licencia, foto: this.state.foto_licencia});
    }

    CartaAntecedentes = () =>{
        this.props.navigation.navigate('CartaAntecedentesM', {id_usuario: this.state.id_usuario, comentario: this.state.comentario_carta, foto: this.state.foto_carta});
    }

    ComprobranteDM = () =>{
        this.props.navigation.navigate('ComprobanteDM', {id_usuario: this.state.id_usuario, comentario: this.state.comentario_comprobante, foto: this.state.foto_comprabante});
    }

    PruebaToxicologicaM = () =>{
        this.props.navigation.navigate('PruebaToxicologicaM', {id_usuario: this.state.id_usuario, comentario: this.state.comentario_prueba, foto: this.state.foto_prueba});
    }

    componentDidMount(){
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post('http://35.203.42.33:3000/consultar_doc1',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_identificacion: element["estado_out"],
                        comentario_identificacion: element["comentario_out"],
                        foto_identificacion: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc2',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({ 
                        estado_licencia: element["estado_out"],
                        comentario_licencia: element["comentario_out"],
                        foto_licencia: element["archivo_out"]
                    });        
                });
            });       
            axios.post('http://35.203.42.33:3000/consultar_doc8',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_carta: element["estado_out"],
                        comentario_carta: element["comentario_out"],
                        foto_carta: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc9',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_comprobante: element["estado_out"],
                        comentario_comprobante: element["comentario_out"],
                        foto_comprabante: element["archivo_out"]
                    });        
                });
            });
            axios.post('http://35.203.42.33:3000/consultar_doc10',{id_usuario: this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({
                        estado_pruebat: element["estado_out"],
                        comentario_prueba: element["comentario_out"],
                        foto_prueba: element["archivo_out"],
                        loading: true
                    });        
                });
            });
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }


    render() {
        if(this.state.loading == true){
            return (
                <Container>
                    <Content>
                        <Grid>                        
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
                            <Row style={{marginTop:10, marginBottom:20}}><Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><H3>Carge los siguientes documentos</H3></Col></Row>
                            <Row>
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Identificación oficial (IFE/INE/Pasaporte)</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_identificacion == 0  
                                        ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f"/>
                                        : this.state.estado_identificacion == 1
                                        ? <FontAwesome5 name='times-circle' size={15} color="red"/>
                                        : <FontAwesome5 name='check-circle' size={15} color="green"/> 
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
                                    {this.state.estado_licencia == 0 
                                        ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f"/>
                                        : this.state.estado_licencia == 1
                                        ? <FontAwesome5 name='times-circle' size={15} color="red"/>
                                        : <FontAwesome5 name='check-circle' size={15} color="green"/>   
                                    }  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.LicenciaConducir} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row >
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Carta de no antecedentes penales</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_carta == 0 
                                        ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f"/>
                                        : this.state.estado_carta == 1
                                        ? <FontAwesome5 name='times-circle' size={15} color="red"/>
                                        : <FontAwesome5 name='check-circle' size={15} color="green"/>   
                                    }  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.CartaAntecedentes} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row >
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Comprobante de domicilio</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_comprobante == 0 
                                        ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f"/>
                                        : this.state.estado_comprobante == 1
                                        ? <FontAwesome5 name='times-circle' size={15} color="red"/>
                                        : <FontAwesome5 name='check-circle' size={15} color="green"/>   
                                    }  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.ComprobranteDM} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row >
                                <Col style={{width:'75%', marginTop:8, marginLeft:12}}>
                                    <Text>Prueba toxicológica 3 elementos</Text>
                                </Col>
                                <Col style={{width:'10%',marginTop:11}}>
                                    {this.state.estado_pruebat == 0 
                                        ? <FontAwesome5 name='exclamation-circle' size={15} color="#f4d03f"/>
                                        : this.state.estado_pruebat == 1
                                        ? <FontAwesome5 name='times-circle' size={15} color="red"/>
                                        : <FontAwesome5 name='check-circle' size={15} color="green"/>   
                                    }  
                                </Col>
                                <Col style={{width:'14%'}}>
                                    <Button onPress={this.PruebaToxicologicaM} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                </Col>
                            </Row>
                            <Row style={{marginTop:20}}><Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}><Text>Datos Fiscales</Text></Col></Row>
                            <Row style={{marginTop:60}}><Col style={{marginLeft:10}}><Text>Por favor vuelva a cagar los documentos marcados con una <Text style={{color:'red'}}>X</Text>, asegúrese que sea el documento que se solicita, que contenga la información visible y clara.</Text></Col></Row>
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

export default withNavigation(DocumentoM);