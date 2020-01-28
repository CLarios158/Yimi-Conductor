import React, { Component } from 'react';
import { Container, Content, Text, Input, Form, Button, Grid, Col, Row, H3} from 'native-base';
import axios from 'axios';
import {View, NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');

class CodigoVerificacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id_usuario: this.props.navigation.getParam('id_usuario'),
      telefono: this.props.navigation.getParam('telefono'),
      isConnected: true,
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      error:''
    };
  }

  validateCode = () => {
    if(this.state.isConnected == true){
      const input1 = this.state.input1;
      const input2 = this.state.input2;
      const input3 = this.state.input3;
      const input4 = this.state.input4;
      const input5 = this.state.input5;
      const input6 = this.state.input6;
      const codigoV = input1+input2+input3+input4+input5+input6;

      axios.post('http://35.203.42.33:3000/validar_codigo',{telefono: this.state.telefono, codigo: codigoV})
      .then(response => {
        if(response.data.respuesta == 0){
          this.setState({error: 'El código de verificación es incorrecto',input1:'',input2:'',input3:'',input4:'',input5:'',input6:''})
        }else{
          this.setState({input1:'',input2:'',input3:'',input4:'',input5:'',input6:''})
          this.props.navigation.navigate('RecuperacionContrasena', {id_usuario: this.state.id_usuario});
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
      NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
      this.setState({ isConnected });
  };

  sendCode = () => { 
    if(this.state.isConnected == true){
      axios.post('http://35.203.42.33:3000/get_codigo_validacion',{telefono: this.state.telefono}); 
      alert("Se ha enviado un nuevo código de verificación");
    } 
  }
  
  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row>            
              {!this.state.isConnected 
                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'absolute', margin:0}}>
                <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                </View> 
                :<View></View>
              }
            </Row>
            <Row style = {{marginTop: 40, marginBottom: 10,marginLeft:20}}><H3>Código de verificación</H3></Row>
            <Row style = {{marginBottom: 10, marginLeft:20}}><Text>Se ha enviado un código de {'\n'}verificación al número {this.state.telefono}</Text></Row>
            <Row style = {{marginLeft:20, marginBottom:20}}>
              <Col>
                <Text>Si no recibiste el código haz clic en <Text style={{color:'blue', textDecorationLine:'underline'}} onPress={this.sendCode}>Enviar nuevo código.</Text></Text>
              </Col>           
            </Row>
            <Row style = {{marginBottom: 5, marginLeft:20}}><Text>Ingrese el código de 6 dígitos:</Text></Row>
            <Row>
              <Col><Input value={this.state.input1} onChangeText={input1 => this.setState({ input1 })} keyboardType='numeric' maxLength={1} style={{marginLeft:10, width:45, borderBottomWidth:2, textAlign:'center'}}/></Col>
              <Col><Input value={this.state.input2} onChangeText={input2 => this.setState({ input2 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}}/></Col>
              <Col><Input value={this.state.input3} onChangeText={input3 => this.setState({ input3 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}}/></Col>
              <Col><Input value={this.state.input4} onChangeText={input4 => this.setState({ input4 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}}/></Col>
              <Col><Input value={this.state.input5} onChangeText={input5 => this.setState({ input5 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}}/></Col>
              <Col><Input value={this.state.input6} onChangeText={input6 => this.setState({ input6 })} keyboardType='numeric' maxLength={1} style={{marginLeft:6, width:45, borderBottomWidth:2, textAlign:'center'}}/></Col>
            </Row>
            <Row style={{marginTop:10}}>
              <Col style={{marginTop:10, marginLeft:10}}><Text style={{ color: "red", fontSize:11}}>{this.state.error}</Text></Col>
            </Row>
            <Row style={{marginTop:40}}>
              <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85}}>
                <Button onPress={this.validateCode} block style={{backgroundColor:'#ff8834'}}><Text>Siguiente</Text></Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default CodigoVerificacion