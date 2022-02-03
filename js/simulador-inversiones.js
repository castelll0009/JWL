let interes = 0.05;
let  valor_invertir = 0; //valor   invertir en dolares 
let ganancias_plazo = 0;
let meses_inversion = 0;


$(document).on('click', '.boton-delete', function() {

  //antes  de  calcular  comprobar  si  los  campos estan llenos
   
    valor_invertir =  $('#id-valor-inversion').val();
    meses_inversion =  $('#select-meses-inversion').val();
    ganancias_plazo = valor_invertir * interes;
   
     
});