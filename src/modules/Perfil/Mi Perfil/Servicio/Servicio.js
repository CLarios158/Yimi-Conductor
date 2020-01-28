import React, { Component } from 'react';
import { Container, Content, Grid, Col, Row, Text, View, Button, Card, CardItem, Body, Switch} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {NetInfo, Dimensions, Alert, ActivityIndicator, Picker} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class Servicio extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.navigation.getParam('nombre'),
            apellido: this.props.navigation.getParam('apellido'),
            curp: this.props.navigation.getParam('curp'),
            telefono: this.props.navigation.getParam('telefono'),
            correo: this.props.navigation.getParam('correo'),
            foto: this.props.navigation.getParam('foto'),
            id_ciudad: this.props.navigation.getParam('id_ciudad'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_tipo_conductor: this.props.navigation.getParam('id_tipo_conductor'),
            array: this.props.navigation.getParam('array'), isConnected: true, loading: false
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
    };

    updateTipoConductor = () =>{
        if(this.state.isConnected != false){
            axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido:this.state.apellido, correo: this.state.correo,
            num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
            .then(response=> {
                Alert.alert(
                    'Aviso',
                    'Se actualizo tu tipo de servicio con éxito!',
                    [
                    {text: 'OK'}
                    ]
                );
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
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
                        <Row>
                            <Col>
                                <Text style={{marginTop:10, marginLeft:6, marginBottom:10}}>Seleccione un tipo de servicio</Text>
                                <View style={{borderWidth:1,  borderColor:'lightgray', borderStyle:'solid', marginLeft:6, marginRight:6}}>
                                    <Picker 
                                        mode="dropdown"
                                        selectedValue={this.state.id_tipo_conductor}
                                        onValueChange={(itemValue) => this.setState({ id_tipo_conductor: itemValue  })}
                                        >
                                        {
                                        this.state.array.map((item) => {
                                            return (< Picker.Item label={item.nombre} key={item.id} value={item.id}/>);})
                                        }   
                                    </Picker>
                                </View>
                                <Button block onPress={this.updateTipoConductor} style = {{marginLeft: 20, marginRight: 20, marginTop:20, backgroundColor:'#ff8834'}}><Text>Guardar</Text></Button>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Servicio;