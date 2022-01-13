$(document).ready(function() {
  // Global Settings
  let edit = false;

  // Testing Jquery
  console.log('jquery is working!');
  fetchUsers();
  $('#product-result').hide();

  // Search by Key Type (Event)
  $('#search').keyup(function() {
    if($('#search').val()) {
      let search = $('#search').val();
      $.ajax({
        url: 'backend/gym_usuariosSearch.php',        
        type: 'POST',
        data: {search}, 
        success: function(response) {
          const users = JSON.parse(response);
          let template = '';
          console.log(users);
          users.forEach(user => {
            template += `
                   <tr id="${user.id}">
                      <td>${user.id}</td>
                      <td>
                      <a href="#" class="user-item">
                       ${user.nombre_usuario} 
                      </a>
                   </td>                   
                    <td>${user.contrasena}</td>
                    <td>${user.telefono}</td>
                    <td>${user.nombre}</td>
                    <td>${user.cedula}</td>
                    <td>${user.nivel}</td>
                    <td>${user.correo}</td>
                    <td>${user.cantidad_dias_asistidos}</td>
                   <td>
                        <a class="btn btn-secondary">
                          <i class="fas fa-cog"></i>
                        </a>
                        <a class="user-delete btn btn-danger" style="color:#fff;">
                          <i class="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  `
          });
          $('#users').html(template);
        }
      })
    } 
    else {
      fetchUsers();
    }
  });

  // Fetching Products
  function fetchUsers() {
    console.log("entrando en funcion ENLISTAR");
    $.ajax({
      url: 'backend/gym_usuariosList.php',
      type: 'GET',
      success: function(response) {
        console.log("response de AJAXXXXX" + response); 
        const users = JSON.parse(response);
        let template = '';
      //  let template_nuevo_producto = '';
        //console.log(users);
        //andres
        users.forEach(user => {
          template += `
                  <tr id="${user.id}">
                    <td>${user.id}</td>
                    <td>
                    <a href="#" class="user-item">
                      ${user.nombre_usuario} 
                    </a>
                    </td>                   
                    <td>${user.contrasena}</td>
                    <td>${user.telefono}</td>                    
                    <td>${user.name}</td>                                                          
                    <td>${user.correo}</td>
                    <td>${user.dias_asistidos}</td>
                    <td>
                      <a class="btn btn-secondary">
                        <i class="fas fa-cog"></i>
                      </a>
                      <a class="user-delete btn btn-danger" style="color:#fff;">
                        <i class="far fa-trash-alt"></i>
                      </a>
                    </td>
                  </tr>
                `                
               /*
                //ahora creamos una template para la IU
                template_nuevo_producto +=`
                <figure class="figure-container">					
                  <h1 class="h-productos">${product.nickname}</h1>	
                  <div class="div-imagen">
                    <img class="imagen-producto"  src="imgs/nuevo.jpg" >						
                  </div>
                  <div class="div-detalles-producto">
                    <h2>${product.precio}</h2>						
                  </div>															
                  <!-- contenedor de  los items del menu-->																		
			        	</figure>                
               `*/

        });
        $('#users').html(template);
        //$('#cards-container-mysql').html(template_nuevo_producto);       
      }
    });
  }
  
  // Send Products (New or Edited)
  $('#user-form').submit(e => {
    e.preventDefault();
    const postData = {
      id: $('#id').val(),
      nombre_usuario: $('#nombre_usuario').val(),
      contrasena: $('#contrasena').val(),
      telefono: $('#telefono').val(),
      nombre: $('#nombre').val(),            
      correo: $('#correo').val(),      
    };
    console.log("NOMBREEE A GUARDARSS" + postData.nombre_usuario);
    const url = edit === false ? 'backend/gym_usuariosAdd.php' : 'backend/gym_usuarioEdit.php';
    console.log(postData, url); 
    $.post(url, postData, (response) => {
      edit=false;
      console.log(response);
      $('#user-form').trigger('reset');
      document.getElementById('name-action').innerHTML = 'New User';
      fetchUsers();
    });
  });

  // Delete a Single Product
  $(document).on('click', '.user-delete', function() {
    if(confirm('¿Seguro que quieres eliminar este producto?')) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr('id');
      console.log("id para eleminar");
      
      console.log(id);
      console.log("---id para eleminar");
    //  console.log(response);
      $.post('backend/gym_usuariosDelete.php', {id}, function(response) {
        console.log(response);
        fetchUsers();
      });
    }
  });

  ///comparar si existe este mismo nombre
  

 

  // Show a USer Listed Selected in Formulary
  $(document).on('click', '.user-item', function() {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("id");
      //console.log(id);
      $.post('backend/gym_usuariosSingle.php', {id}, function(response){
        edit = true;
        //console.log(response);
        const user = JSON.parse(response);
        //console.log(user);
        $('#id').val(user.id);
        $('#nombre_usuario').val(user.nombre_usuario);
        $('#contrasena').val(user.contrasena);
        $('#telefono').val(user.telefono);
        $('#nombre').val(user.nombre);
        $('#cedula').val(user.nombre);
        $('#nivel').val(user.nivel);
        $('#correo').val(user.correo);
        $('#cantidad_dias_asistidos').val(user.cantidad_dias_asistidos);
        //title action
        document.getElementById('name-action').innerHTML = 'Edit User';
     })
  });
});