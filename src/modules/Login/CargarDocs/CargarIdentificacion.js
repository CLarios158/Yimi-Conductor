import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, Thumbnail} from 'native-base';
import {View, NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class IdentificacionOficial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.navigation.getParam('image'), isConnected: true,
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_cat_documento: this.props.navigation.getParam('id_cat_documento'),
            estado: this.props.navigation.getParam('estado')
        };
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

    CargarDocumento = () =>{
        if(this.state.isConnected != false ){
            if(this.state.estado != 0){
                axios.post('http://35.203.42.33:3000/registrar_documento',{archivo: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento: this.state.id_cat_documento, tipo_rfc: null})
                .then(response => {
                    console.log('Cargo Identificacion');
                    this.props.navigation.navigate('DocumentoRegistro', {id_usuario: this.state.id_usuario});
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
            }else{            
                axios.put('http://35.203.42.33:3000/modificar_documento',{id_usuario: this.state.id_usuario, archivo: this.state.image, id_cat_documento: this.state.id_cat_documento, tipo_rfc: null})
                .then(response => {
                    console.log('Modifico Identificacion');
                    this.props.navigation.navigate('DocumentoRegistro', {id_usuario: this.state.id_usuario});
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
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
                    <Row style={{marginTop:30}}>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center'}}>
                            <Thumbnail style={{ width: 350, height: 400, resizeMode: 'contain', borderRadius: 5}} square source= {{uri:this.state.image}} />
                        </Col>
                    </Row>
                    {this.state.estado != 0
                        ?<Row>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                                <Button onPress={this.CargarDocumento} block style={{backgroundColor:'#ff8834'}}><Text> Cargar </Text></Button>
                            </Col>
                         </Row>
                        :<Row>
                            <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                                <Button onPress={this.CargarDocumento} block style={{backgroundColor:'#ff8834'}}><Text> Subir de nuevo </Text></Button>
                            </Col>
                        </Row>
                    }
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default IdentificacionOficial;