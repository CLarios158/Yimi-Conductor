import React, { Component } from 'react';
import { Container, Content, Text, Input, Button, Grid, Col, Row, Thumbnail} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';
import axios from 'axios';
import {AsyncStorage, View, NetInfo, Dimensions, Alert} from 'react-native';
const { width } = Dimensions.get('window');

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: true,
      campo: '',
      contrasena: '',
      id_usuario: '',
      respuesta: '',
      isConnected: true
    };
  }
  
  componentDidMount(){
    this.GetSession();
    //this.notCompleteRegistry();
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  };

  SaveSession = async () => {
    console.log('entro')
    let campo = this.state.campo;
    let passwd = this.state.contrasena;
    try {
      console.log(campo)
      console.log(passwd)
      await AsyncStorage.setItem('campo', campo);
      await AsyncStorage.setItem('passwd', passwd);

    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  GetSession = async () => {
    try {
      const campo = await AsyncStorage.getItem('campo');
      const passwd = await AsyncStorage.getItem('passwd');
      console.log(campo);
      console.log(passwd);

      if (campo != null && passwd != null) {
        // We have data!!
        this.setState({campo: campo, contrasena: passwd});
        
        axios.post('http://35.203.42.33:3000/validar_inicio_sesion', {id_rol:1, campo: this.state.campo, pass:this.state.contrasena})
        .then(response =>{
          response.data.data.forEach(element => {
            this.setState({ campo: '', contrasena:'' });
            this.setState(() => ({ nameError: "" }));
            
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home', params:{id_usuario: element["id_usuario_out"], rol:element["id_rol_out"]} } ),                    
              ],
            });
            this.props.navigation.dispatch(resetAction);
          }); 
        })
        .catch(function (error) {
          console.log(error);
        });
      }else{
        console.log("Datos Incompletos");
      }

    } catch (error) {
      // Error retrieving data
      console.log("Error al obtener los datos"+error); 
    }
  };

  SignIn = () =>{
    if(this.state.isConnected != false){
      axios.post('http://35.203.42.33:3000/validar_cuenta', {campo: this.state.campo})
      .then(response =>{
        response.data.data.forEach(element => {
          if(element["respuesta"] == 0){
            this.setState(() => ({ nameError: "La cuenta no existe" }));
          }else{
            axios.post('http://35.203.42.33:3000/validar_inicio_sesion', {id_rol:1, campo: this.state.campo, pass:this.state.contrasena})
            .then(response =>{
              response.data.data.forEach(element => {
                if(element["respuesta"] == 0){
                  this.setState(() => ({ nameError: "Contraseña Incorrecta" }));
                }else{
                  this.setState({id_usuario:  element["id_usuario_out"]});
                  this.notCompleteRegistry();
                }   
              }); 
            })
            .catch(function (error) {
              console.log(error);
            });
          }   
        }); 
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  notCompleteRegistry = async () =>{
    try {
      const completeDocs = await AsyncStorage.getItem('completeDocs');
      const completeBank = await AsyncStorage.getItem('completeBank');
      console.log('Docs'+completeDocs);
      console.log('Bank'+completeBank);

      if (completeDocs == 0) {
        console.log('Redireccionar a documentos para que carge')
        this.props.navigation.navigate('DocumentoRegistro',{id_usuario: this.state.id_usuario, telefono: this.state.campo, pass: this.state.contrasena});
      }else if(completeBank == 0){
        console.log('Redireccionar a los datos bancarios');
        this.props.navigation.navigate('CuentaBancariaRegistro',{id_usuario: this.state.id_usuario, telefono: this.state.campo, pass: this.state.contrasena});
      }else {
        this.SaveSession();
        this.setState({ campo: '', contrasena:'', nameError: ''});
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home', params:{id_usuario: this.state.id_usuario} } ),                    
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }

    } catch (error) {
      // Error retrieving data
      console.log("Error al obtener los datos"+error);
      
    }
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  };

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  goVerificatePhone = () =>{
    if(this.state.isConnected != false){
      this.setState({ telefono: '', contrasena:'' });
      this.props.navigation.navigate('VerificarTelefono');
      //this.props.navigation.navigate('InformacionPersonalRegistro');
    }
  };

  goForgetPasswd = () =>{
    if(this.state.isConnected == true){
      if(this.state.campo != ''){
        axios.post('http://35.203.42.33:3000/validar_cuenta',{campo: this.state.campo})
        .then(response => {
          response.data.data.forEach(element => {
            this.setState({id_usuario: element["id_usuario_out"], respuesta: element["respuesta"]});
          });
          if(this.state.respuesta == 0){
            this.setState({ nameError: "La cuenta no existe" });
          }else{
            this.setState({ campo: '', contrasena:'', nameError: '' });
            this.props.navigation.navigate('RestablecerContraseña',{id_usuario: this.state.id_usuario})
          }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
      }else{
        Alert.alert(
          'Aviso',
          'Ingrese su teléfono o correo eléctronico',
          [
          {text: 'OK'}
          ]
      );
      }
    }
  };

  showPasword = () =>{
    this.setState({
        secureTextEntry: !this.state.secureTextEntry
    });
  };

  onValidateInput= () =>{
    if(this.state.isConnected == true){
      if (this.state.campo.trim() === "" || this.state.contrasena.trim() === "") {
        this.setState(() => ({ nameError: "Por favor llene todos los campos" }));
      } else {
        this.SignIn();
      }
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{marginTop:23}}>            
              {!this.state.isConnected 
                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'absolute', margin:0}}>
                  <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                </View> 
                :<View></View>
              }
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}><Thumbnail source= {require('../../image/logoY.png')} style={{width: 240, height: 200, marginTop: 30}}/></Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                <Input   value={this.state.campo} onChangeText={campo => this.setState({ campo })}  style = {{borderBottomWidth: 0.5, textAlign :'center', width:260}} placeholder='Teléfono o Correo Electrónico'/>
              </Col>
            </Row>
            <Row> 
              <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                  <Input  value={this.state.contrasena} onChangeText={contrasena => this.setState({ contrasena })}  style = {{borderBottomWidth: 0.5, textAlign :'center', width:260, marginTop:5}} placeholder='Contraseña' secureTextEntry={this.state.secureTextEntry}/>
              </Col>
              <Col style={{marginTop:20,position:'absolute', marginLeft:'75%'}}>
                <TouchableOpacity onPress={this.showPasword} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginTop:5}}>
                {!!this.state.nameError && (
                  <Text style={{ color: "red", fontSize:11}}>{this.state.nameError}</Text>
                )}
              </Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                <Button onPress={this.onValidateInput} block style={{backgroundColor:'#ff8834'}}><Text> Iniciar sesión </Text></Button>
              </Col>
            </Row>  
            <Button block transparent onPress={this.goForgetPasswd}><Text style={{textDecorationLine: "underline", color:'gray'}}>Olvide mi contraseña</Text></Button>
            <Row style={{display: 'flex', justifyContent: 'center', marginTop:20}}><Text>─────────────────────</Text></Row>
          
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                <Button onPress={this.goVerificatePhone} block style={{backgroundColor:'#ff8834'}}><Text> Registrarse </Text></Button>
              </Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginTop:10}}>
                <Button transparent block><FontAwesome5 name='question-circle' size={45} style={{color:'#ff8834'}} /></Button>
              </Col>
            </Row>
            <Row>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center'}}>
                <Text>Ayuda</Text>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Login;