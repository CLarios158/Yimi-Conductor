import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, View, Thumbnail} from 'native-base';
import {NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

class ComprobanteDomicilio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
            id_usuario: this.props.navigation.getParam('id_usuario'),
            comentario: this.props.navigation.getParam('comentario'),
            imageCargada: this.props.navigation.getParam('foto'), isConnected: true
        };
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});
        
        if (result.cancelled) {
            this.setState({ image: ""});
        }else{
            this.setState({ image: result.uri });
        }
        
        if(this.state.image != ""){
            this.props.navigation.navigate('CargarComprobanteM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:9})
        }
    };

    cameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({});
        
        if (result.cancelled) {
            this.setState({ image: ""});
        }else{
            this.setState({ image: result.uri });
        }
        
        if(this.state.image != ""){
            this.props.navigation.navigate('CargarComprobanteM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:9})
        }
    };

    openCamera = () => {
        this.props.navigation.navigate('CamaraM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:9, estado: this.state.estado})
    };

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
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:20}}>
                            <Thumbnail style={{ height: 250, width: 200,resizeMode: 'contain', borderRadius:5}} square source= {{uri:this.state.imageCargada}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', fontWeight:'bold'}}>Comprobante de Domicilio</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{color:'red', textAlign:'center'}}>{this.state.comentario}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Asegúrese que la información y la imagen sean legibles.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Sube una foto de tu Comprobante de Domicilio que no sea mayor a 3 meses de expedición.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Si la imagen no es clara vuele a tomar otra foto o carga otra imagen.</Text>
                        </Col>
                    </Row>
                    <Row style={{marginTop:50}}>
                        <Col style={{paddingLeft:120}}>
                            <Button onPress={this.cameraImage} transparent><FontAwesome5 name='camera' size={40}/></Button>
                        </Col>
                        <Col>
                            <Button onPress={this.pickImage} transparent><FontAwesome5 name='images' size={40}/></Button>
                        </Col>
                    </Row>
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default ComprobanteDomicilio;