<?php 
    include('database.php');
    echo "primera linea";
    echo $id = $_POST['id'];
    echo "segunda linea";
   if(isset($_POST['id'])){
        $id = $_POST['id'];
        
        $query = "DELETE FROM tbl_gym_usuario WHERE id = $id";
        $result = mysqli_query($connection, $query);
        echo "dsadasasdsadasdasdasdasd";
        echo $result;
        
        if(!$result){
            die('Delete Query Failed');
        }

        echo 'Task Deleted Successfully';
  }
  else 
  echo 'NO llega ningun argumento';
?>