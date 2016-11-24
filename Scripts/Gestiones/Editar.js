$(document).ready(function() {
	/* Valida Acceso */	
	if(Func.GetTipo()=="C")	window.location.href = 'index.html';
	
	var IdGestion = Func.GetIdGestion();
	console.log(IdGestion);
	if(IdGestion == "")	window.location.href = 'index.html';
	var NomGestion = Func.GetNomGestion();
	$("#nom_gestion").text(NomGestion);

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

	/* SELECT - SECTOR */
	$('#id_sector').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_sector'] = $('#id_sector option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_sector']);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_sector'] = $('#id_sector option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_sector']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_sector'] = $('#id_sector option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_sector']);
	        }
	});
	/* SELECT - CENTRO GESTOR */
	$('#id_centrog').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {	//	console.log("onChange");
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	//AppConfig.EstadoCentroGestor();
            },
            onSelectAll: function(checked) {				//	console.log("onSelectAll");
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	//AppConfig.EstadoCentroGestor();
	        },
            onDeselectAll: function(checked) {				//	console.log("onDeselectAll");
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
            	//AppConfig.EstadoCentroGestor();
	        }
	});
	/* SELECT - TIPO CONTRATO */
	$('#id_tipo_cto').multiselect({
			enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_tipo_cto'] = $('#id_tipo_cto option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_tipo_cto']);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_tipo_cto'] = $('#id_tipo_cto option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_tipo_cto']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_tipo_cto'] = $('#id_tipo_cto option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_tipo_cto']);
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
	/* SELECT -  Productos de Prensa*/
	$('#id_producto').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_producto'] = $('#id_producto option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_producto']);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_producto'] = $('#id_producto option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_producto']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_producto'] = $('#id_producto option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_producto']);
	        }
	});	//console.log(moment().format('YYYY-MM-DD'));
	$('#fecha').datetextentry('set_date',AppConfig['fecha']);

	$( "#id_categoria" ).change(function() { console.log("CAmbia categoria");
		var id_cat = $( this ).val();
		//var csecop = $( "label[for='enlace_secop']" );
		var cmetas = $( "label[for='cod_meta']" );
		//csecop.removeClass("control-label required");
		cmetas.removeClass("control-label required");
		if(id_cat == 1 || id_cat == 2) {
			//csecop.addClass("control-label required");
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
	$('#input-1').on("filepredelete", function(jqXHR) { 
		var abort = true; 
		if (confirm("Desea Eliminar la Imágen?")) { abort = false; } 
		return abort; 
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
		   	
		   	//initialPreviewConfig[i].id_gestion = AppConfig["id_gestion"];
		   	initialPreviewConfig[i].url = "http://saga.cundinamarca.gov.co/SIG/servicios/GestionGob/sa_imagen_eliminar.php?id_gestion="+AppConfig["id_gestion"];
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
	    uploadExtraData: function (previewId, index) {
			    var data = {
				        id_gestion: AppConfig["id_gestion"]
				   };
				console.log(data);
			    return data;
		}
	});
	
	$('[data-toggle="tooltip"]').tooltip();
	//console.log("ToolTip");
};


AppConfig.CargaMunicipios= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
  	AppConfig.socketDataAdmin.emit('GetListMpio', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Municipios Ini");		//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoMpio"]=decrypted;											//console.log("geojson Mun:" + AppConfig["ListadoMpio"].features.length);
		$('#codigo_mun').multiselect('dataprovider', AppConfig["ListadoMpio"]);		//console.log(AppConfig["ListadoMpio"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	  	if(AppConfig["codigo_municipio"] != null && AppConfig["codigo_municipio"] !== undefined){
		  	//SELECCIONA
		  	var str_array = AppConfig["codigo_municipio"].split(', ');	//console.log(str_array);
		  	$('#codigo_mun').multiselect('select', str_array);
		  	AppConfig['codigo_mun'] = str_array;
		}	  	
	});
};
AppConfig.CargaSectores= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
  	AppConfig.socketDataAdmin.emit('GetListSector', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Sector");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoSector"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#id_sector').multiselect('dataprovider', AppConfig["ListadoSector"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	  	if(AppConfig["id_sector"] != null && AppConfig["id_sector"] !== undefined){
		  	//SELECCIONA
		  	var str_array = AppConfig["id_sector"].split(', ');	//console.log(str_array);
		  	$('#id_sector').multiselect('select', str_array);
		  	AppConfig['id_sector'] = str_array;
		}
	});
};
AppConfig.CargaSecretarias= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());	//console.log(Func.GetCentrosG().join());	//console.log(Func.GetCentrosG());
  	AppConfig.socketDataAdmin.emit('GetListSecretaria', {id_centrog : id_centroges, tipo_usr : Func.Ecrypted(Func.GetTipo()) }, function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Secretaria");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoSecretaria"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#id_centrog').multiselect('dataprovider', AppConfig["ListadoSecretaria"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");	//console.log(AppConfig["id_centrog"]);
	  	//SELECCIONA
	  	if(AppConfig["id_centrog"] != null && AppConfig["id_centrog"] !== undefined){
		  	var str_array = AppConfig["id_centrog"].split(', ');	
		  	$('#id_centrog').multiselect('select', str_array);
		  	AppConfig['id_centrog'] = str_array;
	  	}
	});
};

