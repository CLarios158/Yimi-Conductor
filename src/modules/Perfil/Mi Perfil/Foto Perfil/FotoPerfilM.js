import React, { Component } from 'react';
import { Container, Content, Button,Grid, Col, Row, Thumbnail, Text} from 'native-base';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';
import axios from 'axios';

class FotoPerfilM extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: (
            <TouchableOpacity onPress={() => navigation.navigate('MiPerfil')}>
                <Button transparent style={{paddingLeft:15}}><FontAwesome5 size={18} style={{color:'black'}} name="arrow-left" /></Button>
            </TouchableOpacity> 
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.navigation.getParam('nombre'),
            apellido: this.props.navigation.getParam('apellido'),
            curp: this.props.navigation.getParam('curp'),
            telefono: this.props.navigation.getParam('telefono'),
            correo: this.props.navigation.getParam('correo'),
            foto: this.props.navigation.getParam('foto'), foto2: '', 
            estado: this.props.navigation.getParam('estado'),
            id_ciudad: this.props.navigation.getParam('id_ciudad'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_tipo_conductor: this.props.navigation.getParam('id_tipo_conductor')
        };
    }

    componentDidMount(){
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            if(this.state.estado == 1){
                axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido:this.state.apellido, correo: this.state.correo,
                num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
                .then(response=> {
                    Alert.alert(
                        'Aviso',
                        'Se actualizo tu foto con éxito!',
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
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({});

        if (result.cancelled) {
            
        }else{
            this.setState({ foto: result.uri });
            axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido:this.state.apellido, correo: this.state.correo,
            num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
            .then(response=> {
                Alert.alert(
                    'Aviso',
                    'Se actualizo tu foto con éxito!',
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

    };

    cameraImage = async () => {
        let result = await ImagePicker.launchCameraAsync({});

        if (result.cancelled) {
            
        }else{
            this.setState({ foto: result.uri });
            axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido:this.state.apellido, correo: this.state.correo,
            num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
            .then(response=> {
                Alert.alert(
                    'Aviso',
                    'Se actualizo tu foto con éxito!',
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

    };

    deletePhoto = () =>{
        this.setState({foto2: "https://coffschamber.com.au/wp-content/uploads/2019/02/RAY.jpg"});
        axios.put('http://35.203.42.33:3000/modificar_usuario',{id_usuario: this.state.id_usuario, nombre: this.state.nombre, apellido:this.state.apellido, correo: this.state.correo,
        num_telefono: this.state.telefono, curp: this.state.curp, foto: this.state.foto2, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor})
        .then(response=> {
            this.setState({foto: this.state.foto2});
            Alert.alert(
                'Aviso',
                'Se actualizo tu foto con éxito!',
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

    openCamera = () =>{
        this.props.navigation.navigate('CamaraFoto',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
        correo: this.state.correo, telefono: this.state.telefono, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor});
    }

    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row style={{marginTop:50}}>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center'}}>
                            <Thumbnail  style={{height:200, width:200, borderRadius:100, padding:0}}  source={this.state.foto ? {uri: this.state.foto} : null}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:200}}>
                        <Col>
                            <Button style={{alignSelf:'center'}} onPress={this.cameraImage} transparent><FontAwesome5 name='camera' size={40}/></Button>
                        </Col>
                        <Col>
                            <Button  style={{alignSelf:'center'}} onPress={this.pickImage} transparent><FontAwesome5 name='images' size={40}/></Button>
                        </Col>
                        <Col>
                            <Button  style={{alignSelf:'center'}} onPress={this.deletePhoto} transparent><FontAwesome5 name='trash-alt' size={40}/></Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop:20}}>
                        <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                            <Button onPress={() => this.props.navigation.navigate('MiPerfil')} block style={{backgroundColor:'#ff8834'}}><Text> Siguiente </Text></Button>
                        </Col>
                    </Row>
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default withNavigation(FotoPerfilM);