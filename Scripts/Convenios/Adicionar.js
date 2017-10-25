$(document).ready(function() {
	/* Valida Acceso */	
	if(Func.GetTipo()=="C")	window.location.href = 'index.html';

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
	
	$('#input-1').on('filebatchuploadcomplete', function(event, files, extra) {
	    //console.log('File batch upload complete');
	 	bootbox.alert("La Gestión se ha guardado exitosamente!!!", function() {
			window.location.href = 'index.html';
		});
	});

	$("#input-1").fileinput({
	    uploadUrl: "http://saga.cundinamarca.gov.co/SIG/servicios/GestionGob/sa_imagen.php", // server upload action
	    language: "es",
	    minFileCount: 1,
	    maxFileCount: AppConfig.MaxImagen,
	    minImageWidth: AppConfig.minImageWidth,
    	minImageHeight: AppConfig.minImageHeight,
    	showUpload: false,
    	maxFileSize: AppConfig.tamanoArchivo,
	    uploadExtraData: function (previewId, index) {
			    var data = {
				        id_gestion: AppConfig["id_gestion"]
				   };
				console.log(data);
			    return data;
		}
	});
	//INICIALIZA TOOLTIP
	$('[data-toggle="tooltip"]').tooltip();
	//INICIALIZA FECHA
	$('#fec_suscripcion').datetextentry();
	$('#fec_inicio').datetextentry({
	    on_change : function(date_str) {		//console.log(date_str);
	    	var dias = $("#plazo_dias").val();	//console.log(dias);
	    	if (dias != "" && date_str != ""){
	    		$("#fec_proy_finalizacion").html(AppConfig.calculaFecha(date_str,dias));
	    	}
	    }
	});
	$("#plazo_dias").on('input',function(e){						//console.log("cambio");
        var pd = numeral().unformat($("#plazo_dias").val().trim());	//console.log(pd);
        if(pd>0 && pd != "") { //console.log(pd);
        	var fecha = moment($('#fec_inicio').val(), 'YYYY-MM-DD');
        	if(fecha.isValid()){
        		$("#fec_proy_finalizacion").html(AppConfig.calculaFecha($('#fec_inicio').val(),pd));
        	}
        }
    });
	AppConfig["fuentes"] = {};
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
    }
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
	});
};
AppConfig.getNombrefuente= function(value) {	//console.log(AppConfig["ListadoFuentes"].length);
	var nomF = undefined;
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

AppConfig.cargatablaFuente= function() {	//console.log(AppConfig["ListadoFuentes"]);
	$("#tblFuentes tbody").html('');
	AppConfig["sumafuentes"] = 0;
	Object.keys(AppConfig["fuentes"]).forEach(function(key, index) {	console.log(index + ": "+ key +" - "+ AppConfig["fuentes"][key]);
		var nombref = AppConfig.getNombrefuente(key);
	    $("#tblFuentes tbody").append('<tr>'+
	    								'<td>'+nombref+'</td>'+
						        		'<td>'+AppConfig["fuentes"][key]+'</td>'+
								        '<td>'+
								        	'<a href="#" class="btn btn-danger btn-sm" id="btn_del" onclick="AppConfig.eliminaFuente('+key+')">'+
							  					'<span class="glyphicon glyphicon-minus"></span>'+
											'</a>'+
										'</td>'+
								      '</tr>');
	    AppConfig["sumafuentes"] += numeral().unformat(AppConfig["fuentes"][key]);
	});
	$("#totalFte").html(numeral(AppConfig["sumafuentes"]).format('0,0'));
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

AppConfig.Inicial();
AppConfig.CargaFuentes();
AppConfig.CargaMetas();

$("#btn_add").click(function(){
	var idFuente,vrFuente;
	console.log($('#idFte').val()  + " -*- " + $('#vrFte').val());
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
	  	console.log("Confirm result: "+result);
	  	if(result){	//CAMPOS OBLIGATORIOS
	  		var fecha = $("#fecha").val().trim(); //console.log(fecha_ini);
	  		//var noticia = $("#noticia").val().trim();	if(noticia.length > 255) noticia = noticia.substring(0,255);
	  		var descripcion = $("#descripcion").val().trim();				//console.log("Descripción: " + descripcion);
	  		var avance_porcentaje = $("#avance_porcentaje").val().trim();
	  		var id_categoria = $("#id_categoria option:selected").val();
	  		var responsable_nom = $("#responsable_nom").val().trim();
	  		var responsable_tel = $("#responsable_tel").val().trim();
	  		//var nro_cto = $("#nro_cto").val().trim();	
	  		var fte_nacional = $("#fte_nacional").val().trim();
	  		var fte_depto = $("#fte_depto").val().trim();
	  		var fte_mpio = $("#fte_mpio").val().trim();
	  		var fte_sgp = $("#fte_sgp").val().trim();
	  		var fte_regalias = $("#fte_regalias").val().trim();
	  		var fte_otros = $("#fte_otros").val().trim();	//console.log(fte_otros);
	  		var descripcion_fte_otros = $("#descripcion_fte_otros").val().trim();
	  		//var fecha_ini = $("#fecha_ini").val().trim(); //console.log(fecha_ini);//var fecha_fin = $("#fecha_fin").val().trim(); //console.log(fecha_fin);
	  		var enlace_secop = $("#enlace_secop").val().trim();		//console.log(enlace_secop);
	  		//var empleos_gen_directo = $("#empleos_gen_directo").val().trim();
	  		var pbeneficiadas = $("#pbeneficiadas").val().trim();
	  		var areaint = $("#areaint").val().trim();
	  		//var empleos_gen_indirecto = $("#empleos_gen_indirecto").val().trim();
	  		var resultado = $("#resultado").val().trim();		//console.log(resultado);
	  		var NumArchivos = $('#input-1').fileinput('getFileStack').length;	
	  		
	  		if(fecha == ""){
	  			Func.MsjPeligro("Debe ingresar una fecha");
	  			setTimeout(function() { $('#fecha').nextAll('span').find('.jq-dte-day').focus();}, 500);
	  			return;
/*	  		}else if(noticia==""){
	  			Func.MsjPeligro("Digite el nombre de la Noticia");
	  			setTimeout(function() { $('#noticia').focus(); }, 500);
	  			return;		*/
	  		}else if(descripcion==""){
	  			Func.MsjPeligro("Digite una descripción");
	  			setTimeout(function() { $('#descripcion').focus(); }, 500);
	  			return;	  			
	  		}else if(AppConfig["codigo_mun"]===undefined || AppConfig["codigo_mun"].length<1){
	  			Func.MsjPeligro("Debe seleccionar al menos un Municipio");
	  			$('#codigo_mun').nextAll('div').addClass("open");
	  			setTimeout(function() { $('#codigo_mun').nextAll('div').find('.multiselect-search').focus();}, 500);
	  			return;
	  		}
	  		if(avance_porcentaje==""){
	  			Func.MsjPeligro("Digite un porcentaje de avance");
	  			setTimeout(function() { $('#avance_porcentaje').focus(); }, 500);
	  			return;	  			
	  		}else{
	  			if(Func.ValidaPorcentaje(avance_porcentaje)==false){
		  			Func.MsjPeligro("Digite un porcentaje de avance VALIDO");
		  			setTimeout(function() { $('#avance_porcentaje').focus(); }, 500);
		  			return;	
	  			}
	  		}
	  		if(id_categoria == ""){
	  			Func.MsjPeligro("Debe seleccionar una Categoría");
	  			setTimeout(function() { $('#id_categoria').focus(); }, 500);
	  			return;
	  		}
	  		if(AppConfig["id_sector"]===undefined || AppConfig["id_sector"].length<1){
	  			Func.MsjPeligro("Debe seleccionar al menos un Sector");
	  			$('#id_sector').nextAll('div').addClass("open");
	  			setTimeout(function() { $('#id_sector').nextAll('div').find('.multiselect-search').focus();}, 500);
	  			return;
	  		}else if(AppConfig["id_centrog"]===undefined || AppConfig["id_centrog"].length<1){
	  			$('#responsable-panel-body').show();
	  			Func.MsjPeligro("Debe seleccionar al menos una Secretaría");
	  			$('#id_centrog').nextAll('div').addClass("open");
	  			setTimeout(function() { $('#id_centrog').nextAll('div').find('.multiselect-search').focus();}, 500);
	  			return;
	  		}else if(responsable_nom==""){
	  			$('#responsable-panel-body').show();
	  			Func.MsjPeligro("Digite el nombre del responsable");
	  			setTimeout(function() { $('#responsable_nom').focus(); }, 500);
	  			return;
	  		}else if(responsable_tel==""){
	  			$('#responsable-panel-body').show();
	  			Func.MsjPeligro("Digite el teléfono des responsable");
	  			setTimeout(function() { $('#responsable_tel').focus(); }, 500);
	  			return;
	  		}else if(id_categoria==1||id_categoria==2){ //SI ES PROYECTO
				if(AppConfig["cod_meta"]===undefined || AppConfig["cod_meta"].length<1){
					$('#seguimiento-panel-body').show();
		  			Func.MsjPeligro("Debe seleccionar al menos una meta");
		  			$('#cod_meta').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#cod_meta').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
		  		}// FIN INFO CONTRACTUAL
	  		}
			if(enlace_secop!=""){						//console.log("enlace_secop NO VACIO");
					if(Func.ValidaURL(enlace_secop)==false){ //console.log("enlace_secop con INFO NO VALIDO");
		  				$('#contractual-panel-body').show();
			  			Func.MsjPeligro("Ingrese una URL valida");
			  			setTimeout(function() { $('#enlace_secop').focus(); }, 500);
			  			return;
					}	
			}
	  		if(pbeneficiadas==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Ingrese el número de personas beneficiadas");
	  			setTimeout(function() { $('#pbeneficiadas').focus(); }, 500);
	  			return;
/*  			}else if(empleos_gen_indirecto==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Ingrese el númeo de empleos generados Indirectamente");
	  			setTimeout(function() { $('#empleos_gen_indirecto').focus(); }, 500);
	  			return;		*/
  			}else if(resultado==""){
		  				$('#seguimiento-panel-body').show();
			  			Func.MsjPeligro("Describa el resultado de la gestión");
			  			setTimeout(function() { $('#resultado').focus();}, 500);
			  			return;
	  		}
	  		if(NumArchivos==0){
	  			Func.MsjPeligro("Debe seleccionar al menos una imágen");
	  			setTimeout(function() { $('#input-1').focus(); }, 500);
	  			return;
	  		}
	  		console.log("FORMULARIO OK!!!!!!!!!!!!!");
	  		$("#input-1").focus();
	  		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); 	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});//console.log(AppConfig["codigo_mun"]);	console.log(AppConfig["codigo_mun"].join());
	  		fecha = Func.Ecrypted(fecha);
	  		var codigo_mun = Func.Ecrypted(AppConfig["codigo_mun"]);					//console.log(codigo_mun);
	  		id_categoria = Func.Ecrypted(id_categoria);
	  		//noticia = Func.Ecrypted(noticia);
	  		descripcion = Func.Ecrypted(descripcion);
	  		avance_porcentaje = Func.Ecrypted(avance_porcentaje);
	  		var id_sector = Func.Ecrypted(AppConfig["id_sector"]);
	  		var id_centrog = Func.Ecrypted(AppConfig["id_centrog"]);
	  		responsable_nom = Func.Ecrypted(responsable_nom);
	  		responsable_tel = Func.Ecrypted(responsable_tel);
	  		responsable_email = Func.Ecrypted($("#responsable_email").val().trim()); //OPCIONAL
	  		//responsable_nom_ext = Func.Ecrypted($("#responsable_nom_ext").val().trim()); //OPCIONAL
	  		//responsable_tel_ext = Func.Ecrypted($("#responsable_tel_ext").val().trim()); //OPCIONAL
	  		//responsable_email_ext = Func.Ecrypted($("#responsable_email_ext").val().trim()); //OPCIONAL
	  		areaint = Func.Ecrypted($("#areaint").val().trim()); //OPCIONAL
	  		
	  		
	  		if(AppConfig["id_tipo_cto"]===undefined)AppConfig["id_tipo_cto"]=""; 	var id_tipo_cto = Func.Ecrypted(AppConfig["id_tipo_cto"]);	//console.log(AppConfig["cod_meta"]);	console.log(Func.Ecrypted(AppConfig["cod_meta"]));
	  		if(AppConfig["cod_meta"]===undefined)AppConfig["cod_meta"]=""; 			var cod_meta = Func.Ecrypted(AppConfig["cod_meta"]);
	  		if(AppConfig["id_producto"]===undefined)AppConfig["id_producto"]="";	var id_producto = Func.Ecrypted(AppConfig["id_producto"]);
	  		//nro_cto = Func.Ecrypted(nro_cto);
	  		fte_nacional = Func.Ecrypted(numeral().unformat(fte_nacional));
	  		fte_depto = Func.Ecrypted(numeral().unformat(fte_depto));
	  		fte_mpio = Func.Ecrypted(numeral().unformat(fte_mpio));
	  		fte_sgp = Func.Ecrypted(numeral().unformat(fte_sgp));
	  		fte_regalias = Func.Ecrypted(numeral().unformat(fte_regalias));
	  		descripcion_fte_otros = Func.Ecrypted(descripcion_fte_otros);
	  		fte_otros = Func.Ecrypted(numeral().unformat(fte_otros));//fecha_ini = Func.Ecrypted(fecha_ini);//fecha_fin = Func.Ecrypted(fecha_fin);
	  		enlace_secop = Func.Ecrypted(enlace_secop);
	  		//empleos_gen_directo = Func.Ecrypted(empleos_gen_directo);
	  		pbeneficiadas = Func.Ecrypted(numeral().unformat(pbeneficiadas));
	  		
	  		//empleos_gen_indirecto = Func.Ecrypted(empleos_gen_indirecto);
	  		resultado = Func.Ecrypted(resultado);
	  		
  			AppConfig.socketDataAdmin.emit('SetGestion', {	fecha:fecha,codigo_mun:codigo_mun,id_categoria:id_categoria,//noticia:noticia,
  															descripcion:descripcion,
  															avance_porcentaje:avance_porcentaje,id_centrog:id_centrog,responsable_nom:responsable_nom,id_sector:id_sector,
  															responsable_tel:responsable_tel,responsable_email:responsable_email,
  															//responsable_nom_ext:responsable_nom_ext,responsable_tel_ext:responsable_tel_ext,responsable_email_ext:responsable_email_ext,nro_cto:nro_cto,
  															id_tipo_cto:id_tipo_cto,fte_nacional:fte_nacional,fte_depto:fte_depto,fte_mpio:fte_mpio,fte_sgp:fte_sgp,
  															fte_regalias:fte_regalias,descripcion_fte_otros:descripcion_fte_otros,fte_otros:fte_otros,//fecha_ini:fecha_ini,fecha_fin:fecha_fin,
  															enlace_secop:enlace_secop,cod_meta:cod_meta,pbeneficiadas:pbeneficiadas,areaint:areaint,//empleos_gen_indirecto:empleos_gen_indirecto,
  															id_producto:id_producto,resultado:resultado
			 }, function(message){	//console.log(message);
			 		if($.isNumeric(message)){
			 			if(NumArchivos>0){
			 				console.log("Adjuntos: "+NumArchivos);
							AppConfig["id_gestion"] = message;	//console.log(AppConfig["IdVisita"]);
				 			$('#input-1').fileinput('upload');
			 			}else{
				 			bootbox.alert("La Gestión se ha guardado exitosamente!!!", function() {
				 				window.location.href = 'index.html';
				 			});			 				
			 			}
			 		}else{
			 			Func.MsjPeligro("No se pudo Guardar el registro");
			 		}
			});
	  		
	  		
	  	}
	});
});
    
});