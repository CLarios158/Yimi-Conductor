import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class Camara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_cat_documento: this.props.navigation.getParam('id_cat_documento'),
            estado: this.props.navigation.getParam('estado'),
            type: Camera.Constants.Type.back,
            hasCameraPermission: null
        };
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    takePicture = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({skipProcessing: true});
          this.setState({image: photo.uri})
          
          if(this.state.id_cat_documento == 1){
            this.props.navigation.navigate('CargarIdentificacionM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento: this.state.id_cat_documento, estado: this.state.estado})
          }
          
          if(this.state.id_cat_documento == 2){
            this.props.navigation.navigate('CargarLicenciaM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:this.state.id_cat_documento, estado: this.state.estado})
          }
          
          if(this.state.id_cat_documento == 8){
            this.props.navigation.navigate('CargarCartaM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:this.state.id_cat_documento, estado: this.state.estado})
          }

          if(this.state.id_cat_documento == 9){
            this.props.navigation.navigate('CargarComprobanteM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:this.state.id_cat_documento, estado: this.state.estado})
          }

          if(this.state.id_cat_documento == 10){
            this.props.navigation.navigate('CargarPruebaTM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:this.state.id_cat_documento, estado: this.state.estado})
          }

          if(this.state.id_cat_documento == 3){
            this.props.navigation.navigate('CargarFotoM',{image: this.state.image, id_usuario: this.state.id_usuario, id_cat_documento:this.state.id_cat_documento, estado: this.state.estado})
          }
          
          
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