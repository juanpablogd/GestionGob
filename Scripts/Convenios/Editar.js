$(document).ready(function() {
	/* Valida Acceso */	
	if(Func.GetTipo()=="C")	window.location.href = 'index.html';

	var idConvenio = Func.getIdconvenio();		//console.log(idConvenio);
	if(idConvenio == "")	window.location.href = 'index.html';
	var nomConvenio = Func.getNomconvenio();	//console.log(nomConvenio);
	$("#nomConvenio").html(nomConvenio);

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

	$("#vr_adicion").bind('input',function() {
		AppConfig.sumaTotales();
	});
	
	/* SELECT - CENTRO GESTOR */
	$('#idFte').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {	//	console.log("onChange");
            	AppConfig['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	//AppConfig.EstadoCentroGestor();
            },
            onSelectAll: function(checked) {				//	console.log("onSelectAll");
            	AppConfig['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	//AppConfig.EstadoCentroGestor();
	        },
            onDeselectAll: function(checked) {				//	console.log("onDeselectAll");
            	AppConfig['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	//AppConfig.EstadoCentroGestor();
	        }
	});
	/* SELECT - SUBPROGRAMA / META*/
	$('#cod_meta').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['cod_meta'] = $('#cod_meta option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['cod_meta']);
            },
            onSelectAll: function(checked) {
            	AppConfig['cod_meta'] = $('#cod_meta option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['cod_meta']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['cod_meta'] = $('#cod_meta option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['cod_meta']);
	        }
	});
	/* SELECT - SUBPROGRAMA / META*/
	$('#sel_id_con_derivado').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_con_marco'] = $('#sel_id_con_derivado option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['cod_meta']);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_con_marco'] = $('#sel_id_con_derivado option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['cod_meta']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_con_marco'] = $('#sel_id_con_derivado option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['cod_meta']);
	        }
	});

	AppConfig.setTipocon = function(val){
		if(val=="2"){
			$("#div_cmarco").show();
			$("#div_secop").hide();
			//$("#div_archivos").show();
		}else {
			$("#div_cmarco").hide();
			$("#div_secop").show();
			//$("#div_archivos").hide();
		}
	}

	$("input[name='tipoConvenio']").change(function(){
		var tipoConvenio = $(this).val();
		AppConfig.setTipocon(tipoConvenio);
	});

	$( "#id_categoria" ).change(function() {
		var id_cat = $( this ).val();
		//var csecop = $( "label[for='enlace_secop']" ); Secop NO Obligatorio
		var cmetas = $( "label[for='cod_meta']" );
		//csecop.removeClass("control-label required");		Secop NO Obligatorio
		cmetas.removeClass("control-label required");
		if(id_cat == 1 || id_cat == 2) {
			//csecop.addClass("control-label required");	Secop NO Obligatorio
			cmetas.addClass("control-label required");
		}
	});
	
	$('#input-1').on('fileloaded', function(event, file, previewId, index, reader) {
		console.log("fileloaded");
		$('.kv-file-upload.btn.btn-xs.btn-default').hide();
	});
	
	$('#input-1').on('filebatchuploadcomplete', function(event, files, extra) {	    //console.log('File batch upload complete');
	 	bootbox.alert("EL convenio se ha guardado exitosamente!!!", function() {
			window.location.href = 'index.html';
		});
	});

  	//SELECCIONA
  	var initialPreview = [];		//console.log(AppConfig["url"]);
  	if(AppConfig["url"] != null ){	
  		var str_array = AppConfig["url"].split(', ');	//console.log(str_array);
  		var initialPreviewConfig = [];
		for(var i = 0; i < str_array.length; i++) {
			initialPreviewConfig[i]= {};
		   	str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	//console.log(str);
		   	var datafile = str.split('@');
		   	initialPreview.push('http://saga.cundinamarca.gov.co/SIG/'+datafile[0]);
		   	
		   	initialPreviewConfig[i].url = "http://saga.cundinamarca.gov.co/SIG/servicios/GestionGob/sa_imagen_eliminar.php?id_convenio="+idConvenio;
		   	initialPreviewConfig[i].key = datafile[0];
		}	console.log(initialPreviewConfig);
  	}

	$("#input-1").fileinput({
	    uploadUrl: "http://saga.cundinamarca.gov.co/SIG/servicios/GestionGob/sa_imagen.php", // server upload action
	    language: "es",
	    minFileCount: 1,
	    maxFileCount: AppConfig.MaxImagen,
	    minImageWidth: AppConfig.minImageWidth,
    	minImageHeight: AppConfig.minImageHeight,
    	showUpload: false,
    	maxFileSize: AppConfig.tamanoArchivo,
    	initialPreview: initialPreview,
    	initialPreviewAsData: true,
    	initialPreviewConfig: initialPreviewConfig,
    	initialPreviewFileType: 'image',
    	overwriteInitial: false,
    	deleteUrl: "http://saga.cundinamarca.gov.co/SIG/servicios/GestionGob/sa_imagen_eliminar.php",
	    uploadExtraData: function (previewId, index) {	console.log(idConvenio);
			    var data = {
				        id_convenio: idConvenio
				   };
				console.log(data);
			    return data;
		}
	});

	//INICIALIZA TOOLTIP
	$('[data-toggle="tooltip"]').tooltip();
	//INICIALIZA FECHA
	$('#fec_suscripcion').datetextentry('set_date',AppConfig['fec_suscripcion']);
	$('#fec_inicio').datetextentry({
	   	min_date         : function() { return $("#fec_suscripcion").val(); },
	    min_date_message : 'Por favor seleccione una fecha mayor a la fecha de Suscripción',
	    on_change : function(date_str) {		//console.log(date_str);
	    	var dias = $("#plazo_dias").val();	//console.log(dias);
	    	if (dias != "" && date_str != ""){
	    		$("#fec_proy_finalizacion").html(AppConfig.calculaFecha(date_str,dias));
	    	}
	    }
	});
	$('#fec_inicio').datetextentry('set_date',AppConfig['fec_inicio']);

	$('#fec_terminacion').datetextentry({
	    min_date         : function() { return $("#fec_proy_finalizacion").html(); },
	    min_date_message : 'Por favor seleccione una fecha mayor a la fecha de finalización',
	});
	$('#fec_terminacion').datetextentry('set_date',AppConfig['fec_terminacion']);

	$("#plazo_dias").on('input',function(e){						//console.log("cambio");
        var pd = numeral().unformat($("#plazo_dias").val().trim());	//console.log(pd);
        if(pd>0 && pd != "") { //console.log(pd);
        	var fecha = moment($('#fec_inicio').val(), 'YYYY-MM-DD');
        	if(fecha.isValid()){
        		$("#fec_proy_finalizacion").html(AppConfig.calculaFecha($('#fec_inicio').val(),pd));
        	}
        }
    });
	//SET TIPO DE CONVENIO
	$("input[name=tipoConvenio][value=" + AppConfig['tipoconvenio'] + "]").attr('checked', 'checked');
	AppConfig.setTipocon(AppConfig['tipoconvenio']);

};

