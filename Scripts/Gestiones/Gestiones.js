$(document).ready(function() {
/*
* Configuracion evento NodeJS
*/
AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
  	AppConfig.socketDataAdmin.emit('GetListadoGes', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Gestiones Ini");			//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);											//console.log(decrypted);									
		$.each(decrypted, function () {
			$.each(this, function (name1, value1) {	//console.log(name1 + '=' + value1);
				$("#TBList").append('<tr id="f'+name1+'"></tr>');
				$.each(value1, function (name, value) {	console.log(name + '=' + value);
					if(name!="id_actividad"){
						$('#f'+name1).append("<td>"+value+"</td>");
					} else{
						$('#f'+name1).append("<td>"+value+"</td><td>"+value+"</td>");
					}
		      	});

			});
		});
		AppConfig["ListadoGes"]=decrypted;									//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		
		var oTable = $('#TBList').dataTable({
			"aLengthMenu": [[20, 10, 50, 100], [20, 10, 20, 50,100]],
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
			"bJQueryUI": true
		});		
		
	  	console.log(moment().format('h:mm:ss:SSSS')+" Mun Gestiones FIN");
	});
});