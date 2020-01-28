import React, { Component } from 'react';
import { AsyncStorage, View, NetInfo, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
const { width } = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container, Content, Text, Input, Button, Grid, Col, Row, Picker,Icon, H3} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

class InformacionPersonal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry1: true, secureTextEntry2: true,
            nombre: '', apellido: '', curp:'', correo:'',
            contrasena: '', contrasena2: '', repeat: 0,
            id_ciudad: '', array:[], array_tipo_conductor:[],id_usuario:'',
            telefono: this.props.navigation.getParam('telefono'),
            isConnected: true, tipo_conductor: 1, extraScrollHeight: 0
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        axios.get('http://35.203.42.33:3000/CiudadesOnline')
        .then(response => {
            response.data.data.forEach(element => {
            this.state.array.push({'id': element['id_ciudad'],"nombre":element['nombre_ciudad']});
            this.setState({array: this.state.array});     
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
        axios.get('http://35.203.42.33:3000/consultar_tipo_conductor')
        .then(response => {
            response.data.data.forEach(element => {
              this.state.array_tipo_conductor.push({'id': element['id_tipo_conductor'],"nombre":element['nombre_tipo_conductor']});
              this.setState({
                array_tipo_conductor: this.state.array_tipo_conductor
              });     
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    SaveSession = async () => {
        let docs = '0';
        let bank = '0';
        
        try {
    
          await AsyncStorage.setItem('completeDocs', docs);
          await AsyncStorage.setItem('completeBank', bank);
    
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    insertUser = () => {
        if(this.state.repeat == 0){
            axios.post('http://35.203.42.33:3000/registrar_usuario',
            {id_rol:1, nombre: this.state.nombre, apellido: this.state.apellido, correo: this.state.correo,
            num_telefono:this.state.telefono, pass: this.state.contrasena2, curp: this.state.curp.toUpperCase(), foto: "", id_ciudad: this.state.id_ciudad, id_tipo_conductor: this.state.tipo_conductor })
            .then(response => {
                response.data.data.forEach(element => {
                    console.log('Se registro');
                    this.SaveSession();
                    this.setState({id_usuario: element["id_usuario_out"], repeat: 1});  
                    this.props.navigation.navigate('DocumentoRegistro',{id_usuario: this.state.id_usuario, telefono: this.state.telefono, pass: this.state.contrasena2});
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }); 
        }else{
            console.log('Ya registrado'+this.state.id_usuario);
            this.props.navigation.navigate('DocumentoRegistro',{id_usuario: this.state.id_usuario});
        }
    }

    onValidateInput = () =>{
        var validateCorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;
        var validateCurp = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
        var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;
        if(this.state.isConnected != false){
            if(this.state.correo.trim() == "" ){
                this.setState(() => ({ errorCorreo: "Ingresa tu Correo" }));
            }else if(!validateCorreo.test(this.state.correo.replace(/ /g, ""))){
                this.setState(() => ({ errorCorreo: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorCorreo: "", correo: this.state.correo.replace(/ /g, "")}));
            }

            if(this.state.nombre.trim() == "" ){
                this.setState(() => ({ errorNombre: "Ingresa tu Nombre" }));
            }else if(!validateNombres.test(this.state.nombre)){
                this.setState(() => ({ errorNombre: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorNombre: "" }));
            }

            if(this.state.apellido.trim() == "" ){
                this.setState(() => ({ errorApellido: "Ingresa tu Apellido" }));
            }else if(!validateNombres.test(this.state.apellido)){
                this.setState(() => ({ errorApellido: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorApellido: "" }));
            }

            if(this.state.contrasena.trim() == "" ){
                this.setState(() => ({ errorContraseña1: "Ingresa tu contraseña" }));
            }else if(!validateContrasena.test(this.state.contrasena)){
                this.setState(() => ({ errorContraseña1: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorContraseña1: "" }));
            }

            if(this.state.contrasena2.trim() == "" ){
                this.setState(() => ({ errorContraseña2: "Ingresa tu contraseña" }));
            }else if(!validateContrasena.test(this.state.contrasena2)){
                this.setState(() => ({ errorContraseña2: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorContraseña2: "" }));
            }
            
            if(this.state.curp.trim() == ""){
                this.setState(() => ({ errorCurp: "" }));
            }else if(!validateCurp.test(this.state.curp.toUpperCase())){
                this.setState(() => ({ errorCurp: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorCurp: "" }));
            }

            if (this.state.contrasena.trim() != this.state.contrasena2.trim() && validateContrasena.test(this.state.contrasena) && validateContrasena.test(this.state.contrasena2)){
                this.setState(() => ({ errorContraseña2: "La contraseña no coincide" }));
            }else if(this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre) && this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.contrasena.trim() != "" && validateContrasena.test(this.state.contrasena)
            && this.state.contrasena2.trim() != "" && validateContrasena.test(this.state.contrasena2)  && this.state.correo.trim() != "" && validateCorreo.test(this.state.correo) && this.state.contrasena.trim() == this.state.contrasena2.trim() && this.state.curp.trim() == ""){
                this.insertUser();           
            }else if(this.state.nombre.trim() != "" && validateNombres.test(this.state.nombre) && this.state.apellido.trim() != "" && validateNombres.test(this.state.apellido) && this.state.contrasena.trim() != "" && validateContrasena.test(this.state.contrasena)
            && this.state.contrasena2.trim() != "" && validateContrasena.test(this.state.contrasena2)  && this.state.correo.trim() != "" && validateCorreo.test(this.state.correo) && this.state.contrasena.trim() == this.state.contrasena2.trim() && this.state.curp.trim() != "" && validateCurp.test(this.state.curp.toUpperCase())) {
                this.insertUser(); 
            }
        }
    }

    showPass1 = () =>{
        this.setState({
            secureTextEntry1: !this.state.secureTextEntry1
        });
    }

    showPass2 = () =>{
        this.setState({
            secureTextEntry2: !this.state.secureTextEntry2
        });
    }

    onValueChangeConductor(value) {
        this.setState({
            tipo_conductor: value
        });
    }

    onValueChangeCiudad(value) {
        this.setState({
            id_ciudad: value
        });
    }


    render() {
        return (
            <Container>
                <Content>
                    <Grid style={{flex:1}}>
                        <Row>            
                            {!this.state.isConnected 
                                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0, marginBottom:5}}>
                                    <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                                </View> 
                                :<View></View>
                            }
                        </Row>
                        <KeyboardAvoidingView behavior='position' style={{flex:1}} enabled keyboardVerticalOffset={this.state.extraScrollHeight}>
                        <Row style = {{marginTop:10}}><Col style={{display:'flex',alignContent: 'center', alignItems: 'center'}}><H3>Ingrese la siguiente información</H3></Col></Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{width:250, marginLeft:15}}>
                                <Input value={this.state.nombre} autoFocus={false} onFocus={() => this.setState({extraScrollHeight:-500})} onChangeText={nombre => this.setState({ nombre })} placeholder='Nombre(s)' style={{borderBottomWidth: 0.5}}></Input> 
                                {!!this.state.errorNombre && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorNombre}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{width:250, marginLeft:15}}>
                                <Input value={this.state.apellido} autoFocus={false}  onFocus={() => this.setState({extraScrollHeight:-500})}  onChangeText={apellido => this.setState({ apellido })} placeholder='Apellido(s)' style={{borderBottomWidth: 0.5}}></Input>
                                {!!this.state.errorApellido && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorApellido}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{width:250, marginLeft:15}}>
                                <Input value={this.state.correo}  onChangeText={correo => this.setState({ correo })} placeholder='Correo' style={{borderBottomWidth: 0.5}}></Input>
                                {!!this.state.errorCorreo && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorCorreo}</Text>
                                )}
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{width:250, marginLeft:15}}>
                                <Input value={this.state.curp}  onChangeText={curp => this.setState({ curp})} maxLength={18}  placeholder='CURP (Opcional)' style={{borderBottomWidth: 0.5}}></Input>                                
                                {!!this.state.errorCurp && (
                                    <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorCurp}</Text>
                                )}
                            </Col>                            
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{width:250, marginLeft:15}}>
                                <Input value={this.state.contrasena}  onChangeText={contrasena => this.setState({ contrasena })} placeholder='Contraseña' style={{borderBottomWidth: 0.5}} secureTextEntry={this.state.secureTextEntry1}></Input>
                                {!!this.state.errorContraseña1 && (
                                    <Text style={{ color: "red", fontSize:13}}>{this.state.errorContraseña1}</Text>
                                )}
                            </Col>
                            <Col style={{marginTop:10, position:'absolute', marginLeft:240}}>
                                <TouchableOpacity onPress={this.showPass1} style={{height:30}}>
                                    <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col style={{width:250, marginLeft:15}}>
                                <Input value={this.state.contrasena2} onFocus={() => this.setState({extraScrollHeight:50})} onChangeText={contrasena2 => this.setState({ contrasena2 })} placeholder='Confirmar Contraseña' style={{borderBottomWidth: 0.5}} secureTextEntry={this.state.secureTextEntry2}></Input>
                                {!!this.state.errorContraseña2 && (
                                    <Text style={{ color: "red", fontSize:13}}>{this.state.errorContraseña2}</Text>
                                )}
                            </Col>
                            <Col style={{marginTop:10, position:'absolute', marginLeft:240}}>
                                <TouchableOpacity onPress={this.showPass2} style={{height:30}}>
                                    <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{width:250, marginLeft:15}}>
                                <Text style={{fontSize:11}}>La contraseña debe ser de 6 dígitos e incluir por lo menos una letra y un número.</Text>
                            </Col>
                        </Row>
                        <Row><Col style = {{marginBottom: 10, marginLeft:15, marginTop:10}}><Text>Seleccione una tipo conductor</Text></Col></Row>
                        
                        </KeyboardAvoidingView>
                        <Row>
                            <Col style={{marginTop:2,width:250, marginLeft:15, marginBottom:8}}>
                                <View style={{borderColor:'lightgray', borderWidth:0.5}}>
                                    <Picker 
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down"/>}
                                        selectedValue={this.state.tipo_conductor}
                                        onValueChange={(itemValue) => this.setState({ tipo_conductor: itemValue })}>
                                        {this.state.array_tipo_conductor.map((item) => {
                                            return (< Picker.Item label={item.nombre} key={item.id} value={item.id}/>);
                                        })} 
                                    </Picker>
                                </View>
                            </Col>                    
                        </Row>
                        <Row><Col style = {{marginBottom: 10, marginLeft:15, marginTop:10}}><Text>Seleccione una ciudad</Text></Col></Row>
                        <Row>
                            <Col style={{marginTop:2,width:250, marginLeft:15, marginBottom:8}}>
                                <View style={{borderColor:'lightgray', borderWidth:0.5}}>
                                    <Picker 
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down"/>}
                                        selectedValue={this.state.id_ciudad}
                                        onValueChange={(itemValue) => this.setState({ id_ciudad: itemValue })}>
                                        {this.state.array.map((item) => {
                                            return (< Picker.Item label={item.nombre} key={item.id} value={item.id}/>);
                                        })} 
                                    </Picker>
                                </View>
                            </Col>                    
                        </Row>
                        <Row>
                            <Col style={{marginTop:1, marginLeft:15}}>
                            {!!this.state.nameError && (
                                <Text style={{ color: "red", fontSize:13}}>{this.state.nameError}</Text>
                            )}
                            </Col>
                        </Row>
                        <Row><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 70, marginRight: 70, marginTop:10, marginBottom:10, backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button></Col></Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}

export default InformacionPersonal