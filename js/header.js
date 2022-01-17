var var_header= document.querySelector("header");
window.onscroll = function() {
    var y = window.scrollY;
    if(y > 32){	        
        //negro el header   grad	  
      var_header.style  =   "background-color :   rgba(128, 0, 128, 0.26); ";
      var_header.style = "  background-image: linear-gradient(to right, #196DE9,#502a914b, #00000010);";
    }else{
        //desaparece el header mientras este en la parte superior
      var_header.style  =   "background-color : transparent";      
    }
     
}  