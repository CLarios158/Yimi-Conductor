import React, { Component } from 'react';
import { Container, Content, Grid, Col, Row, Picker, Text, View, Button, Input, Card, CardItem, Body, Switch, Icon} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {NetInfo, Dimensions, ActivityIndicator, Alert, ScrollView} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';

class CuentaBancaria extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_usuario: this.props.navigation.getParam('id_usuario'),
            nombre_propietario: '', apellido_propietario: '', clabe: '', 
            num_cuenta: '', tipo_banco: '', tipo_pago: '', array: this.props.navigation.getParam('array'), 
            loading: false, isConnected: true
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        axios.post('http://35.203.42.33:3000/consultar_cuenta_bancaria',{id_usuario:this.state.id_usuario})
        .then(response => {
            response.data.data.forEach(element => {
                this.setState({
                    nombre_propietario: element["nombre_propietario_out"], 
                    apellido_propietario: element["apellido_propietario_out"], 
                    num_cuenta: element["num_cuenta_out"],
                    clabe: element["clabe_out"],
                    tipo_banco: element["fk_id_banco_out"],
                    tipo_pago: element["tipo_pago_out"],
                    loading: true
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
    };
    
    updateCuentaBancaria = () =>{
        axios.put('http://35.203.42.33:3000/modificar_cuenta_bancaria',{id_rol:1, id_usuario: this.state.id_usuario, clabe: this.state.clabe, num_cuenta: this.state.num_cuenta, num_tarjeta: "",
        nombre_propietario: this.state.nombre_propietario, apellido_propietario: this.state.apellido_propietario, fecha_vencimiento: "", ccv: "",
        tipo_pago: this.state.tipo_pago, id_banco: this.state.tipo_banco})
        .then(response=> {
            Alert.alert(
                'Aviso',
                'Se actualizo tus datos bancarios con éxito!',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ]
            );
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onValidateInput= () =>{
        var validateClabe = /^[0-9]{18}$/;
        var validateCuenta = /^[0-9]{6,16}$/;
        var validateNombres = /^[a-zA-Z\sñáéíóú]+$/;
        
        if(this.state.isConnected != false){
            if(this.state.nombre_propietario.trim() == "" ){
                this.setState(() => ({ errorNombre: "Ingresa tu Nombre" }));
            }else if(!validateNombres.test(this.state.nombre_propietario)){
                this.setState(() => ({ errorNombre: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorNombre: "" }));
            }

            if(this.state.apellido_propietario.trim() == "" ){
                this.setState(() => ({ errorApellido: "Ingresa tu Apellido" }));
            }else if(!validateNombres.test(this.state.apellido_propietario)){
                this.setState(() => ({ errorApellido: "Formato Incorrecto" }));
            }else{
                this.setState(() => ({ errorApellido: "" }));
            }

            if(this.state.num_cuenta.trim() == "" ){
                this.setState(() => ({ errorNumCuenta: "Ingresa tu Número de Cuenta" }));
              }else if(!validateCuenta.test(this.state.num_cuenta)){
                this.setState(() => ({ errorNumCuenta: "Ingresa un Número de Cuenta Valido" }));            
              }else{
                this.setState(() => ({ errorNumCuenta: "" }));
              }
        
            if(this.state.clabe.trim() == "" ){
                this.setState(() => ({ errorClabe: "Ingresa tu CLABE" }));
            }else if(!validateClabe.test(this.state.clabe)){
                this.setState(() => ({ errorClabe: "Ingresa 18 dígitos" }));           
            }else{
                this.setState(() => ({ errorClabe: "" }));
            } 
            
            if(this.state.nombre_propietario.trim() != "" && validateNombres.test(this.state.nombre_propietario) && this.state.apellido_propietario.trim() != "" && validateNombres.test(this.state.apellido_propietario) 
            && this.state.num_cuenta.trim() != "" && validateCuenta.test(this.state.num_cuenta) && this.state.clabe.trim() != "" && validateClabe.test(this.state.clabe) ) {
                this.updateCuentaBancaria();
            }
        }
    }

    render() {
        if(this.state.loading == true){
            return (
                <ScrollView keyboardShouldPersistTaps='always'>
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
                                    <Col style={{width:250, marginLeft:15}}>
                                        <Input value={this.state.nombre_propietario} onChangeText={nombre_propietario => this.setState({ nombre_propietario })} placeholder='Nombre(s) del Titular' style={{borderBottomWidth: 0.5}}></Input>
                                        {!!this.state.errorNombre && (
                                            <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorNombre}</Text>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{marginTop: 15,width:250, marginLeft:15}}>
                                        <Input value={this.state.apellido_propietario} onChangeText={apellido_propietario => this.setState({ apellido_propietario })} placeholder='Apellido(s) del Titular' style={{borderBottomWidth: 0.5}}></Input>
                                        {!!this.state.errorApellido && (
                                        <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorApellido}</Text>
                                        )}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style = {{marginTop: 15, marginLeft:15, width:250}}>
                                        <View style={{borderWidth:0.5}}>
                                            <Picker 
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down"/>}
                                                selectedValue={this.state.tipo_banco}
                                                onValueChange={(itemValue) => this.setState({ tipo_banco: itemValue })}>
                                                {this.state.array.map((item) => {
                                                return (< Picker.Item label={item.nombre} key={item.id} value={item.id}/>);
                                                })} 
                                            </Picker>
                                        </View>
                                    </Col> 
                                </Row>
                                <Row>
                                    <Col style={{marginTop: 3,width:250, marginLeft:15}}>
                                        <Input value={this.state.num_cuenta} onChangeText={num_cuenta => this.setState({ num_cuenta })} maxLength={16}  placeholder='Número de cuenta' style={{borderBottomWidth: 0.5}} keyboardType='numeric'></Input>
                                        {!!this.state.errorNumCuenta && (
                                        <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorNumCuenta}</Text>
                                        )}    
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{marginTop: 15,width:250, marginLeft:15}}>
                                        <Input value={this.state.clabe} onChangeText={clabe => this.setState({ clabe })} maxLength={18}  placeholder='CLABE interbancaria' style={{borderBottomWidth: 0.5}} keyboardType='numeric'></Input>
                                        {!!this.state.errorClabe && (
                                        <Text style={{ color: "red", fontSize:13, marginBottom:0}}>{this.state.errorClabe}</Text>
                                        )}  
                                    </Col>
                                </Row>
                                <Row><Col><Button onPress={this.onValidateInput} block style = {{marginLeft: 20, marginRight: 20, marginTop:20, backgroundColor:'#ff8834'}}><Text>Guardar</Text></Button></Col></Row>
                            </Grid> 
                        </Content>
                    </Container>
                </ScrollView>
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

export default CuentaBancaria;