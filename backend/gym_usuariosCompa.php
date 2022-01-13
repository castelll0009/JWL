<?php 

    include('database.php');
    $nombre_usuario = $_POST['nombre_usuario'];
    if(!empty($nombre_usuario)) {
      $query = "SELECT * FROM tbl_gym_usuario WHERE nombre_usuario LIKE '$nombre_usuario%'";
      $result = mysqli_query($connection, $query);
      if(!$result) {
        die('Query Error' . mysqli_error($connection));
      }
    $telefono = $_POST['telefono'];  
    if(!empty($telefono)) {
      $query = "SELECT * FROM tbl_gym_usuario WHERE nombre_usuario LIKE '$telefono%'";
      $result = mysqli_query($connection, $query);
      if(!$result) {
        die('Query Error' . mysqli_error($connection));
      }
    }
    $cedula = $_POST['cedula'];
    if(!empty($cedula)) {
      $query = "SELECT * FROM tbl_gym_usuario WHERE nombre_usuario LIKE '$cedula%'";
      $result = mysqli_query($connection, $query);
      if(!$result) {
        die('Query Error' . mysqli_error($connection));
      }
    }
    $correo = $_POST['correo'];
    if(!empty($cedula)) {
      $query = "SELECT * FROM tbl_gym_usuario WHERE nombre_usuario LIKE '$search%'";
      $result = mysqli_query($connection, $query);
      if(!$result) {
        die('Query Error' . mysqli_error($connection));
      }
    }

?>