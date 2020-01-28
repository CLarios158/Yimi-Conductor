import React, { Component } from 'react';
import { Container, Content, Text, Grid, Col, Row, Button, H3, Card, CardItem, Body, Input, View, Switch} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {NetInfo, Dimensions, Alert, ScrollView, AsyncStorage} from 'react-native';
const { width } = Dimensions.get('window');

class Contraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry1: true,
      secureTextEntry2: true,
      secureTextEntry3: true,
      respuesta: 0,
      contrasenaold: '',
      contrasenanew:'',
      contrasenanew2:'',
      id_usuario: this.props.navigation.getParam('id_usuario'),
      isConnected: true
    };
  }

  componentDidMount(){
    console.log(this.state.id_usuario)
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  SavePass = async () => {
    let passwd = this.state.contrasenanew2;
    try {
      await AsyncStorage.setItem('passwd', passwd);

    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  }

  updatePassword = () => {
    axios.put('http://35.203.42.33:3000/modificar_contrasena',{id_usuario:this.state.id_usuario, pass: this.state.contrasenanew2})
    .then(response => {
      Alert.alert(
        'Aviso',
        'Se ha actualizado tu contraseña con éxito!',
        [
        {text: 'OK', onPress: () => this.props.navigation.navigate('SeguridadCuenta')},
        ]
      );
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onValidateInput(){
    var validateContrasena = /^(?=\w*\d)(?=\w*[a-zA-Z])\S{6}$/;

    if(this.state.isConnected != false){
      if(this.state.contrasenaold.trim() == ""){
        this.setState(() => ({ contrasenaError1: "Ingresa tu contraseña" }));
      }else if(!validateContrasena.test(this.state.contrasenaold)){
        this.setState(() => ({ contrasenaError1: "Formato Incorrecto" }));
      }else{ 
        axios.post('http://35.203.42.33:3000/validar_contrasena',{id_usuario:this.state.id_usuario, pass: this.state.contrasenaold})
        .then(response => {
          response.data.data.forEach(element => {
              this.setState({respuesta: element["respuesta"]});  
          }); 
          if(this.state.respuesta != 0){        
              this.setState(() => ({ contrasenaError1: "" }));
          }else {
          this.setState(() => ({ contrasenaError1: "La contraseña es incorrecta" }));
          }
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        }); 
      }
      
      if(this.state.contrasenanew.trim() == ""){
        this.setState(() => ({ contrasenaError2: "Ingresa tu contraseña" }));
      }else if(!validateContrasena.test(this.state.contrasenanew)){
        this.setState(() => ({ contrasenaError2: "Formato Incorrecto" }));
      }else{
        this.setState(() => ({ contrasenaError2: "" }));
      }

      if(this.state.contrasenanew2.trim() == ""){
        this.setState(() => ({ contrasenaError3: "Ingresa tu contraseña" }));
      }else if(!validateContrasena.test(this.state.contrasenanew2)){
        this.setState(() => ({ contrasenaError3: "Formato Incorrecto" }));
      }else{
        this.setState(() => ({ contrasenaError3: "" }));
      }

      if(this.state.contrasenanew != this.state.contrasenanew2 && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)){      
        this.setState(() => ({ contrasenaError3: "La contraseña nueva no coindice" }));
      }

      if(this.state.contrasenaold.trim() != "" && this.state.contrasenanew.trim() != "" && this.state.contrasenanew2.trim() != ""
      && validateContrasena.test(this.state.contrasenaold) && validateContrasena.test(this.state.contrasenanew) && validateContrasena.test(this.state.contrasenanew2)
      && this.state.respuesta != 0 && this.state.contrasenanew == this.state.contrasenanew2){
        this.setState(() => ({ contrasenaError1:"", contrasenaError2:"", contrasenaError3: "" }));
        this.SavePass();
        this.updatePassword();
      } 
    }  
  }

  onIconPress1 = () =>{
    this.setState({
      secureTextEntry1: !this.state.secureTextEntry1
    });
  }

  onIconPress2 = () =>{
    this.setState({
      secureTextEntry2: !this.state.secureTextEntry2
    });
  }

  onIconPress3 = () =>{
    this.setState({
      secureTextEntry3: !this.state.secureTextEntry3
    });
  }

  render() {
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
              <Row style = {{marginTop: 10, marginBottom: 10,marginLeft:20}}><H3>Cambiar Contraseña</H3></Row>
              <Row>
                <Col style={{marginLeft:20, marginRight:20}}>
                  <Input  value={this.state.contrasenaold} onChangeText={contrasenaold => this.setState({ contrasenaold })} secureTextEntry={this.state.secureTextEntry1} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña Anterior'/>
                </Col>
                <Col style={{marginTop:20, position:'absolute', right:0, marginRight: 40}}>
                  <TouchableOpacity onPress={this.onIconPress1} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{marginBottom:5}}>
                  {!!this.state.contrasenaError1 && (<Text style={{ color: "red", fontSize:11, marginLeft:20}}>{this.state.contrasenaError1}</Text>)}
                </Col>
              </Row>
              <Row>
                <Col style={{marginLeft:20, marginRight:20}}>
                  <Input value={this.state.contrasenanew} onChangeText={contrasenanew => this.setState({ contrasenanew })} secureTextEntry={this.state.secureTextEntry2} style = {{borderBottomWidth: 0.5}} placeholder='Contraseña Nueva'/>
                </Col>
                <Col style={{marginTop:20, position:'absolute', right:0, marginRight: 40}}>
                  <TouchableOpacity onPress={this.onIconPress2} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{marginBottom:5}}>
                  {!!this.state.contrasenaError2 && (<Text style={{ color: "red", fontSize:11, marginLeft:20}}>{this.state.contrasenaError2}</Text>)}
                </Col>
              </Row>
              <Row>
                <Col style={{marginLeft:20, marginRight:20}}>
                  <Input value={this.state.contrasenanew2} onChangeText={contrasenanew2 => this.setState({ contrasenanew2 })} secureTextEntry={this.state.secureTextEntry3} style = {{borderBottomWidth: 0.5}} placeholder='Confirmar Contraseña Nueva'/>
                </Col>
                <Col style={{marginTop:20, position:'absolute', right:0, marginRight: 40}}>
                  <TouchableOpacity onPress={this.onIconPress3} style={{height:30}}>
                  <FontAwesome5 name='eye' size={20} style={{color:'gray'}}/>
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col style={{marginBottom:5}}>
                  {!!this.state.contrasenaError3 && (<Text style={{ color: "red", fontSize:11, marginLeft:20}}>{this.state.contrasenaError3}</Text>)}
                </Col>
              </Row>
              <Row style = {{marginBottom: 1, marginLeft:20, marginRight:20}}>
                <Text style={{fontSize:12}}>La nueva contraseña debera tener 6 dígitos e incluir al menos una letra o un número.</Text>
              </Row>
              <Row style={{marginTop:35}}><Col><Button onPress={() => this.onValidateInput()} block style = {{marginLeft: 20, marginRight: 20, backgroundColor:'#ff8834'}}><Text>Confirmar</Text></Button></Col></Row>
            </Grid> 
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default Contraseña