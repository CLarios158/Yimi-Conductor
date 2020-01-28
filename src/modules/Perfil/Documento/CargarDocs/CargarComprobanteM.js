import React, { Component } from 'react';
import { Container, Content, Text, Button,Grid, Col, Row, Thumbnail} from 'native-base';
import axios from 'axios'

class IdentificacionOficial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.navigation.getParam('image'),
            id_usuario: this.props.navigation.getParam('id_usuario'),
            id_cat_documento: this.props.navigation.getParam('id_cat_documento')
        };
    }

    CargarDocumento = () =>{
        axios.put('http://35.203.42.33:3000/modificar_documento',{id_usuario: this.state.id_usuario, archivo: this.state.image, id_cat_documento: this.state.id_cat_documento, tipo_rfc: null})
        .then(response => {
            console.log('Modifico Comprobante');
            this.props.navigation.navigate('DocumentoM', {id_usuario: this.state.id_usuario, estado_comprobante:1});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() {
        return (
        <Container>
            <Content>
                <Grid>
                    <Row style={{marginTop:30}}>
                        <Col style={{display:'flex', alignItems:'center',alignContent:'center'}}>
                            <Thumbnail style={{ height: 400, width: 300, resizeMode: 'contain', borderRadius:5}} square source= {{uri:this.state.image}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display:'flex', alignContent:'center', alignItems:'center', marginLeft:85, marginRight:85, marginTop:15}}>
                            <Button onPress={this.CargarDocumento} block style={{backgroundColor:'#ff8834'}}><Text> Cargar </Text></Button>
                        </Col>
                    </Row>
                </Grid> 
            </Content>
        </Container>
        );
    }
}

export default IdentificacionOficial;