$('#modificacion_con').click(function() {
    if($(this).is(':checked')) {	//        console.log("SI");
        $("#div_fec_terminacion").show();
        $("#div_vr_adicion").show();
        $("#div_vrtotal").show();
    } else {	//console.log("NO");
        $("#div_fec_terminacion").hide();
        $("#div_vr_adicion").hide();
        $("#div_vrtotal").hide();
        $("#vr_adicion").val(0);
    }
    AppConfig.sumaTotales();
});

AppConfig.calculaFecha= function(fini,dias) {	//console.log(fini + " " + dias);
	var new_date = moment(fini, "YYYY-MM-DD").add(dias,'days').format("YYYY-MM-DD");
	return new_date;
};

AppConfig.CargaFuentes= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('GetListFuentes', null, function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Fuentes");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoFuentes"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#idFte').multiselect('dataprovider', AppConfig["ListadoFuentes"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	  	//CARGA FUENTES
	  	AppConfig["fuentes"] = {};
		var arrIdfuentes = AppConfig["id_fuente"].split(",");
		var arrValfuentes = AppConfig["vr_fuente"].split(",");
		$.each( arrIdfuentes, function( key, value ) {	//console.log( key + ": " + value );
			AppConfig["fuentes"][value] = arrValfuentes[key];
		});	console.log(JSON.stringify(AppConfig["fuentes"]));
		AppConfig.cargatablaFuente();
		//
	});
};

