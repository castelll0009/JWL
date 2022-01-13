<?php
    $codigoQr = false;
    include('database.php');
   
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $nombre_usuario = $_POST['nombre_usuario'];
        $contrasena = $_POST['controsena'];
        $telefono = $_POST['telefono'];
        $nombre = $_POST['nombre'];
        $cedula = $_POST['cedula'];
        $nivel = $_POST['nivel'];
        $correo = $_POST['correo'];
        $cantidad_dias_asistidos = $_POST['cantidad_dias_asistidos'];
       

        // Establecer niveles 
     
        $cantidad_dias_asistidos = 60;
      //  $id = uniqid(),'<br />';
        if($codigoQr){
            $cantidad_dias_asistidos +=1;
        }
        
            if($cantidad_dias_asistidos <= 30){
                $nivel = 'principiante';
            }
            if($cantidad_dias_asistidos > 30 && $cantidad_dias_asistidos <= 40){
                $nivel = 'aficionado';
             }
            if($cantidad_dias_asistidos > 40 && $cantidad_dias_asistidos <= 55){
                $nivel = 'intermedio';
            }
            if($cantidad_dias_asistidos > 55 && $cantidad_dias_asistidos <= 70){
                $nivel = 'avanzado';
            }
            if ($cantidad_dias_asistidos > 70 && $cantidad_dias_asistidos <= 80){
                $nivel = 'instructor';
            }
             if ($cantidad_dias_asistidos > 90 && $cantidad_dias_asistidos <= 500){
                $nivel = 'MasterFit';
             }
           
            
      
        $query = "INSERT into tbl_gym_usuario(id,nombre_usuario, contrasena, telefono, nombre, cedula, nivel, correo, cantidad_dias_asistidos) VALUES ('$id','$nombre_usuario','$contrasena','$telefono','$nombre','$cedula','$nivel','$correo','$cantidad_dias_asistidos')";
        
        $result = mysqli_query($connection, $query);
        if(!$result) {
            die('Add Query Failed');
        }

        echo 'Product Added Successfully';
    }

?>