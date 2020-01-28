import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './modules/Login/Login'
import Ayuda from './modules/Ayuda/Ayuda'
import VerificarTelefono from './modules/Login/VerificarTelefono'
import CodigoVerificacion from './modules/Login/CodigoVerficacion'
import Legal from './modules/Login/Legal'
import TerminosyCondiciones from './modules/Login/Legal/Terminos'
import Privacidad from './modules/Login/Legal/Privacidad'
import CodigoVerificacionContraseña from './modules/Login/RecuperacionContrasena/CodigoVerificacionContrasena'
import OlvideContraseña from './modules/Login/RecuperacionContrasena/OlvideContrasena'
import RecuperacionContrasena from './modules/Login/RecuperacionContrasena/RecuperacionContrasena'
import RestablecerContraseña from './modules/Login/RecuperacionContrasena/RestablecerContrasena'
import InformacionPersonalRegistro from './modules/Login/InformacionPersonalRegistro'
import DocumentoRegistro from './modules/Login/Documento'
import IdentificacionOficial from './modules/Login/CargarDocs/IdentificacionOficial'
import LicenciaConducir from './modules/Login/CargarDocs/LicenciaConducir'
import CartaAntecedentes from './modules/Login/CargarDocs/CartaAntecedentes'
import ComprobanteD from './modules/Login/CargarDocs/ComprobanteD'
import PruebaToxicologica from './modules/Login/CargarDocs/PruebaToxicologica'
import FotoPerfil from './modules/Login/CargarDocs/FotoPerfil'
import Camara from './modules/Login/CargarDocs/Camara'
import CargarIdentificacion from './modules/Login/CargarDocs/CargarIdentificacion'
import CargarLicencia from './modules/Login/CargarDocs/CargarLicencia'
import CargarFoto from './modules/Login/CargarDocs/CargarFoto'
import CargarCarta from './modules/Login/CargarDocs/CargarCarta'
import CargarComprobante from './modules/Login/CargarDocs/CargarComprobante'
import CargarPruebaT from './modules/Login/CargarDocs/CargarPruebaT'
import CuentaBancariaRegistro from './modules/Login/CuentaBancaria'
import ValidacionRegistro from './modules/Login/ValidacionRegistro'
import Home from './modules/Home/Home'
import Perfil from './modules/Perfil/Perfil'
import DocumentoM from './modules/Perfil/Documento/DocumentoM'
import IdentificacionOficialM from './modules/Perfil/Documento/CargarDocs/IdentificacionOficialM'
import LicenciaConducirM from './modules/Perfil/Documento/CargarDocs/LicenciaConducirM'
import CartaAntecedentesM from './modules/Perfil/Documento/CargarDocs/CartaAntecedentesM'
import ComprobanteDM from './modules/Perfil/Documento/CargarDocs/ComprobanteDM'
import PruebaToxicologicaM from './modules/Perfil/Documento/CargarDocs/PruebaToxicologicaM'
import FotoPerfilM from './modules/Perfil/Mi Perfil/Foto Perfil/FotoPerfilM'
import CamaraFoto from './modules/Perfil/Mi Perfil/CamaraFoto'
import CamaraM from './modules/Perfil/Documento/CargarDocs/CamaraM'
import CargarIdentificacionM from './modules/Perfil/Documento/CargarDocs/CargarIndentificacionM'
import CargarLicenciaM from './modules/Perfil/Documento/CargarDocs/CargarLicenciaM'
import CargarFotoM from './modules/Perfil/Documento/CargarDocs/CargarFotoM'
import CargarCartaM from './modules/Perfil/Documento/CargarDocs/CargarCartaM'
import CargarComprobanteM from './modules/Perfil/Documento/CargarDocs/CargarComprobanteM'
import CargarPruebaTM from './modules/Perfil/Documento/CargarDocs/CargarPruebaTM'
import Configuracion from './modules/Perfil/Configuracion/Configuracion'
import MiPerfil from './modules/Perfil/Mi Perfil/MiPerfil'
import Ciudad from './modules/Perfil/Mi Perfil/Ciudad/Ciudad'
import Servicio from './modules/Perfil/Mi Perfil/Servicio/Servicio'
import CuentaBancaria from './modules/Perfil/Mi Perfil/CuentaBancaria/CuentaBancaria'
import InformacionPersonal from './modules/Perfil/Mi Perfil/InformacionPersonal/InformacionPersonal'
import SeguridadCuenta from './modules/Perfil/Configuracion/SeguridadCuenta/SeguridadCuenta'
import Contrasena from './modules/Perfil/Configuracion/SeguridadCuenta/Contrasena'
import Telefono from './modules/Perfil/Configuracion/SeguridadCuenta/Telefono'
import Correo from './modules/Perfil/Configuracion/SeguridadCuenta/Correo'
import CodigoV from './modules/Perfil/Configuracion/SeguridadCuenta/CodigoV'



