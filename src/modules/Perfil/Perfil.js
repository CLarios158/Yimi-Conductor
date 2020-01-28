import React, { Component } from 'react';
import { Container, Content, Text, Button, Grid, Col, Row, Icon, ListItem, Left, Right, Body, Card, CardItem, Switch, Thumbnail, View} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import {NetInfo, Dimensions, ActivityIndicator} from 'react-native';
const { width } = Dimensions.get('window');
import axios from 'axios';


class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
          id_usuario: this.props.navigation.getParam('id_usuario'),
          foto:'', id_doc4:'', rfc:'',
          loading: false,
          isConnected: true
        }
    }
    
    goMyProfile = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('MiPerfil', {id_usuario:this.state.id_usuario});
        }
    }

    documento = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('DocumentoM', {id_usuario: this.state.id_usuario});
        }
    }

    goConfiguration = () =>{
        if(this.state.isConnected != false){
            this.props.navigation.navigate('Configuracion',{id_usuario:this.state.id_usuario});
        }
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            axios.post('http://35.203.42.33:3000/consultar_usuario',{id_usuario:this.state.id_usuario})
            .then(response => {
                response.data.data.forEach(element => {
                    this.setState({ nombre: element["nombre_out"], foto: element["fotografia_out"]});         
                });
                if(this.state.foto == ""){
                    this.setState({foto: 'https://coffschamber.com.au/wp-content/uploads/2019/02/RAY.jpg', loading: true});
                }else{
                    this.setState({loading: true});
                    this.state.foto = this.state.foto; 
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        });
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        this.focusListener.remove();
    }

    handleConnectivityChange = isConnected => {
        this.setState({ isConnected });
    }

    render() {
        if(this.state.loading == true){
        return (
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
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:55}}>
                                                        <Left>
                                                            <Thumbnail style={{height:55, width:55, borderRadius:50}}  source={this.state.foto ? {uri: this.state.foto} : null}/>
                                                            <Text style={{fontWeight:'bold', marginLeft:10, fontSize:18}}>{this.state.nombre}</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button style={{height:40}} onPress={this.goMyProfile} transparent><Icon style={{color:'black'}}  name="arrow-forward"/></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row> 
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card >
                                    <CardItem >
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='chalkboard' size={30} style={{color:'#ff8834'}}/>
                                                            <Text>  Evaluación</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>                        
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem >
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='bell' size={30} style={{color:'#ff8834'}}/>
                                                            <Text>  Notificaciones</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card >
                                    <CardItem >
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='file' size={30} style={{color:'#ff8834'}}/>
                                                            <Text>  Documentos</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.documento} transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>                        
                        <Row>
                            <Col>
                                <Card >
                                    <CardItem >
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='lightbulb' size={30} style={{color:'#ff8834'}}/>
                                                            <Text>  Consejos</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button transparent style={{height:40}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Row>
                                                <Col>
                                                    <ListItem style={{borderBottomWidth:0, height:0}}>
                                                        <Left>
                                                            <FontAwesome5 name='cog' size={30} style={{color:'#ff8834'}}/>
                                                            <Text>  Configuración</Text>
                                                        </Left>
                                                        <Right>
                                                            <Button onPress={this.goConfiguration} transparent style={{height:30}}><Icon style={{color:'black'}} name="arrow-forward" /></Button>
                                                        </Right>
                                                    </ListItem>
                                                </Col>
                                            </Row>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
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

export default withNavigation(Perfil);