AppConfig.CargaMetas= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
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
		  	var str_array = AppConfig["meta"].split(', ');		
		  	$('#cod_meta').multiselect('select', str_array);
		  	AppConfig['cod_meta'] = str_array;
		}
	});
   
};
AppConfig.CargaProductosPrensa= function() {
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
  	AppConfig.socketDataAdmin.emit('GetListProductoPren', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Productos Prensa");			//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);												//console.log(message);									
		AppConfig["ListadoProductosPren"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#id_producto').multiselect('dataprovider', AppConfig["ListadoProductosPren"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN"); //console.log(AppConfig["id_producto"]);
	  	//SELECCIONA
	  	if(AppConfig["id_producto"] != null){
		  	var str_array = AppConfig["id_producto"].split(', ');	//console.log(str_array);
		  	$('#id_producto').multiselect('select', str_array);
		  	AppConfig['id_producto'] = str_array;
		}
	});
};

AppConfig.CargarGestion= function() {
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetUnicaGes',  {id_gestion : IdGestion}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);

			var decrypted = FuncDecrypted(message);											//console.log(decrypted);
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {		//console.log(value1);	//console.log(name1 + '=' + value1); 
					$.each(value1, function (name, value) {	//console.log(name + '=' + value);
						AppConfig[name] = value;
						$('#'+name).val(value);
			      	});
				}); //console.log("Cargaaaaaa");
			});

			AppConfig.Inicial();
			AppConfig.CargaMunicipios();
			AppConfig.CargaSectores();
			AppConfig.CargaSecretarias();
			//AppConfig.CargaTipoContrato();
			AppConfig.CargaMetas();
			AppConfig.CargaProductosPrensa();

		});
};

AppConfig.CargarGestion();

