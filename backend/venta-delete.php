<?php 

    include('database.php');

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $id = "1";
        $query = "DELETE FROM tbl_venta WHERE id = $id";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Delete Query Failed');
        }

        echo 'Task Deleted Successfully';
   }

?>