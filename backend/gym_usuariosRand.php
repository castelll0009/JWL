<?php 

    include('database.php');

        //elejimos  un producto de  forma  ramdom
        $query =  "SELECT * FROM tbl_gym_usuario ORDER BY RAND() LIMIT 1";
        //$query = "SELECT * FROM tbl_producto WHERE id = $id";
        $result = mysqli_query($connection, $query);
        
        if(!$result){
            die('Single Query Failed');
        }

        $json = array();
        while($row = mysqli_fetch_array($result)) {
            $json[] = array(
               'nombre_usuario' => $row['nombre_usuario'],
               'contrasena' => $row['contrasena'],      
               'telefono' => $row['telefono'],   
               'nombre' => $row['nombre'],         
               'cedula' => $row['cedula'],  
               'nivel' => $row['nivel'],
               'correo' => $row['correo'],
               'cantidad_dias_asistidos' => $row['cantidad_dias_asistidos'],
               'id' => $row['id']
                );
        }
        $jsonstring = json_encode($json[0]);
        echo  $jsonstring;
        
    

?>