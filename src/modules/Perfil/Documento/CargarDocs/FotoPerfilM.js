import React, { Component } from 'react';
import { Container, Content, Button,Grid, Col, Row, Text} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

class FotoPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            id_usuario: this.props.navigation.getParam('id_usuario'),
            imageCargada: this.props.navigation.getParam('foto'),
            estado: this.props.navigation.getParam('estado'),
        };
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});

        if (result.cancelled) {
            this.setState({ image: ""});
        }else{
            this.setState({ image: result.uri });
        }

        if(this.state.image != ""){
            this.props.navigation.navigate('CargarFotoM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:3})
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
            this.props.navigation.navigate('CargarFotoM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:3})
        }
    };

    openCamera = () => {
        this.props.navigation.navigate('CamaraM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:3, estado: this.state.estado})
    };

    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row style={{marginTop:30}}>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center'}}>
                            <FontAwesome5 name='user-circle' size={150} style={{color:'#ff8834'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center', fontWeight:'bold'}}>Foto de Perfil</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Asegúrese que la imagen sean legible.</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center', marginTop:10, marginLeft:20, marginRight:20}}>
                            <Text style = {{textAlign:'center'}}>Carge una foto que sea reciente.</Text>
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

export default FotoPerfil;