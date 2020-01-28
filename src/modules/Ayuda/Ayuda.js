import React, { Component } from 'react';
import { Container, View, Content, Text, Button, Grid, Col, Row, Body, Card, CardItem} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'

class Ayuda extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            nombre: ''
        }
    }
    */


    QNA = () =>{
        this.props.navigation.navigate('QNA');
    }

    SoporteCorreo = () =>{
        this.props.navigation.navigate('SoporteCorreo');
    }

    SoporteTelefono = () =>{
        this.props.navigation.navigate('SoporteTelefono');
    }

    SoporteWhats = () =>{
        this.props.navigation.navigate('SoporteWhats');
    }

    correo = () =>{
        this.props.navigation.navigate('Ayuda');
    }

    render() {
        return (
            <Container>
                <Content>
                    <Grid>
                        <Row>
                            <Col>                                
                                <Card>
                                    <CardItem>
                                        <Body>
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='question-circle' size={35} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize: 15, paddingTop:10}}>Preguntas Frecuentes</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='envelope' size={35} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:15, paddingTop:10}}>Soporte Yimi vía Correo</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='phone' size={35} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:15, paddingTop:10}}>Soporte Yimi vía Teléfono</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='comments' size={35} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:15, paddingTop:10}}>Soporte Yimi vía WhatsApp 3121234567</Text>
                                                </Col>
                                            </Row>
                                            </Button>
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
                                        <Button transparent>
                                            <Row>
                                                <Col style={{width:60}}>
                                                    <FontAwesome5 name='info-circle' size={35} style={{color:'#ff8834'}}/>                                             
                                                </Col>
                                                <Col>
                                                    <Text style={{color:'black', fontSize:15, paddingTop:12}}>Acerca de Yimi</Text>
                                                </Col>
                                            </Row>
                                            </Button>
                                        </Body>
                                    </CardItem>
                                </Card>                                
                            </Col>
                        </Row>
                    </Grid> 
                </Content>
            </Container>
        );
    }
}

export default Ayuda;