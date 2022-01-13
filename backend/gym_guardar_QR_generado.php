<?php    
    include('database.php');
                
        if(isset($_POST['codigo_QR_entero'])){
        $codigo_QR_entero = $_POST['codigo_QR_entero'];
        $hora_generado = $_POST['hora_generado'];                                      
        $fecha_generado = $_POST['fecha_generado'];  

        $query = "INSERT into tbl_gym_QR(codigo_QR_entero, fecha_generado, hora_generado)
        VALUES('$codigo_QR_entero','$fecha_generado','$hora_generado')";        
        
        $result = mysqli_query($connection, $query);
        if(!$result) {
            die('Add Query Failed');
        }

        echo 'Product Added Successfully';
    }else{
        echo 'no existe el codigo entero';
    }
  
?>