const navigator = createStackNavigator({
  Login:{
    screen : Login,
    navigationOptions: {
      header:null
    }
  },
  Ayuda:{
    screen : Ayuda,
    navigationOptions: {
      headerTitle:'Ayuda'
    }
  },
  VerificarTelefono:{
    screen : VerificarTelefono,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  CodigoVerificacion:{
    screen : CodigoVerificacion,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  Legal:{
    screen : Legal,
    navigationOptions: {
      headerTitle:'Términos y Condiciones'
    }
  },
  TerminosyCondiciones:{
    screen : TerminosyCondiciones,
    navigationOptions: {
      headerTitle:'Términos y Condiciones'
    }
  },
  Privacidad:{
    screen : Privacidad,
    navigationOptions: {
      headerTitle:'Aviso de Privacidad'
    }
  },
  OlvideContraseña:{
    screen : OlvideContraseña,
    navigationOptions: {
      headerTitle:'Olvide Mi Contraseña'
    }
  },
  RestablecerContraseña:{
    screen : RestablecerContraseña,
    navigationOptions: {
      headerTitle:'Olvide Mi Contraseña'
    }
  },
  
  CodigoVerificacionContraseña:{
    screen : CodigoVerificacionContraseña,
    navigationOptions: {
      headerTitle:'Olvide Mi Contraseña'
    }
  },
  RecuperacionContrasena:{
    screen : RecuperacionContrasena,
    navigationOptions: {
      headerTitle:'Olvide Mi Contraseña'
    }
  },
  InformacionPersonalRegistro:{
    screen : InformacionPersonalRegistro,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  DocumentoRegistro:{
    screen : DocumentoRegistro,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  IdentificacionOficial:{
    screen : IdentificacionOficial,
    navigationOptions: {
      headerTitle:'Identificación oficial'
    }
  },
  LicenciaConducir:{
    screen : LicenciaConducir,
    navigationOptions: {
      headerTitle:'Licencia de Conducir'
    }
  },
  FotoPerfil:{
    screen : FotoPerfil,
    navigationOptions: {
      headerTitle:'Foto de Perfil'
    }
  },  
  CartaAntecedentes:{
    screen : CartaAntecedentes,
    navigationOptions: {
      headerTitle:'Carta de No Antecedentes Penales'
    }
  },
  ComprobanteD:{
    screen : ComprobanteD,
    navigationOptions: {
      headerTitle:'Comprobante de Domicilio'
    }
  },
  PruebaToxicologica:{
    screen : PruebaToxicologica,
    navigationOptions: {
      headerTitle:'Prueba Toxicológica'
    }
  },
  Camara:{
    screen : Camara,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white'
    }
  },
  CargarIdentificacion:{
    screen : CargarIdentificacion,
    navigationOptions: {
      headerTitle:'Cargar Identificación Oficial'
    }
  },
  CargarLicencia:{
    screen : CargarLicencia,
    navigationOptions: {
      headerTitle:'Cargar Licencia de Conducir'
    }
  },
  CargarFoto:{
    screen : CargarFoto,
    navigationOptions: {
      headerTitle:'Cargar Foto de Perfil'
    }
  },
  CargarCarta:{
    screen : CargarCarta,
    navigationOptions: {
      headerTitle:'Cargar Carta de No Antecedentes'
    }
  },
  CargarComprobante:{
    screen : CargarComprobante,
    navigationOptions: {
      headerTitle:'Cargar Comprobante de Docimicilio'
    }
  },
  CargarPruebaT:{
    screen : CargarPruebaT,
    navigationOptions: {
      headerTitle:'Cargar Prueba Toxicológica'
    }
  },
  CuentaBancariaRegistro:{
    screen : CuentaBancariaRegistro,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
  ValidacionRegistro:{
    screen : ValidacionRegistro,
    navigationOptions: {
      header: null
    }
  },
  Home:{
    screen : Home,
    navigationOptions: {
      header:null
    }
  },
  Perfil:{
    screen : Perfil,
    navigationOptions: {
      headerTitle:'Mi Perfil'
    }
  },
  MiPerfil:{
    screen : MiPerfil,
    navigationOptions: {
      headerTitle:'Mi Perfil'
    }
  },
  FotoPerfilM:{
    screen : FotoPerfilM,
    navigationOptions: {
      headerTitle:'Foto de Perfil'
    }
  },
  DocumentoM:{
    screen : DocumentoM,
    navigationOptions: {
      headerTitle:'Documentos Pendientes'
    }
  },
  IdentificacionOficialM:{
    screen : IdentificacionOficialM,
    navigationOptions: {
      headerTitle:'Identificación oficial'
    }
  },
  LicenciaConducirM:{
    screen : LicenciaConducirM,
    navigationOptions: {
      headerTitle:'Licencia de Conducir'
    }
  },
  CartaAntecedentesM:{
    screen : CartaAntecedentesM,
    navigationOptions: {
      headerTitle:'Carta de No Antecedentes Penales'
    }
  },
  ComprobanteDM:{
    screen : ComprobanteDM,
    navigationOptions: {
      headerTitle:'Comprobante de Domicilio'
    }
  },
  PruebaToxicologicaM:{
    screen : PruebaToxicologicaM,
    navigationOptions: {
      headerTitle:'Prueba Toxicológica'
    }
  },
  CamaraFoto:{
    screen : CamaraFoto,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white'
    }
  },
  CamaraM:{
    screen : CamaraM,
    navigationOptions: {
      headerTransparent: true,
      headerTintColor: 'white'
    }
  },
  CargarIdentificacionM:{
    screen : CargarIdentificacionM,
    navigationOptions: {
      headerTitle:'Cargar Identificación Oficial'
    }
  },
  CargarLicenciaM:{
    screen : CargarLicenciaM,
    navigationOptions: {
      headerTitle:'Cargar Licencia de Conducir'
    }
  },
  CargarFotoM:{
    screen : CargarFotoM,
    navigationOptions: {
      headerTitle:'Cargar Foto de Perfil'
    }
  },
  CargarCartaM:{
    screen : CargarCartaM,
    navigationOptions: {
      headerTitle:'Cargar Carta de No Antecedentes Penales'
    }
  },
  CargarComprobanteM:{
    screen : CargarComprobanteM,
    navigationOptions: {
      headerTitle:'Cargar Comprobante de Domicilio'
    }
  },
  CargarPruebaTM:{
    screen : CargarPruebaTM,
    navigationOptions: {
      headerTitle:'Cargar Prueba Toxicológica'
    }
  },
  Configuracion:{
    screen : Configuracion,
    navigationOptions: {
      headerTitle:'Configuración'
    }
  },
  Servicio:{
    screen : Servicio,
    navigationOptions: {
      headerTitle:'Tipo de Servicio'
    }
  },
  Ciudad:{
    screen : Ciudad,
    navigationOptions: {
      headerTitle:'Ciudad'
    }
  },
  CuentaBancaria:{
    screen : CuentaBancaria,
    navigationOptions: {
      headerTitle:'Datos Bancarios'
    }
  },
  InformacionPersonal:{
    screen : InformacionPersonal,
    navigationOptions: {
      headerTitle:'Información Personal'
    }
  },
  SeguridadCuenta:{
    screen : SeguridadCuenta,
    navigationOptions: {
      headerTitle:'Seguridad de Cuenta'
    }
  },
  Contrasena:{
    screen : Contrasena,
    navigationOptions: {
      headerTitle:'Contraseña'
    }
  },
  Telefono:{
    screen : Telefono,
    navigationOptions: {
      headerTitle:'Número de teléfono'
    }
  },
  Correo:{
    screen : Correo,
    navigationOptions: {
      headerTitle:'Correo Eléctronico'
    }
  },
  CodigoV:{
    screen : CodigoV,
    navigationOptions: {
      headerTitle:'Registrarse'
    }
  },
},{headerLayoutPreset : 'center'});

export default createAppContainer(navigator);