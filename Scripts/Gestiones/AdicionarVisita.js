$(document).ready(function() {
	var IdGestion = Func.GetIdGestion(); //console.log(IdGestion);
	/* VAlida Acceso */	
	if(IdGestion == "" || Func.GetTipo()=="C")	window.location.href = 'index.html';

AppConfig.SetNombreGestion= function() {
	var NomGestion = Func.GetNomGestion();
	$("#nom_gestion").text(NomGestion);
};

AppConfig.estadoPanel= function(objeto,evento){	//console.log(objeto);
	var $this = objeto;		//console.log($this.prev());
	var $pheading = $this.prev();
	if(evento == "Abrir"){
		$this.hide();		
		$this.slideDown();
		$pheading.find('span').removeClass('panel-collapsed');
		$pheading.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}else{
		$this.show();
		$this.slideUp();
		$pheading.find('span').addClass('panel-collapsed');
		$pheading.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	}
}

AppConfig.Inicial= function() {
	/* CODIGO DE PANEL DESPLEGABLE */
	$(document).on('click', '.panel-heading span.clickable', function(e){
	    var $this = $(this);
		if(!$this.hasClass('panel-collapsed')) {
			$this.parents('.panel').find('.panel-body').slideUp();
			$this.addClass('panel-collapsed');
			$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		} else {
			$this.parents('.panel').find('.panel-body').slideDown();
			$this.removeClass('panel-collapsed');
			$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		}
	});
	
	/* SELECT - PROVINCIAS/MUNICIPIO */
	$('#codigo_mun').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['codigo_mun'] = $('#codigo_mun option:selected').map(function(a, item){ return item.value;}).get();		//console.log(AppConfig['codigo_mun']);
            },
            onSelectAll: function(checked) {
            	AppConfig['codigo_mun'] = $('#codigo_mun option:selected').map(function(a, item){return item.value;}).get();		//console.log(AppConfig['codigo_mun']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['codigo_mun'] = $('#codigo_mun option:selected').map(function(a, item){return item.value;}).get();		//console.log(AppConfig['codigo_mun']);
	        }
	});
	/* SELECT - estado */
	$('#sel_id_estado').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_estado'] = $('#sel_id_estado option:selected').map(function(a, item){return item.value;}).get();	//console.log('onChange: '+AppConfig['id_convenio']);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_estado'] = $('#sel_id_estado option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_estado'] = $('#sel_id_estado option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
	        }
	});

	$('#fecha').datetextentry('set_date',moment().format('YYYY-MM-DD'));
	
	$("input[name='semaforo']").change(function(){
		var sem = $("input[name='semaforo']:checked").val();	//console.log(sem);
		if(sem=="1"){
			$("#verde").css("background","#ccc");
			$("#amarillo").css("background","#ccc");
			$("#rojo").css("background","#cc0000");
		}else if (sem == "2"){
 			$("#verde").css("background","#ccc");
			$("#amarillo").css("background","#f1da36");
			$("#rojo").css("background","#ccc");
		}else{
			$("#amarillo").css("background","#ccc");
			$("#rojo").css("background","#ccc");
	      	$("#verde").css("background","#8fc800");
		}
	});
	
	$('#input-1').on('fileloaded', function(event, file, previewId, index, reader) {
		console.log("fileloaded");
		$('.kv-file-upload.btn.btn-xs.btn-default').hide();
	});
	
	$('#input-1').on('filebatchuploadcomplete', function(event, files, extra) {
	    //console.log('File batch upload complete');
	 	bootbox.alert("El avance se ha guardado exitosamente!", function() {
			window.location.href = 'AdicionarVisita.html';
		});
	});

	$("#input-1").fileinput({
	    uploadUrl: "http://saga.cundinamarca.gov.co/SIG/servicios/GestionGob/sa_imagen.php", // server upload action
	    language: "es",
	    minFileCount: AppConfig.MinImagen,
	    maxFileCount: AppConfig.MaxImagen,
	    minImageWidth: AppConfig.minImageWidth,
    	minImageHeight: AppConfig.minImageHeight,
    	showUpload: false,
    	maxFileSize: AppConfig.tamanoArchivo,
	    uploadExtraData: function (previewId, index) {	//console.log(AppConfig["id_visita"]);
			    var data = {
				        id_gestion: IdGestion,
				        id_visita: AppConfig["id_visita"]
				    };	//console.log(data);
			    return data;
		}
	});
	
	$('[data-toggle="tooltip"]').tooltip();
	AppConfig.estadoPanel($('#addGestion-panel-body'),'cerrar');

};

