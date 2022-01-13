<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $nombre_usuario = $_POST['nombre_usuario'];
        $contrasena = $_POST['contrasena'];
        $telefono = $_POST['telefono'];
        $nombre = $_POST['nombre'];
        $cedula = $_POST['cedula'];
        $nivel = $_POST['nivel'];
        $correo = $_POST['correo'];        
        $cantidad_dias_asistidos = $_POST['cantidad_dias_asistidos'];        


        $query = "UPDATE tbl_gym_usuario SET nombre_usuario = '$nombre_usuario', contrasena = '$contrasena',  telefono = '$telefono', nombre = '$nombre', cedula = '$cedula',nivel = '$nivel',correo = '$correo',cantidad_dias_asistidos = '$cantidad_dias_asistidos' WHERE id = '$id'";

        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Edit Query Failed');
        }
    }

    echo "Update Product Successfully";
?>