AppConfig.CargaMetas= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
	//var id_centros = Func.Ecrypted(AppConfig["id_centrog"].join());	//console.log(AppConfig["id_centrog"]);
	//AppConfig.socketDataAdmin.emit('GetListMeta', {id_centrog : id_centros }, function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
  	AppConfig.socketDataAdmin.emit('GetListMeta', '', function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Metas");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoMeta"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		if(AppConfig["ListadoMeta"].length == 0 ){
			Func.MsjPeligro("No se encontraron metas para esta secretaría");
			$("#MsjAlertaMetas").show();
		}else $("#MsjAlertaMetas").hide();
		$('#cod_meta').multiselect('dataprovider', AppConfig["ListadoMeta"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	  	if(AppConfig["meta"] != null && AppConfig["meta"] !== undefined){
		  	//SELECCIONA
		  	var str_array = AppConfig["meta"].split(', ');	//console.log(str_array);
		  	$('#cod_meta').multiselect('select', str_array);
		  	AppConfig['cod_meta'] = str_array;
		}
	});
};

AppConfig.cargaComarco= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
	//var id_centros = Func.Ecrypted(AppConfig["id_centrog"].join());	//console.log(AppConfig["id_centrog"]);
	//AppConfig.socketDataAdmin.emit('GetListMeta', {id_centrog : id_centros }, function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
  	AppConfig.socketDataAdmin.emit('getlistConmarco', '', function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Convenio Marco");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["listadoMarco"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		$('#sel_id_con_derivado').multiselect('dataprovider', AppConfig["listadoMarco"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	  	if(AppConfig["id_con_marco"] != null && AppConfig["id_con_marco"] !== undefined){	//console.log(AppConfig["id_con_marco"]);
		  	//SELECCIONA
		  	var str_array = AppConfig["id_con_marco"];	//console.log(str_array);
		  	$('#sel_id_con_derivado').multiselect('select', str_array);
		  	AppConfig['sel_id_con_derivado'] = str_array;
		}
	});
};

AppConfig.getNombrefuente= function(value) {	//console.log(AppConfig["ListadoFuentes"].length);
	var nomF = undefined;	//console.log(AppConfig["ListadoFuentes"]);
	if (AppConfig["ListadoFuentes"]===undefined) return nomF;
	for (var i = 0; i < AppConfig["ListadoFuentes"].length; i++){
	  // look for the entry with a matching `code` value
	  if (AppConfig["ListadoFuentes"][i].value == value){
	    // we found it
	    nomF = AppConfig["ListadoFuentes"][i].label;
	    break;
	  }
	}
	return nomF;
}

AppConfig.sumaTotales= function() {
	AppConfig["sumafuentes"] = 0;
	Object.keys(AppConfig["fuentes"]).forEach(function(key, index) {	//console.log(index + ": "+ key +" - "+ AppConfig["fuentes"][key]);
		AppConfig["sumafuentes"] += numeral().unformat(AppConfig["fuentes"][key]);
	});		
	$("#totalFte").html(numeral(AppConfig["sumafuentes"]).format('0,0'));
	var vr_adicion = numeral().unformat($("#vr_adicion").val());	//console.log(AppConfig["fuentes"]);			
	$("#vrtotal").html(numeral(AppConfig["sumafuentes"]+vr_adicion).format('0,0'));
}

