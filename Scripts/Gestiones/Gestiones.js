$(document).ready(function() {
	var oTable;
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
					"deferRender": true
				};
	var Eventos = function(){
	  	$(".btn_add_visita").click(function(){		//console.log("Click");	console.log($(this).attr( 'val' ));
	  		var fila = $(this).attr('f');
	  		var NomG = $('#d'+fila).text(); //console.log(NomG);
	  		Func.SetNomGestion(NomG);
	  		Func.SetIdGestion($(this).attr( 'val' ));
	  		setTimeout(function(){
		    	window.location.href = 'AdicionarVisita.html';
			}, 50);
		});
		$(".btn_editar").click(function(){		//console.log("Click");
			console.log($(this).attr( 'val' ));
		});
		$(".btn_eliminar").click(function(){	console.log("Click ELiminar");
			var fila = $(this).attr('f');				//console.log(fila);	//console.log();
			var id_gestion = $(this).attr('val' );		//console.log(id_gestion);	//console.log($.fn.dataTable.isDataTable( oTable ));
			bootbox.confirm('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color:red"></i> Seguro que desea <B>Eliminar</B> la gestión: '+$('#d'+fila).text(), function(result) {
			  	if(result){
		  			AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	 //console.log("Cliente:"+AppConfig.socketDataAdmin.io.engine.id);		
				  	AppConfig.socketDataAdmin.emit('DeleteGestion', {io_id : AppConfig.socketDataAdmin.io.engine.id, id_gestion : id_gestion }, function(message){			
				  		console.log(message);
				  		if(message=="Ok"){	
				  			oTable.row('#f'+fila).remove().draw( false );	console.log('Removido');
				  		}
					});
			  	}
			});
		}); 

		
	}
	var CargarGestiones = function(usrTipo,centroGestor) {
		//OPTIMIZAR CARGA	http://jsfiddle.net/V2Kdz/
		$('#TBList tbody > tr').remove(); //console.log($('#TBList tr').length);	//console.log($('#TBody').length);
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetListadoGes',  {usrTipo : usrTipo, id_centrog : centroGestor}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Listado Gestiones Ini");			//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);											//console.log(decrypted);									
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {	//console.log(name1 + '=' + value1);
					$("#TBody").append('<tr id="f'+name1+'"></tr>');
					$.each(value1, function (name, value) {	//console.log(name + '=' + value);
						if(name!="id_gestion"){
							if(name=="descripcion"){
								$('#f'+name1).append('<td id="d'+name1+'">'+value+'</td>');
							}else $('#f'+name1).append("<td>"+value+"</td>");
						} else {	//<td><a href="#" class="btn_editar" val="'+value+'"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>
							$('#f'+name1).append('<td><div><h4><a href="#" class="btn_add_visita" val="'+value+'" f="'+name1+'"><i class="fa fa-plus-square" aria-hidden="true"></i></a></h4></div></td><td><a href="#" class="btn_eliminar" val="'+value+'" f="'+name1+'"><i class="fa fa-trash" aria-hidden="true"></i></a></td><td><a href="#" class="btn_detalle" val="'+value+'" f="'+name1+'"><i class="fa fa-outdent" aria-hidden="true"></i></a></td>');
						}
			      	});
				}); //console.log("Cargaaaaaa");
			});
			console.log(moment().format('h:mm:ss:SSSS')+" Mun Gestiones FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
			oTable = $('#TBList').DataTable(configTBL);
		  	Eventos();			

		});
	}
	
	console.log("Carga Inicial de Gestiones!");
	CargarGestiones(Func.GetTipo(),Func.GetCentrosG().join());
	
	
	//console.log(Func.GetIdPerfil());
	//console.log(Func.GetTipo());
	
});