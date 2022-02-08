let interes = 0.05;
let  valor_invertir = 0; //valor   invertir en dolares 
let ganancias_plazo = 0;
let meses_inversion = 0;

$('#formulario-simulador-inversion').submit(e => {        
  e.preventDefault();     
  //antes  de  calcular  comprobar  si  los  campos estan llenos   
    valor_invertir =  $('#id-valor-inversion').val();
    meses_inversion =  $('#select-meses-inversion').val();
    alert(meses_inversion);
    ganancias_plazo = (valor_invertir * interes) * meses_inversion;       
    $("#id-resultado-inversion").val(ganancias_plazo + " USD");    
});


$(document).on('click', '.simulador-inversiones' , function(){                
    //despliegue detalles con toggle        
    $(".div-interfaz-simulador").toggleClass("desplegar-hacia-izquierda");        
});  

//funciones para onmouseover y onmouseout
function bigImg(x) {
  x.style= "background-color :#00AFFF";   
}

function normalImg(x) {
  x.style= "background-color: #d682b06e;";   
}