AppConfig.cargatablaFuente= function() {	//console.log(AppConfig["ListadoFuentes"]);
	$("#tblFuentes tbody").html('');
	Object.keys(AppConfig["fuentes"]).forEach(function(key, index) {	//console.log(index + ": "+ key +" - "+ AppConfig["fuentes"][key]);
		var nombref = AppConfig.getNombrefuente(key);
		if(nombref===undefined) return false;	
	    $("#tblFuentes tbody").append('<tr>'+
	    								'<td>'+nombref+'</td>'+
						        		'<td>'+AppConfig["fuentes"][key]+'</td>'+
								        '<td>'+
								        	'<a href="#" class="btn btn-danger btn-sm" id="btn_del" onclick="AppConfig.eliminaFuente('+key+')">'+
							  					'<span class="glyphicon glyphicon-minus"></span>'+
											'</a>'+
										'</td>'+
								      '</tr>');
	});
	AppConfig.sumaTotales();
	setTimeout(function() { $('#idFte').focus();}, 100);
};

AppConfig.eliminaFuente= function(id) {	//console.log(AppConfig["fuentes"]);
	Object.keys(AppConfig["fuentes"]).forEach(function(key, index) {
	    console.log(index + ": "+ key +" - "+ AppConfig["fuentes"][key]);
	    if(key == id) {
	    	delete AppConfig["fuentes"][key];
	    }
	});
	console.log(JSON.stringify(AppConfig["fuentes"]));
	AppConfig.cargatablaFuente();
};

AppConfig.CargarConvenio= function() {
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('getuniConvenio',  {id_convenio : idConvenio}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);

			var decrypted = FuncDecrypted(message);											console.log(decrypted);
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {		//console.log(value1);	//console.log(name1 + '=' + value1); 
					$.each(value1, function (name, value) {	//console.log(name + '=' + value);
						AppConfig[name] = value;
						$('#'+name).val(value);
			      	});
				}); //console.log("Cargaaaaaa");
			});

			AppConfig.Inicial();
			AppConfig.CargaFuentes();
			AppConfig.CargaMetas();
			AppConfig.cargaComarco();

		});
};

AppConfig.CargarConvenio();

$("#btn_add").click(function(){
	var idFuente,vrFuente;	//console.log($('#idFte').val()  + " -*- " + $('#vrFte').val());
	idFuente=$('#idFte').val();
	vrFuente=$('#vrFte').val();
	if (idFuente == ""){	//if (idFuente == "" || idFuente == null){
		Func.MsjPeligro("Debe seleccionar una Fuente");
		setTimeout(function() { $('#idFte').nextAll('div').find('.multiselect-search').focus();}, 300);
		return;
	} else if (vrFuente == "" || vrFuente == null){
		Func.MsjPeligro("Escriba el Valor de la Fuente por favor!");
		setTimeout(function() { $('#vrFte').focus();}, 300);
	} else{
		AppConfig["fuentes"][idFuente] = $('#vrFte').val();
		console.log(JSON.stringify(AppConfig["fuentes"]));
		AppConfig.cargatablaFuente();
		$('#vrFte').val('');
	}
});

