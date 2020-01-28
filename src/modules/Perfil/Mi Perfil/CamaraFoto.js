import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: this.props.navigation.getParam('nombre'),
            apellido: this.props.navigation.getParam('apellido'),
            curp: this.props.navigation.getParam('curp'),
            telefono: this.props.navigation.getParam('telefono'),
            correo: this.props.navigation.getParam('correo'),
            foto: null,  estado: 1,
            id_ciudad: this.props.navigation.getParam('id_ciudad'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_tipo_conductor: this.props.navigation.getParam('id_tipo_conductor'),
            type: Camera.Constants.Type.back,
            hasCameraPermission: null
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    enviar = () =>{
        
    }

    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({skipProcessing: true});
          this.setState({foto: photo.uri});
          this.props.navigation.push('FotoPerfilM',{id_usuario:this.state.id_usuario, nombre: this.state.nombre, apellido: this.state.apellido, curp: this.state.curp, 
          correo: this.state.correo, foto: this.state.foto, telefono: this.state.telefono, id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.id_tipo_conductor, estado: this.state.estado});
        }
    };

    PermissionsCamera = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        if(this.state.hasCameraPermission != null){
            this.setState({camera: true})
        }
    };


    
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
        return <View />;
        } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
        } else {           
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
                    <View
                        style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                        style={{
                            flex: 0.7,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-start',
                            marginLeft:15,
                            marginBottom:5
                        }}
                        onPress={() => {
                            this.setState({
                            type:
                                this.state.type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back,
                            });
                        }}>
                        <Ionicons name="md-reverse-camera" size={40} style={{color:'white'}}/>                
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            flex: 1,
                            alignSelf: 'flex-end',
                            alignItems: 'flex-start'
                        }}
                        onPress={this.takePicture}>
                        <Ionicons name="md-aperture" size={80} style={{color:'white'}}/>                
                        </TouchableOpacity>
                    </View>
                    </Camera>
                </View>
            );
        }
    }
}

export default Camara;