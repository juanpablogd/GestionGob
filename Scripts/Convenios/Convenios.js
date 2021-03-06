$(document).ready(function() {
	var oTable;
	var txtCol;
	if(Func.GetTipo()=="C"){
		txtCol = '';	//<a href="#" class="btn_detalle" data-toggle="tooltip" title="Ver Detalle"><i class="fa fa-outdent" aria-hidden="true"></i></a>
	} else{
		txtCol = '<a href="#" class="btn_editar" data-toggle="tooltip" title="Editar Convenio / Contrato"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></br><a href="#" class="btn_eliminar" data-toggle="tooltip" title="Eliminar Convenio / Contrato"><i class="fa fa-trash" aria-hidden="true"></i></a>';
	}
	var columnDefs = [ 
		{
          "targets": -1,
          "data": null,
          "defaultContent": txtCol
        },
        {
          	"targets": [ 5 ],
            "visible": false,
            "searchable": false
        }
	];
	var configTBL = {
		"aLengthMenu": [[50, 10, 20, 100], [50, 10, 20, 100]],
		"oLanguage": {
					"sProcessing":     "Procesando...",
					"sLengthMenu":     "Mostrar _MENU_ registros",
					"sZeroRecords":    "No se encontraron resultados",
					"sEmptyTable":     "Ningún dato disponible en esta tabla",
					"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
					"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
					"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
					"sInfoPostFix":    "",
					"sSearch":         "Buscar:",
					"sUrl":            "",
					"sInfoThousands":  ",",
					"sLoadingRecords": "Cargando...",
					"oPaginate": {
						"sFirst":    "Primero",
						"sLast":     "Último",
						"sNext":     "Siguiente",
						"sPrevious": "Anterior"
					},
					"oAria": {
						"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
						"sSortDescending": ": Activar para ordenar la columna de manera descendente"
					}
		},
		"dom": 'Bfrtip',
		"buttons": [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
		"columnDefs": columnDefs
	};
	var CargarConvenios = function(usrTipo,centroGestor) {	//OPTIMIZAR CARGA	http://jsfiddle.net/V2Kdz/
		$('#TBList tbody > tr').remove(); //console.log($('#TBList tr').length);	//console.log($('#TBody').length);
		 $('#TBList tfoot th').each( function () {
	        var title = $(this).text();
	        $(this).html( '<input type="text" placeholder="Buscar: '+title+'" />' );
	    } );
		
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('getlistadoConvenio',  {usrTipo : usrTipo, id_centrog : centroGestor} , function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Listado Gestiones Ini");			//console.log(message);
			var decrypted = FuncDecrypted(message);		//console.log(decrypted);
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {		//console.log(value1);	//console.log(name1 + '=' + value1);
					$("#TBody").append('<tr id="f'+name1+'"></tr>');
					$.each(value1, function (name, value) {		//console.log(name + '=' + value);
						if(name=="id"){
							$('#f'+name1).append("<td>"+value+"</td><td></td>");
						}else if (name == "id_usuario"){
/*							if(Func.GetTipo()=="C" || (Func.GetTipo()=="E" && (id_usuario != value && value != null)) ){ //si es consulta o cargue y la gestion no es su propiedad
								txtCol = '<a href="#" class="btn_detalle" data-toggle="tooltip" title="Ver Detalle"><i class="fa fa-outdent" aria-hidden="true"></i></a></br><a href="#" class="btn_add_visita" data-toggle="tooltip" title="Adicionar avance"><i class="fa fa-plus-square" aria-hidden="true"></i></a></br><a href="#" class="btn_editar" data-toggle="tooltip" title="Editar Gestión"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>';
							} else txtCol = '<a href="#" class="btn_detalle" data-toggle="tooltip" title="Ver Detalle"><i class="fa fa-outdent" aria-hidden="true"></i></a></br><a href="#" class="btn_add_visita" data-toggle="tooltip" title="Adicionar avance"><i class="fa fa-plus-square" aria-hidden="true"></i></a></br><a href="#" class="btn_editar" data-toggle="tooltip" title="Editar Gestión"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></br><a href="#" class="btn_eliminar" data-toggle="tooltip" title="Eliminar Gestión"><i class="fa fa-trash" aria-hidden="true"></i></a>';
							$('#f'+name1).append("<td>"+txtCol+"</td>");	*/
						} 
						else $('#f'+name1).append("<td>"+value+"</td>");
						
			      	});
				}); //console.log("Cargaaaaaa");
			});
			oTable = $('#TBList').DataTable(configTBL);
			
			// Aplicar Busqueda x Columnas
		    oTable.columns().every( function () {
		        var that = this;
		        $( 'input', this.footer() ).on( 'keyup change', function () {
		            if ( that.search() !== this.value ) {
		                that
		                    .search( this.value )
		                    .draw();
		            }
		        } );
		    } );
		    $('#TBList tbody').on( 'click', 'a', function () {	//console.log($(this).attr("class"));
		        var data = oTable.row( $(this).parents('tr') ).data();	//console.log(data);
		        var tipo = $(this).attr("class");
		        if(tipo=="btn_detalle"){
			  		Func.setIdconvenio(data[5]);
			  		Func.setNomconvenio(data[1]);
/*			  		setTimeout(function(){
			  			window.open(
						  'Detalle.html',
						  '_blank' // <- This is what makes it open in a new window.
						);
					}, 50);	*/
		        }else if(tipo=="btn_editar"){
			  		Func.setIdconvenio(data[5]);
			  		Func.setNomconvenio(data[1]);
			  		setTimeout(function(){
			  			window.open(
						  'Editar.html',
						  '_top' // <- This is what makes it open in a new window.
						); 
					}, 50);
		        }else if(tipo=="btn_eliminar"){
					var fila = data["DT_RowId"];				//console.log(fila);	console.log($(this)[0]);
					bootbox.confirm('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color:red"></i> Seguro que desea <B>Eliminar</B> el Convenio: '+data[2], function(result) {
					  	if(result){
				  			AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	 //console.log("Cliente:"+AppConfig.socketDataAdmin.io.engine.id);		
						  	AppConfig.socketDataAdmin.emit('deleteConvenio', {io_id : AppConfig.socketDataAdmin.io.engine.id, id_convenio : data[5], tipo : data[4] }, function(message){			
						  		console.log(message);
						  		if(message=="Ok"){	
						  			oTable.row('#'+fila).remove().draw( false );	console.log('Removido');
						  		}
							});
					  	}
					});
		        }	//console.log( data[0] +"'s salary is: "+ data[ 7 ] );
		    } );	
		    console.log(moment().format('h:mm:ss:SSSS')+" Mun Gestiones FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
		  	$('[data-toggle="tooltip"]').tooltip(); 
		});
	};
	console.log("Carga Inicial de Convenios!");
	CargarConvenios(Func.GetTipo(),Func.GetCentrosG().join());
	if(Func.GetTipo()=="C"){
		$("#div_add").hide();
	}
});