$('#btn_guardar').click(function(){
	bootbox.confirm("Seguro que desea Guardar?", function(result) {
	  	if(result){	//CAMPOS OBLIGATORIOS
	  		console.log("Confirm result: "+result);
	  		// ------ ESTANDARIZACIÓN DE VALORES ------
			var tipoConvenio = $("input[name='tipoConvenio']:checked").val();	console.log(tipoConvenio);
			console.log(AppConfig["id_con_marco"]);
			console.log(AppConfig["cod_meta"]);
			var nro_con = $("#nro_con").val().trim();			console.log(nro_con);
			var enlace_secop = $("#enlace_secop").val().trim();	console.log(enlace_secop);
			var objeto = $("#objeto").val().trim();				console.log(objeto);
			var nom_tercero = $("#nom_tercero").val().trim();	console.log(nom_tercero);
			var id_tercero = $("#id_tercero").val().trim();		console.log(id_tercero);
			var nom_supervisor = $("#nom_supervisor").val().trim();		console.log(nom_supervisor);
			var nom_interventor = $("#nom_interventor").val().trim();	console.log(nom_interventor);
			var vr_interventoria = numeral().unformat($("#vr_interventoria").val().trim());	console.log(vr_interventoria);
			var fec_suscripcion = $("#fec_suscripcion").val().trim();	console.log(fec_suscripcion);
			var fec_inicio = $("#fec_inicio").val().trim();	console.log(fec_inicio);
			var plazo_dias = $("#plazo_dias").val().trim();	console.log(plazo_dias);
			var fec_proy_finalizacion = $("#fec_proy_finalizacion").val().trim();	console.log(fec_proy_finalizacion);
			var totalFte = numeral().unformat($("#totalFte").html().trim());	console.log(totalFte);
			console.log(AppConfig["fuentes"]);
			var modificacion_con = $('#modificacion_con').is(':checked');	console.log(modificacion_con);
			var fec_terminacion = $("#fec_terminacion").val();					console.log(fec_terminacion);
			var vr_adicion = numeral().unformat($("#vr_adicion").val());						console.log(vr_adicion);
			var vrtotal = numeral().unformat($("#vrtotal").html());								console.log(vrtotal);
			var observacion = $("#observacion").val().trim();								console.log(observacion);
			var numArchivos = $('#input-1').fileinput('getFileStack').length;		console.log($('#input-1').fileinput('getFileStack'));

			// ------ VALIDACIÓN ------
			if(tipoConvenio == 2){
				if(AppConfig["id_con_marco"]===undefined || AppConfig["id_con_marco"].length<1){
		  			Func.MsjPeligro("Debe seleccionar al menos un convenio Marco");
		  			$('#sel_id_con_derivado').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#sel_id_con_derivado').nextAll('div').find('.multiselect-search').focus();}, 400);
		  			return;
				}
			}
			if(AppConfig["cod_meta"]===undefined || AppConfig["cod_meta"].length<1){
				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Debe seleccionar al menos una meta");
	  			$('#cod_meta').nextAll('div').addClass("open");
	  			setTimeout(function() { $('#cod_meta').nextAll('div').find('.multiselect-search').focus();}, 400);
	  			return;
	  		}else if(nro_con==""){
	  			Func.MsjPeligro("Digite el N° de convenio o contrato");
	  			setTimeout(function() { $('#nro_con').focus(); }, 400);
	  			return;	  			
	  		}else if(objeto==""){
	  			Func.MsjPeligro("Digite el Objeto convenio o contrato");
	  			setTimeout(function() { $('#objeto').focus(); }, 400);
	  			return;	  			
	  		}else if(nom_tercero==""){
	  			Func.MsjPeligro("Digite el Nombre del Tercero o Ejecutor del convenio o contrato");
	  			setTimeout(function() { $('#nom_tercero').focus(); }, 400);
	  			return;	  			
	  		}else if(nom_supervisor==""){
	  			Func.MsjPeligro("Digite el Nombre del Supervisor del convenio o contrato");
	  			setTimeout(function() { $('#nom_supervisor').focus(); }, 400);
	  			return;	  			
	  		}else if(fec_suscripcion==""){
	  			Func.MsjPeligro("Digite la fecha del convenio o contrato");
	  			setTimeout(function() { $('#fec_suscripcion').nextAll('span').find('.jq-dte-day').focus(); }, 400);
	  			return;
	  		}else if(totalFte=="0" || totalFte==""){
	  			Func.MsjPeligro("Debe ingresar al menos una fuente de Recurso");
		  			$('#idFte').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#idFte').nextAll('div').find('.multiselect-search').focus();}, 400);
	  			//setTimeout(function() { $('#vrFte').focus(); }, 400);
	  			return;
	  		}else if (modificacion_con){
	  			if(fec_terminacion==""){
		  			Func.MsjPeligro("Digite la fecha de Terminación del convenio o contrato");
		  			setTimeout(function() { $('#fec_terminacion').nextAll('span').find('.jq-dte-day').focus(); }, 400);
		  			return;
		  		}else if(vr_adicion==""){
		  			Func.MsjPeligro("Digite la valor adicionado del convenio o contrato");
		  			setTimeout(function() { $('#vr_adicion').focus(); }, 400);
		  			return;
		  		}
	  		}else if(observacion==""){
	  			Func.MsjPeligro("Debe ingresar una Observación");
	  			setTimeout(function() { $('#observacion').focus(); }, 400);
	  			return;
	  		}
	  		//if(tipoConvenio == 2){
		  		if(numArchivos==0){
		  			Func.MsjPeligro("Debe seleccionar al menos un Archivo Valido");
		  			setTimeout(function() { $('#input-1').focus(); }, 500);
		  			return;
		  		}
		  	//}
	  		console.log("FORMULARIO OK!!!!!!!!!!!!!");
	  		$("#input-1").focus();

	  		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); 	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});//console.log(AppConfig["codigo_mun"]);	console.log(AppConfig["codigo_mun"].join());

			tipoConvenio = Func.Ecrypted(tipoConvenio);
			if(AppConfig["id_con_marco"]===undefined) AppConfig["id_con_marco"]=""; var id_con_marco = Func.Ecrypted(AppConfig["id_con_marco"]);
			if(AppConfig["cod_meta"]===undefined) AppConfig["cod_meta"]=""; var cod_meta = Func.Ecrypted(AppConfig["cod_meta"]);
			nro_con = Func.Ecrypted(nro_con);
			enlace_secop = Func.Ecrypted(enlace_secop);
			objeto = Func.Ecrypted(objeto);
			nom_tercero = Func.Ecrypted(nom_tercero);
			id_tercero = Func.Ecrypted(id_tercero);
			nom_supervisor = Func.Ecrypted(nom_supervisor);
			nom_interventor = Func.Ecrypted(nom_interventor);
			vr_interventoria = Func.Ecrypted(vr_interventoria);
			fec_suscripcion = Func.Ecrypted(fec_suscripcion);
			fec_inicio = Func.Ecrypted(fec_inicio);
			plazo_dias = Func.Ecrypted(plazo_dias);
			fec_proy_finalizacion = Func.Ecrypted(fec_proy_finalizacion);
			totalFte = Func.Ecrypted(totalFte);
			if(AppConfig["fuentes"]===undefined) AppConfig["fuentes"]=""; var id_fuente = Func.Ecrypted(AppConfig["fuentes"]);
			modificacion_con = Func.Ecrypted(modificacion_con);
			fec_terminacion = Func.Ecrypted(fec_terminacion);
			vr_adicion = Func.Ecrypted(vr_adicion);
			vrtotal = Func.Ecrypted(vrtotal);
			observacion = Func.Ecrypted(observacion);
	  		var id_convenio = Func.Ecrypted(idConvenio);

  			AppConfig.socketDataAdmin.emit('UpdateConvenio', {id_convenio:id_convenio,tipoConvenio:tipoConvenio,id_con_marco:id_con_marco,cod_meta:cod_meta,nro_con:nro_con,//noticia:noticia,
  															enlace_secop:enlace_secop,
  															objeto:objeto,nom_tercero:nom_tercero,id_tercero:id_tercero,nom_supervisor:nom_supervisor,
  															nom_interventor:nom_interventor,vr_interventoria:vr_interventoria,
  															fec_suscripcion:fec_suscripcion,fec_inicio:fec_inicio,plazo_dias:plazo_dias,fec_proy_finalizacion:fec_proy_finalizacion,
  															totalFte:totalFte,id_fuente:id_fuente,modificacion_con:modificacion_con,fec_terminacion:fec_terminacion,//fecha_ini:fecha_ini,fecha_fin:fecha_fin,
  															vr_adicion:vr_adicion,vrtotal:vrtotal,observacion:observacion
			 }, function(message){	console.log(message);
			 		if($.isNumeric(message)){
			 			if(numArchivos>0){	console.log("Adjuntos: "+numArchivos);
							AppConfig["id_convenio"] = message;		console.log(AppConfig["id_convenio"]);
				 			$('#input-1').fileinput('upload');
			 			}else{
				 			bootbox.alert("El convenio se ha registrado Exitosamente!!!", function() {
				 				window.location.href = 'index.html';
				 			});			 				
			 			}
			 		}else{
			 			Func.MsjPeligro("No se pudo almacenar el Convenio");
			 		} 
			});	
	  		
	  		
	  	}
	});
});
    
});