AppConfig.CargaMunicipios= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
  	AppConfig.socketDataAdmin.emit('GetListMpioSimple', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Municipios Ini");		//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoMpio"]=decrypted;											//console.log("geojson Mun:" + AppConfig["ListadoMpio"].features.length);
		$('#codigo_mun').multiselect('dataprovider', AppConfig["ListadoMpio"]);		//console.log(AppConfig["ListadoMpio"]);
		console.log(moment().format('h:mm:ss:SSSS')+" FIN");
/*		$('option', $('#codigo_mun')).each(function(element) {
                $(this).removeAttr('selected').prop('selected', false);
        });
        $('#codigo_mun').multiselect('refresh');
		//$('.multiselect-selected-text').text(' -- Seleccione -- '); */
	  	
	});
};
AppConfig.cargaEstados= function() {
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('getlistaEstadosParam', '', function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Estados");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["listadoEstados"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		$('#sel_id_estado').multiselect('dataprovider', AppConfig["listadoEstados"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};

var Eventos = function(){
	$(".btn_eliminar_visita").click(function(){	console.log("Click ELiminar");
		var vis = $(this).attr('v');		console.log(vis);
		var id = $(this).attr('val' );		console.log(id);
		bootbox.confirm('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color:red"></i> Seguro que desea <B>Eliminar</B> el avance: <B>'+$('#descripcion_vis_'+vis).text()+'</B>', function(result) {
		  	if(result){
	  			AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	 //console.log("Cliente:"+AppConfig.socketDataAdmin.io.engine.id);		
			  	AppConfig.socketDataAdmin.emit('DeleteVisita', {id : id }, function(message){			
			  		console.log(message);
			  		if(message=="Ok"){	
			  			AppConfig.CargarVisitas();
			  		}
				});
		  	}
		});
	});
};

AppConfig.CargarVisitas= function() {
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetUnicaGesVisita',  {id_gestion : IdGestion}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Visitas Ini");			//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);											console.log(decrypted.datos.length); console.log(decrypted);
			$("#panel-visitas").html('');
			if(decrypted.datos.length){
				$.each(decrypted, function () {
					$.each(this, function (name1, value1) {		console.log(value1.id);
						var eliminar;
						if(Func.GetTipo()!="C"){
							eliminar  = '<a  class="btn_eliminar_visita" val="'+value1.id+'" v="'+name1+'">Eliminar <i class="fa fa-trash" aria-hidden="true"></i></a>';
						}
						var html =	  '<div id="panel_heading_'+name1+'" class="panel-heading"></div>'+
								      '<div id="panel_body_'+name1+'" class="panel-body">'+
								      		'<div class="row">'+
								      			'<div class="col-sm-12">'+
								      				'<label for="descripcion_vis_'+name1+'">Descripción:&nbsp;</label><label id="descripcion_vis_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      		'</div>'+
								      		'<div class="row">'+
								      			'<div class="col-sm-3">'+
								      				'<label for="codigo_mun_vis_'+name1+'">Municipio:&nbsp;</label><label id="codigo_mun_vis_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      			'<div class="col-sm-3">'+
								      				'<label for="nom_estado_vis_'+name1+'">Estado:&nbsp;</label><label id="nom_estado_vis_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      			'<div class="col-sm-3">'+
								      				'<label for="avance_porcen_'+name1+'">% de Avance:&nbsp;</label><label id="avance_porcen_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      				'<label for="semaforo_'+name1+'">Semaforo:&nbsp;</label><label id="semaforo_'+name1+'">&nbsp;</label>'+
								      			'<div class="col-sm-3">'+
								      			'</div>'+
								      		'</div>'+
								      		'<div class="row">'+
								      			'<div class="col-sm-3">'+
								      				'<label for="vr_pagado_'+name1+'">Valor Pagado:&nbsp;</label><label id="vr_pagado_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      			'<div class="col-sm-3">'+
								      				'<label for="und_'+name1+'">Und medida:&nbsp;</label><label id="und_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      			'<div class="col-sm-3">'+
								      				'<label for="valor_'+name1+'">Cantidad:&nbsp;</label><label id="valor_'+name1+'">&nbsp;</label>'+
								      			'</div>'+
								      			'<div class="col-sm-3">'+
								      			'</div>'+
								      		'</div>'+
								      		'<div class="row">'+
								      			'<div class="col-sm-6">'+
								      				'<div id="aniimated-thumbnials_'+name1+'"></div>'+
								      			'</div>'+
								      			'<div class="col-sm-6">'+
								      				'<div id="lista_archivos_'+name1+'"></div>'+
								      			'</div>'+
								      		'</div>'+
								      '</div>';
					 	$("#panel-visitas").append(html);	//console.log(eliminar);
						$.each(value1, function (name, value) {	//console.log(name + '=' + value);
							if(name == "fecha" ) $('#panel_heading_'+name1).html("Avance "+(name1+1)+":      "+value+"      "+eliminar);
							if(name == "nombre_mun" ) $('#codigo_mun_vis_'+name1).html(value);
							if(name == "nom_estado" ) $('#nom_estado_vis_'+name1).html(value);
							if(name == "descripcion" ) $('#descripcion_vis_'+name1).html(value);
							if(name == "vr_pagado" ) $('#vr_pagado_'+name1).html(value);
							if(name == "semaforo" ){
								var color = "green";
								if (value == 'Atrasado') color = "red";
								if (value == 'En riesgo') color = "orange";
								$('#semaforo_'+name1).html('<font color="'+color+'">'+value+'</font>');
							}
							if(name == "avance_porcen" ){	//console.log(value);	//
								$('#avance_porcen_'+name1).html(value);
							} 
							if(name == "valor" ) $('#valor_'+name1).html(value);
							if(name == "und" ) $('#und_'+name1).html(value);
							if(name == "url" ){
								var str = value;
								if(str==null){	
									$("#aniimated-thumbnials_"+name1).hide();
									$("#lista_archivos_"+name1).hide();
								}else{
									var str_array = str.split(',');
									for(var i = 0; i < str_array.length; i++) {
									   str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	//console.log(str);
									   var datafile = str.split('@');	console.log(datafile[1].substring(0, 5));
										if(datafile[1].substring(0, 5)=="image"){
											$("#aniimated-thumbnials_"+name1).append('<a href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'"><img class="galeria" src="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'" /></a>');	
										}else{
											if($("#lista_archivos_"+name1).is(':empty')) $("#lista_archivos_"+name1).append('<br><label class="control-label">Archivos:</label>');
											$("#lista_archivos_"+name1).append('<a target="_blank" href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'"><h4>'+datafile[0].replace(/^.*[\\\/]/, '').substring(8)+'</h4></a>');
										}
									}
									$("#aniimated-thumbnials_"+name1).lightGallery({
									    thumbnail:true
									});
								}
							}
	
				      	});
						
					}); //console.log("Cargaaaaaa");
				});
				Eventos();
			}else
			{
				//$("#panel-visitas").hide();
			}
		    console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
		});
};


AppConfig.Inicial();
AppConfig.CargaMunicipios();
AppConfig.cargaEstados();
AppConfig.SetNombreGestion();
AppConfig.CargarVisitas();

$('#btn_guardar').click(function(){
//	var NumArchivos = $('#input-1').fileinput('getFileStack').length;	console.log(files.length);
//	
 	bootbox.confirm("Seguro que desea Guardar?", function(result) { //console.log("Confirm result: "+result);
	  	if(result){	//CAMPOS OBLIGATORIOS
	  		//var codigo_mun = $("#codigo_mun option:selected").val();
	  		var fecha = $("#fecha").val().trim(); //console.log(fecha_ini);
	  		var avance_porcen = $("#avance_porcen").val().trim();
	  		var sem = $("input[name='semaforo']:checked").val();	console.log(sem);
	  		var vr_pagado = $("#vr_pagado").val().trim();			console.log(vr_pagado);
	  		var descripcion = $("#descripcion").val().trim();				//console.log("Descripción: " + descripcion);
	  		var NumArchivos = $('#input-1').fileinput('getFileStack').length;	//console.log(NumArchivos);
	  		var valor = $("#valor").val().trim();
	  		var und = $("#und").val().trim();
	  		
	  		//var empleos_gen_indirecto = $("#empleos_gen_indirecto").val().trim();
	  		if(fecha == ""){
	  			Func.MsjPeligro("Debe ingresar una fecha");
	  			setTimeout(function() { $('#fecha').nextAll('span').find('.jq-dte-day').focus();}, 500);
	  			return;
	  		}
	  		if(AppConfig["codigo_mun"]===undefined || AppConfig["codigo_mun"].length<1){
	  				$('#contractual-panel-body').show();
		  			Func.MsjPeligro("Debe seleccionar el municipio");
		  			$('#codigo_mun').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#codigo_mun').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
	  		}
	  		if($("#sel_id_estado").is(":visible")){
				if(AppConfig["id_estado"]===undefined || AppConfig["id_estado"].length<1){
		  			Func.MsjPeligro("Debe seleccionar el estado actual del contrato");
		  			$('#sel_id_estado').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#sel_id_estado').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
		  		}
	  		}
			if(avance_porcen==""){
	  			Func.MsjPeligro("Digite un porcentaje de avance");
	  			setTimeout(function() { $('#avance_porcen').focus(); }, 500);
	  			return;	  			
	  		}else{
	  			if(Func.ValidaPorcentaje(avance_porcen)==false){
		  			Func.MsjPeligro("Digite un porcentaje de avance VALIDO");
		  			setTimeout(function() { $('#avance_porcen').focus(); }, 500);
		  			return;	
	  			}
	  		}
	  		if($("#sel_id_estado").is(":visible")){
		  		if(sem == undefined || sem == "" ){
		  			$("input[name='semaforo']").show();
		  			Func.MsjPeligro("Seleccione un Color en el semaforo");
		  			setTimeout(function() { $("input[name='semaforo']").focus(); }, 500);
		  			return;
		  		}
		  	}
	  		if(vr_pagado == ""){
	  			Func.MsjPeligro("Debe digitar el valor pagado a la fecha");
	  			setTimeout(function() { $('#vr_pagado').focus(); }, 500);
	  			return;
	  		}
			if(descripcion==""){
	  			Func.MsjPeligro("Digite una descripción");
	  			setTimeout(function() { $('#descripcion').focus(); }, 500);
	  			return;	  			
	  		}
	  		if(NumArchivos<AppConfig.MinImagen){
	  			Func.MsjPeligro("Debe seleccionar al menos una imágen o archivo");
	  			setTimeout(function() { $('#input-1').focus(); }, 500);
	  			return;
	  		}

	  		console.log("FORMULARIO OK!!!!!!!!!!!!!");
	  		
	  		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); 	//console.log(AppConfig["codigo_mun"]);	console.log(AppConfig["codigo_mun"].join());
	  		if(AppConfig["codigo_mun"]===undefined) AppConfig["codigo_mun"]=""; var codigo_mun = Func.Ecrypted(AppConfig["codigo_mun"]);	//console.log(codigo_mun);
  			if(AppConfig["id_estado"]===undefined) AppConfig["id_estado"]=""; var id_estado = Func.Ecrypted(AppConfig["id_estado"]);		//console.log(AppConfig["id_estado"]);
	  		fecha = Func.Ecrypted(fecha);
	  		avance_porcen = Func.Ecrypted(avance_porcen);
  			sem = Func.Ecrypted(sem);
  			vr_pagado = Func.Ecrypted(numeral().unformat(vr_pagado));
  			und = Func.Ecrypted(und);
	  		valor = Func.Ecrypted(numeral().unformat(valor));
	  		descripcion = Func.Ecrypted(descripcion);	//	console.log(Func.Ecrypted(IdGestion));
	  		
  			AppConfig.socketDataAdmin.emit('SetGestionVisita', {id_gestion:Func.Ecrypted(IdGestion),fecha:fecha,codigo_mun:codigo_mun,id_estado:id_estado,
  															avance_porcen:avance_porcen,sem:sem,vr_pagado:vr_pagado,und:und,valor:valor,descripcion:descripcion
			 }, function(message){				//console.log(message);
			 		if($.isNumeric(message)){
			 			AppConfig["id_visita"] = message;	//console.log(AppConfig["IdVisita"]);
			 			$('#input-1').fileinput('upload');
			 		}else{
			 			Func.MsjPeligro("No se pudo Guardar el registro");
			 		}
			});
	  		
	  		
	  	}
	});
});
    
});