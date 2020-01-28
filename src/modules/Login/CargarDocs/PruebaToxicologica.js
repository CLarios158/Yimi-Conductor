import React, { Component } from 'react';
import { Container, Content, Button,Grid, Col, Row, Text, Thumbnail} from 'native-base';
import {View, NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

class PruebaToxicologica extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            image: null, isConnected: true,
            id_usuario: this.props.navigation.getParam('id_usuario'),
            imageCargada: this.props.navigation.getParam('foto'),
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

    pickImage = async () => {
        if(this.state.isConnected != false){
            let result = await ImagePicker.launchImageLibraryAsync({});
            
            if (result.cancelled) {
                this.setState({ image: ""});
            }else{
                this.setState({ image: result.uri });
            }
            
            if(this.state.image != ""){
                this.props.navigation.navigate('CargarPruebaT',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:10, estado: this.state.estado})
            }
        }
    };

    cameraImage = async () => {
        if(this.state.isConnected != false){
            let result = await ImagePicker.launchCameraAsync({});
            
            if (result.cancelled) {
                this.setState({ image: ""});
            }else{
                this.setState({ image: result.uri });
            }
            
            if(this.state.image != ""){
                this.props.navigation.navigate('CargarPruebaT',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:10, estado: this.state.estado})
            }
        }
    };

    openCamera = () => {
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Camara',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:10, estado: this.state.estado})
        }
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
                        {this.state.estado == 0
                            ?<Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:20}}>
                                <Thumbnail style={{ height: 250, width: 200, resizeMode: 'contain', borderRadius:5}} square source= {{uri:this.state.imageCargada}} />
                             </Col>
                            :<Col style={{display:'flex',alignItems:'center',alignContent:'center', marginTop:50}}><FontAwesome5 name='file-alt' size={150} style={{color:'#ff8834'}}/></Col>
                            
                        }
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', fontWeight:'bold'}}>Prueba Toxicológica 3 elementos</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Asegúrese que la información y la imagen sean legibles.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Sube una foto de tu Prueba Toxicológica que sea vigente.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Si la imagen no es clara vuele a tomar otra foto o sube otra imagen.</Text>
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

export default PruebaToxicologica;