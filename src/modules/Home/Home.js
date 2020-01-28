import React, { Component } from 'react';
import { Container, Text, Button, Footer, FooterTab, Content, Grid, Row, View} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import {NetInfo, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_usuario: this.props.navigation.getParam('id_usuario'),
      isConnected: true
    }
  }

  componentDidMount(){
    console.log(this.state)
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.setState({ isConnected });
  };

  goMyProfile = () =>{
    if(this.state.isConnected != false){
      this.props.navigation.push('Perfil', {id_usuario:this.state.id_usuario});
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{marginTop:23}}>            
              {!this.state.isConnected 
                ?<View style={{backgroundColor: '#b52424', height: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width, position: 'relative', margin:0}}>
                <Text style={{color: '#fff'}}>Verifique su conexión e intente nuevamente</Text>
                </View> 
                :<View></View>
              }
            </Row>
          </Grid>
        </Content>
        <Footer style={{height:65}}>
          <FooterTab  style={{backgroundColor:'white', borderTopColor:'black', borderWidth:0.5}}>
            <Button vertical>
              <FontAwesome5 name='car-alt' size={40} style={{color:'#ec6a2c'}}/>
              <Text style={{color:'black'}}>Inicio</Text>
            </Button>
            <Button vertical>
              <FontAwesome5 name='wallet' size={40} style={{color:'#ec6a2c'}}/>
              <Text style={{color:'black'}}>Mi billetera</Text>
            </Button>
            <Button vertical onPress={this.goMyProfile}>
              <FontAwesome5 name='user' size={40} style={{color:'#ec6a2c'}}/>
              <Text style={{color:'black'}}>Mi perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Home