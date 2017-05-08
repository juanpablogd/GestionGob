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
					"deferRender": true,
					"aaSorting": []
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
		$(".btn_editar").click(function(){		console.log($(this).attr( 'val' ));
	  		var fila = $(this).attr('f');
	  		var NomG = $('#d'+fila).text(); //console.log(NomG);
	  		Func.SetNomGestion(NomG);
	  		Func.SetIdGestion($(this).attr( 'val' ));
	  		setTimeout(function(){
	  			window.open(
				  'Editar.html',
				  '_blank' // <- This is what makes it open in a new window.
				); 
			}, 50);
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
		$(".btn_detalle").click(function(){	console.log("Click Detalle");
	  		var fila = $(this).attr('f');
	  		var NomG = $('#d'+fila).text(); //console.log(NomG);
	  		Func.SetNomGestion(NomG);
	  		Func.SetIdGestion($(this).attr( 'val' ));
	  		setTimeout(function(){
	  			window.open(
				  'Detalle.html',
				  '_blank' // <- This is what makes it open in a new window.
				);
		    	//window.location.href = 'Detalle.html';
			}, 50);
		});
	};
	var CargarGestiones = function(usrTipo,centroGestor) {
		//OPTIMIZAR CARGA	http://jsfiddle.net/V2Kdz/
		$('#TBList tbody > tr').remove(); //console.log($('#TBList tr').length);	//console.log($('#TBody').length);
		 $('#TBList tfoot th').each( function () {
	        var title = $(this).text();
	        $(this).html( '<input type="text" placeholder="Buscar: '+title+'" />' );
	    } );
		
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetListadoGes',  {usrTipo : usrTipo, id_centrog : centroGestor}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Listado Gestiones Ini");			//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);
			if(Func.GetTipo()=="C"){
				$("#TBList tr td,th").filter(':nth-child(9)').remove();
				$("#TBList tr td,th").filter(':nth-child(9)').remove();
				$("#TBList tr td,th").filter(':nth-child(9)').remove();				
			}
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {		//console.log(value1);	//console.log(name1 + '=' + value1); 
					$("#TBody").append('<tr id="f'+name1+'"></tr>');
					$.each(value1, function (name, value) {	//console.log(name + '=' + value);
						if(name=="avance"){
							if(value=="0") $('#f'+name1).css('color', 'red'); 
						} else {	
							if(name!="id_gestion"){
								if(name=="descripcion"){
									$('#f'+name1).append('<td id="d'+name1+'">'+value+'</td>');
								}else $('#f'+name1).append("<td>"+value+"</td>");
							} else {
								if(Func.GetTipo()=="C"){
									$('#f'+name1).append('<td><a href="#" class="btn_detalle" val="'+value+'" f="'+name1+'"><i class="fa fa-outdent" aria-hidden="true"></i></a></td>');
								} else{
									$('#f'+name1).append('<td><a href="#" class="btn_detalle" val="'+value+'" f="'+name1+'"><i class="fa fa-outdent" aria-hidden="true"></i></a></td><td><div><h4><a href="#" class="btn_add_visita" val="'+value+'" f="'+name1+'"><i class="fa fa-plus-square" aria-hidden="true"></i></a></h4></div></td><td><a href="#" class="btn_editar" val="'+value+'" f="'+name1+'"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td><td><a href="#" class="btn_eliminar" val="'+value+'" f="'+name1+'"><i class="fa fa-trash" aria-hidden="true"></i></a></td>');								
								}
							}
						}
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
		    console.log(moment().format('h:mm:ss:SSSS')+" Mun Gestiones FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
		  	Eventos();
		});
	};
	console.log("Carga Inicial de Gestiones!");
	CargarGestiones(Func.GetTipo(),Func.GetCentrosG().join());
	if(Func.GetTipo()=="C"){
		$("#div_add").hide();
	}
});