$('#btn_guardar').click(function(){
	bootbox.confirm("Seguro que desea Guardar?", function(result) {
	  	console.log("Confirm result: "+result);
	  	if(result){	//CAMPOS OBLIGATORIOS
	  		var fecha = $("#fecha").val().trim(); //console.log(fecha_ini);
	  		var noticia = $("#noticia").val().trim();	if(noticia.length > 255) noticia = noticia.substring(0,255);
	  		var id_categoria = $("#id_categoria option:selected").val();
	  		var descripcion = $("#descripcion").val().trim();				//console.log("Descripción: " + descripcion);
	  		var avance_porcentaje = $("#avance_porcentaje").val().trim();
	  		var responsable_nom = $("#responsable_nom").val().trim();
	  		var responsable_tel = $("#responsable_tel").val().trim();
	  		//var nro_cto = $("#nro_cto").val().trim();	//var fte_nacional = $("#fte_nacional").val().trim();//var fte_depto = $("#fte_depto").val().trim();//var fte_mpio = $("#fte_mpio").val().trim();//var fte_sgp = $("#fte_sgp").val().trim();//var fte_regalias = $("#fte_regalias").val().trim();//var fte_otros = $("#fte_otros").val().trim();//console.log(fte_otros);//var descripcion_fte_otros = $("#descripcion_fte_otros").val().trim();//var fecha_ini = $("#fecha_ini").val().trim(); //console.log(fecha_ini);//var fecha_fin = $("#fecha_fin").val().trim(); //console.log(fecha_fin);
	  		var enlace_secop = $("#enlace_secop").val().trim();		//console.log(enlace_secop);
	  		var empleos_gen_directo = $("#empleos_gen_directo").val().trim();
	  		var empleos_gen_indirecto = $("#empleos_gen_indirecto").val().trim();
	  		var resultado = $("#resultado").val().trim();		//console.log(resultado);
	  		var NumArchivos = $('#input-1').fileinput('getFileStack').length;	
	  		
	  		if(fecha == ""){
	  			Func.MsjPeligro("Debe ingresar una fecha");
	  			setTimeout(function() { $('#fecha').nextAll('span').find('.jq-dte-day').focus();}, 500);
	  			return;
	  		}else if(noticia==""){
	  			Func.MsjPeligro("Digite el nombre de la Noticia");
	  			setTimeout(function() { $('#noticia').focus(); }, 500);
	  			return;
	  		}else if(descripcion==""){
	  			Func.MsjPeligro("Digite una descripción");
	  			setTimeout(function() { $('#descripcion').focus(); }, 500);
	  			return;
	  		}else if(AppConfig["codigo_mun"]===undefined || AppConfig["codigo_mun"]==null || AppConfig["codigo_mun"].length<1){
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
	  		}else if(AppConfig["id_centrog"]===undefined || AppConfig["id_centrog"]==null || AppConfig["id_centrog"].length<1){
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
		  		}
				// FIN INFO CONTRACTUAL
	  		}
			if(enlace_secop!=""){ console.log("enlace_secop NO VACIO");
				if(Func.ValidaURL(enlace_secop)==false){	//console.log("enlace_secop con INFO NO VALIDO");
	  				$('#contractual-panel-body').show();
		  			Func.MsjPeligro("Ingrese una URL valida");
		  			setTimeout(function() { $('#enlace_secop').focus(); }, 500);
		  			return;
				}	
			}
	  		if(empleos_gen_directo==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Ingrese el número de empleos generados directamente");
	  			setTimeout(function() { $('#empleos_gen_directo').focus(); }, 500);
	  			return;
  			}else if(empleos_gen_indirecto==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Ingrese el número de empleos generados Indirectamente");
	  			setTimeout(function() { $('#empleos_gen_indirecto').focus(); }, 500);
	  			return;
  			}else if(resultado==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Describa el resultado de la gestión");
	  			setTimeout(function() { $('#resultado').focus();}, 500);
	  			return;
	  		}
	  		console.log("FORMULARIO OK!!!!!!!!!!!!!");
	  		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); 	//console.log(AppConfig["codigo_mun"]);	console.log(AppConfig["codigo_mun"].join());
	  		fecha = Func.Ecrypted(fecha);	//console.log(AppConfig["codigo_mun"]);
	  		var codigo_mun = Func.Ecrypted(AppConfig["codigo_mun"]);					//console.log(codigo_mun);
	  		id_categoria = Func.Ecrypted(id_categoria);
	  		noticia = Func.Ecrypted(noticia);
	  		descripcion = Func.Ecrypted(descripcion);
	  		avance_porcentaje = Func.Ecrypted(avance_porcentaje);
	  		var id_sector = Func.Ecrypted(AppConfig["id_sector"]);
	  		var id_centrog = Func.Ecrypted(AppConfig["id_centrog"]);
	  		responsable_nom = Func.Ecrypted(responsable_nom);
	  		responsable_tel = Func.Ecrypted(responsable_tel);
	  		responsable_email = Func.Ecrypted($("#responsable_email").val().trim()); //OPCIONAL
	  		responsable_nom_ext = Func.Ecrypted($("#responsable_nom_ext").val().trim()); //OPCIONAL
	  		responsable_tel_ext = Func.Ecrypted($("#responsable_tel_ext").val().trim()); //OPCIONAL
	  		responsable_email_ext = Func.Ecrypted($("#responsable_email_ext").val().trim()); //OPCIONAL
	  		
	  		
	  		if(AppConfig["id_tipo_cto"]===undefined)AppConfig["id_tipo_cto"]=""; 	var id_tipo_cto = Func.Ecrypted(AppConfig["id_tipo_cto"]);	//console.log(AppConfig["cod_meta"]);	console.log(Func.Ecrypted(AppConfig["cod_meta"]));
	  		if(AppConfig["cod_meta"]===undefined)AppConfig["cod_meta"]=""; 			var cod_meta = Func.Ecrypted(AppConfig["cod_meta"]);
	  		if(AppConfig["id_producto"]===undefined)AppConfig["id_producto"]="";	var id_producto = Func.Ecrypted(AppConfig["id_producto"]);
	  		//nro_cto = Func.Ecrypted(nro_cto);//fte_nacional = Func.Ecrypted(numeral().unformat(fte_nacional));//fte_depto = Func.Ecrypted(numeral().unformat(fte_depto));//fte_mpio = Func.Ecrypted(numeral().unformat(fte_mpio));//fte_sgp = Func.Ecrypted(numeral().unformat(fte_sgp));//fte_regalias = Func.Ecrypted(numeral().unformat(fte_regalias));//descripcion_fte_otros = Func.Ecrypted(descripcion_fte_otros);//fte_otros = Func.Ecrypted(numeral().unformat(fte_otros));//fecha_ini = Func.Ecrypted(fecha_ini);//fecha_fin = Func.Ecrypted(fecha_fin);
	  		enlace_secop = Func.Ecrypted(enlace_secop);
	  		empleos_gen_directo = Func.Ecrypted(empleos_gen_directo);
	  		empleos_gen_indirecto = Func.Ecrypted(empleos_gen_indirecto);
	  		resultado = Func.Ecrypted(resultado);
	  		id_gestion = Func.Ecrypted(IdGestion);
	  		
  			AppConfig.socketDataAdmin.emit('UpdateGestion', { IdGestion:id_gestion,fecha:fecha,codigo_mun:codigo_mun,id_categoria:id_categoria,noticia:noticia,descripcion:descripcion,
  															avance_porcentaje:avance_porcentaje,id_sector:id_sector,id_centrog:id_centrog,responsable_nom:responsable_nom,
  															responsable_tel:responsable_tel,responsable_email:responsable_email,responsable_nom_ext:responsable_nom_ext,
  															responsable_tel_ext:responsable_tel_ext,responsable_email_ext:responsable_email_ext,id_tipo_cto:id_tipo_cto,
  															//nro_cto:nro_cto,fte_nacional:fte_nacional,fte_depto:fte_depto,fte_mpio:fte_mpio,fte_sgp:fte_sgp,
  															//fte_regalias:fte_regalias,descripcion_fte_otros:descripcion_fte_otros,fte_otros:fte_otros,fecha_ini:fecha_ini,fecha_fin:fecha_fin,
  															enlace_secop:enlace_secop,cod_meta:cod_meta,empleos_gen_directo:empleos_gen_directo,empleos_gen_indirecto:empleos_gen_indirecto,
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