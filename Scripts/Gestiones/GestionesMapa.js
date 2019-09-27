$(document).ready(function() {	//console.log(Func.GetIdPerfil());
	var oTable;
	var txtCol;
	
	txtCol = '<a href="#" class="btn_detalle" data-toggle="tooltip" title="Ver Detalle"><i class="fa fa-outdent" aria-hidden="true"></i></a>';

	var columnDefs = [ 
/*		{
          "targets": -1,
          "data": null,
          "defaultContent": txtCol
        }, */
        {
          	"targets": [ 8 ],	//IDGESTION REEMPLAZAR TODOOS LOS NUEVES
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
		"columnDefs": columnDefs
	};
	var CargarGestiones = function(usrTipo,centroGestor) {	//OPTIMIZAR CARGA	http://jsfiddle.net/V2Kdz/
		$('#TBList tbody > tr').remove(); //console.log($('#TBList tr').length);	//console.log($('#TBody').length);
		 $('#TBList tfoot th').each( function () {
	        var title = $(this).text();
	        $(this).html( '<input type="text" placeholder="Buscar: '+title+'" />' );
	    } );
		var param = FuncDecrypted(localStorage.ps);	console.log(param);
		param.usrTipo = usrTipo;
		param.id_centrog = centroGestor;
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetListadoGesMapaOE', param, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Listado Gestiones Ini mapa ");			//console.log(message);
			var decrypted = FuncDecrypted(message);		//console.log(decrypted);
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {		//console.log(value1);	//console.log(name1 + '=' + value1); 
					var numConvenio = "NA";
					var numContrato = "NA";
					var objeto,fechaIni,plazo,vrCto,porcenAvance,semaforo,idGestion,urlEnlace;
					$.each(value1, function (name, value) {		//console.log(name + '=' + value);
						if (name == "nro_con" && value != null) numConvenio = value;
						if (name == "nro_cont"){ var arNC = value.split("|");		//console.log(arNC[0]);
							if((numConvenio == null || numConvenio == "NA") && arNC[0] != null && arNC[0] != "") numConvenio = arNC[0];
							if((numContrato == null || numContrato == "NA") && arNC[1] != null && arNC[1] != "") numContrato = arNC[1];
							if(arNC.length == 1) numContrato = value
						}
						if (name == "objeto" && value != null) objeto = value;
						if (name == "fec_inicio" && value != null) fechaIni = value;
						if (name == "plazo_dias" && value != null) plazo = value;
						if (name == "vr_total" && value != null) vrCto = value;
						if(name=="avance_porcentaje"){
							if(value > 1) value = value / 100;
							if(value < 1) $('#f'+name1).css('color', 'red');
							value = numeral(value).format('0.0%'); //'0.000%'
							porcenAvance = value;
						}
						if (name=="semaforo") semaforo = '<img src="../../Images/'+value+'.png" alt="semaforo" height="16" width="16">';
						if (name == "id_gestion" && value != null) idGestion = value;

						if(name=="enlace_externo"){
							if(value != "" && value != null){
								urlEnlace = '<a href="'+value+'" target="_blank" data-toggle="tooltip" title="Ver Detalle"><i class="fa fa-outdent" aria-hidden="true"></i></a>';
							}else urlEnlace = ''+txtCol+'';
						}
			      	});
			      	$("#TBody").append('<tr id="f'+name1+'">'+
			      			'<td>'+numConvenio+'</td>'+'<td>'+numContrato+'</td>'+'<td>'+objeto+'</td>'+'<td>'+fechaIni+'</td>'+'<td>'+plazo+'</td>'+
			      			'<td>'+vrCto+'</td>'+'<td>'+porcenAvance+'</td>'+'<td>'+semaforo+'</td>'+'<td>'+idGestion+'</td>'+
			      			'<td>'+urlEnlace+'</td>'+
			      		'</tr>');
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
			  		Func.SetNomGestion(data[3]);
			  		Func.SetIdGestion(data[8]);
			  		setTimeout(function(){
			  			window.open(
						  'Detalle.html',
						  '_blank' // <- This is what makes it open in a new window.
						);
					}, 50);
		        }else if(tipo=="btn_add_visita"){
			  		Func.SetNomGestion(data[3]);
			  		Func.SetIdGestion(data[8]);
			  		setTimeout(function(){
				    	window.location.href = 'AdicionarVisita.html';
					}, 50);
		        }else if(tipo=="btn_editar"){
			  		Func.SetNomGestion(data[3]);
			  		Func.SetIdGestion(data[8]);
			  		setTimeout(function(){
			  			window.open(
						  'Editar.html',
						  '_blank' // <- This is what makes it open in a new window.
						); 
					}, 50);
		        }else if(tipo=="btn_eliminar"){
					var fila = data["DT_RowId"];				//console.log(fila);	console.log($(this)[0]);
					bootbox.confirm('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color:red"></i> Seguro que desea <B>Eliminar</B> la gestión: '+data[2], function(result) {
					  	if(result){
				  			AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	 //console.log("Cliente:"+AppConfig.socketDataAdmin.io.engine.id);		
						  	AppConfig.socketDataAdmin.emit('DeleteGestion', {io_id : AppConfig.socketDataAdmin.io.engine.id, id_gestion : data[9] }, function(message){			
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
/*	console.log("Carga Inicial de Gestiones!");
	var param = FuncDecrypted(localStorage.ps);	console.log(param);	*/
	CargarGestiones("C","");
/*	if(Func.UsuarioLogueado()){
		CargarGestiones(Func.GetTipo(),Func.GetCentrosG().join());
		if(Func.GetTipo()=="C"){
			$("#div_add").hide();
		}		
	}else{
		$("#div_add").hide();
	} */


});