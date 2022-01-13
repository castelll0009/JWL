<?php

  include('database.php');
  
  $query = "SELECT * FROM tbl_gym_QR ORDER BY id DESC LIMIT 1";  
  $result = mysqli_query($connection, $query);

  /* si no hay  encuentra resultados se cierra la conexion*/
  if(!$result) {
    die('Query Failed'. mysqli_error($connection));
  }

  $json = array();
  while($row = mysqli_fetch_array($result)) {
    $json[] = array(      
      'codigo_QR_entero' => $row['codigo_QR_entero'], 
      'fecha_generado' => $row['fecha_generado'],     
      'hora_generado' => $row['hora_generado'],                
      'id' => $row['id']
    );
  }

  $jsonstring = json_encode($json);
  echo $jsonstring;
?>

