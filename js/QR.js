 var hora_para_generar_qr_manana = "0:0:0"; 
var hora_para_generar_qr_tarde = "12:0:0";
var hoy = new Date();   

function obtenerFechaActual(){ 
    let varHoy = new Date();          
    return  varHoy.getFullYear() + '-' + (varHoy.getMonth() + 1) + '-' + varHoy.getDate();   
}
function obtenerHoraActual(){  
    let diahoy = new Date();        
    return  diahoy.getHours() + ':' + diahoy.getMinutes() + ':' + diahoy.getSeconds();   
}
 //examinar cada 2 segundos si se debe cambiar el QR, segun la hora

 /*
  //ahora de terminamos en que hora se genero el ultimo qr
  if(respuesta[0].hora_generado >= "0:0:0" && respuesta[0].hora_generado < "12:0:0"){
    //estamos en la madrugada AM
}
*/
generar_qr_si_no_se_ha_generado_hoy();


setInterval(        
    function(){         
        generar_qr_ala_hora(hora_para_generar_qr_manana);
        generar_qr_ala_hora(hora_para_generar_qr_tarde);
}, 2000);



var horaReferencia = "12:00"; // hora para controlar el acceso a la funcion generar hora
function generar_qr_ala_hora(pHora){          
    //rango de  hora       
    var horaActual;     
    var rangoMaxHora;    
    rangoMaxHora  = pHora.slice(0, -2);
    rangoMaxHora = rangoMaxHora + ':59';
    //alert("hora actual " + obtenerHoraActual() + " phora "+ pHora + " rango max:"+rangoMaxHora);
    if(obtenerHoraActual() >= pHora && obtenerHoraActual() < rangoMaxHora){                                
        //ENTRA SI LA HORA ACTUAL ESTA DENTRO DEL RANGO DE CAMBIO 
        //siempre debe generar un nuevo qr si estamos en hora de  cambio, 
        //amenos que ya se haya generado
        $.post("backend/gym_obtener_ultimo_QR.php", (response) => {  
            respuesta = JSON.parse(response);             
            if(respuesta[0].hora_generado >= pHora){
                //NO GENERAR
                //ya se ha generad uno despues de la hora de cambio   
                console.log("no generar ya se genero");
                obtener_qr_desde_base_datos();
                MostrarQR();    
            }else{
                //debemos generar porque no se ha generado en la hora de cambio
                console.log("no se ha generado qr generar");
                generarQR(); 
                guardar_qr_base_datos();   
            }                                                     
        });              
    }else{     
        //alert("No entra");        
        //porque no es hora de cambiar QR           
    }
}
   
//generar numero random con rango
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//generarQR();
//codigo para generar QR , codificando el QR
    
function htmlEncode(value){
    return $('<div/>').text(value).html();
}    

$(function() {
    $("#generate").click(function() {
    //document.getElementById("content").value =  random(1,10000);        
    $(".qr-code").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#content").val()) + "&chs=160x160&chld=L|0");
    //alert(document.getElementById("content").value); 
    });
      
});  

function generarQR(){   //genera un QR nuevo con un numero random.
    //alert("generando");
    document.getElementById("content").value =  random(1,10000);
    $(".qr-code").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#content").val()) + "&chs=160x160&chld=L|0")            
    document.getElementById("content").value; // muesra qr          
}
function MostrarQR(){   //genera un QR nuevo con un numero random.
    //alert("generando");
    document.getElementById("content").value;
    $(".qr-code").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#content").val()) + "&chs=160x160&chld=L|0")            
    //guardar el qr  en una variable entera        
}


function guardar_qr_base_datos(){
    //alert("guardando QR base datos");       
  //enpaquetamos los datos  a  subir
    const postDataQR = {        
        codigo_QR_entero: document.getElementById("content").value,
        fecha_generado: obtenerFechaActual(),
        hora_generado: obtenerHoraActual()                                            
    };
    console.log(postDataQR.codigo_QR_entero);    
    console.log(postDataQR.fecha_generado);
    console.log(postDataQR.hora_generado);
  //hago solicitud post para la  base de  datos
    const urlQR ="backend/gym_guardar_QR_generado.php";
    $.post(urlQR, postDataQR, (response) => {        
    console.log("Respuesta si guardo o no en base de datos el QR: "+response);                   
    });
}
var datosQR;
function obtener_qr_desde_base_datos(){
    
    $.ajax({
        url: 'backend/gym_obtener_ultimo_QR.php',
        type: 'GET',
        success: function(response) {
            //alert("entrando a obtener qr");
            console.log("QR RESPUESTA" + response);             
            datosQR = JSON.parse(response); 
            console.log(datosQR);                             
            //mostramos en el input html el codigo              
            document.getElementById("content").value = datosQR[0].codigo_QR_entero;             
        }
        
    });   

}
//funcion que determine si e sla hora de  generar QR y si aun no se ha generado
function generar_qr_si_no_se_ha_generado_hoy(){ 
    alert("entro funcon  gengeng")   ;
    var respuesta;
    $.post("backend/gym_obtener_ultimo_QR.php", (response) => {  
        respuesta = JSON.parse(response); 
        console.log(respuesta);        
        //alert(respuesta[0].fecha_generado);
        //alert(obtenerFechaActual());
        if(respuesta[0].fecha_generado != obtenerFechaActual()){              
            //se la fecha es diferente quiere decir que no se ha generado QR hoy                 
            //alert("no se ha generado hoy ");
            //si no se ha generado entonces identificamos si estamos en la mañana o en la tarde                      
            alert("entrooo1");
            console.log("no se ha generado hoy ");
            generarQR();
            guardar_qr_base_datos();                            

        }else{
            //si se ha generado un qr hoy puesto que las fechas coinciden                
            //alert("YA se genero hoy ");      
            console.log("YA SE HA GENERADO   hoy "); 
            alert("entroo2o");
            obtener_qr_desde_base_datos();
            MostrarQR();
        }
    }); 
}

///////////////////////////
//Generar QR  con nodejs
/* 
const fs = require("fs"); //acedemos  a files sistem
const qrcode = require("qrcode"); //modulo para generar QR

const urlCv = "wwww";
const  run = async() => {
    const QR= await qrcode.toDataURL(urlCv)
    const htmlContent= `
    <img src="${QR}">
    `;
    fs.writeFileSync('./index-prueba.html', `${htmlContent}`)    
}
run()
*/

/*
if( obtenerHoraActual() >= hora_para_generar_primer_qr && obtenerHoraActual() < hora_para_generar_segundo_qr){
    //estamos en la mañana
    generarQR();
    guardar_qr_base_datos();                
} 
*/ 