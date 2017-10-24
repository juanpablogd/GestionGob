$(document).ready(function() {
	var IdGestion = Func.GetIdGestion(); //console.log(IdGestion);
	/* VAlida Acceso */	
	if(IdGestion == "" || Func.GetTipo()=="C")	window.location.href = 'index.html';

AppConfig.SetNombreGestion= function() {
	var NomGestion = Func.GetNomGestion();
	$("#nom_gestion").text(NomGestion);
};

AppConfig.EstadoCentroGestor= function() {
	AppConfig['cod_meta'] = "";
	if(AppConfig['id_centrog'].length){
		AppConfig.CargaMetas();	
	}else{
    	$("#MsjAlertaMetas").show();
    	Func.MsjPeligro("Debe seleccionar al menos una secretaría para cargar las metas");
	}
};
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

	/* SELECT - CENTRO GESTOR */
	$('#id_centrog').multiselect({
			enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {	//	console.log("onChange");
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	AppConfig.EstadoCentroGestor();
            },
            onSelectAll: function(checked) {				//	console.log("onSelectAll");
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	AppConfig.EstadoCentroGestor();
	        },
            onDeselectAll: function(checked) {				//	console.log("onDeselectAll");
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	AppConfig.EstadoCentroGestor();
	        }
	});


	$('#fecha').datetextentry('set_date',moment().format('YYYY-MM-DD'));
	
	
	$('#input-1').on('fileloaded', function(event, file, previewId, index, reader) {
		console.log("fileloaded");
		$('.kv-file-upload.btn.btn-xs.btn-default').hide();
	});
	
	$('#input-1').on('filebatchuploadcomplete', function(event, files, extra) {
	    //console.log('File batch upload complete');
	 	bootbox.alert("El avance se ha guardado exitosamente!", function() {
			window.location.href = 'index.html';
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


AppConfig.Inicial();
AppConfig.CargaMunicipios();
AppConfig.SetNombreGestion();

$('#btn_guardar').click(function(){
//	var NumArchivos = $('#input-1').fileinput('getFileStack').length;	console.log(files.length);
//	
 	bootbox.confirm("Seguro que desea Guardar?", function(result) { //console.log("Confirm result: "+result);
	  	if(result){	//CAMPOS OBLIGATORIOS
	  		//var codigo_mun = $("#codigo_mun option:selected").val();
	  		var fecha = $("#fecha").val().trim(); //console.log(fecha_ini);
	  		var avance_porcen = $("#avance_porcen").val().trim();
	  		var descripcion = $("#descripcion").val().trim();				//console.log("Descripción: " + descripcion);
	  		var NumArchivos = $('#input-1').fileinput('getFileStack').length;	//console.log(NumArchivos);
	  		var valor = $("#valor").val().trim();
	  		var und = $("#und").val().trim();
	  		
	  		//var empleos_gen_indirecto = $("#empleos_gen_indirecto").val().trim();

	  		if(AppConfig["codigo_mun"]===undefined || AppConfig["codigo_mun"].length<1){
	  				$('#contractual-panel-body').show();
		  			Func.MsjPeligro("Debe seleccionar el municipio");
		  			$('#codigo_mun').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#codigo_mun').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
	  		}
	  		if(fecha == ""){
	  			Func.MsjPeligro("Debe ingresar una fecha");
	  			setTimeout(function() { $('#fecha').nextAll('span').find('.jq-dte-day').focus();}, 500);
	  			return;
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
			if(descripcion==""){
	  			Func.MsjPeligro("Digite una descripción");
	  			setTimeout(function() { $('#descripcion').focus(); }, 500);
	  			return;	  			
	  		}
	  		if(NumArchivos==0){
	  			Func.MsjPeligro("Debe seleccionar al menos una imágen");
	  			setTimeout(function() { $('#input-1').focus(); }, 500);
	  			return;
	  		}
/*			if(empleos_gen_indirecto==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Ingrese el númeo de empleos generados Indirectamente");
	  			setTimeout(function() { $('#empleos_gen_indirecto').focus(); }, 500);
	  			return;
  			}	*/
	  		console.log("FORMULARIO OK!!!!!!!!!!!!!");

	  		
	  		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); 	//console.log(AppConfig["codigo_mun"]);	console.log(AppConfig["codigo_mun"].join());
	  		var codigo_mun = Func.Ecrypted(AppConfig["codigo_mun"]);					//console.log(codigo_mun);
	  		fecha = Func.Ecrypted(fecha);
	  		valor = Func.Ecrypted(numeral().unformat(valor));
	  		und = Func.Ecrypted(und);
	  		avance_porcen = Func.Ecrypted(avance_porcen);
	  		descripcion = Func.Ecrypted(descripcion);	//	console.log(Func.Ecrypted(IdGestion));
	  		
  			AppConfig.socketDataAdmin.emit('SetGestionVisita', {id_gestion:Func.Ecrypted(IdGestion),codigo_mun:codigo_mun,fecha:fecha,valor:valor,und:und,
  															avance_porcen:avance_porcen,descripcion:descripcion
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