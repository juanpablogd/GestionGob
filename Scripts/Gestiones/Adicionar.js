$(document).ready(function() {
	/* Valida Acceso */	
	if(Func.GetTipo()=="C")	window.location.href = 'index.html';

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
	if(Func.GetIdPerfil()==122){
		$("#div_cmarco").show();
		$("#div_infocmarco").show();
		$("#div_infocderivado").show();
		$("#divTipos").show();
		AppConfig.estadoPanel($('#conMarco-panel-body'),'cerrar');
		AppConfig.estadoPanel($('#conDerivado-panel-body'),'cerrar');
		//ESTRATEGIA HECHOS CONCRETOS
		$("#id_categoria").val('1');
		$('#id_categoria').prop('disabled', 'disabled');
		$("#panelContractual").hide();
		$("#divMetas").hide();
	}
	/* CODIGO DE PANEL DESPLEGABLE */
	$(document).on('click', '.panel-heading span.clickable', function(e){
	    var $this = $(this);	//console.log(this);
		if(!$this.hasClass('panel-collapsed')) {
			$this.parents('.panel').find('.panel-body').slideUp();
			$this.addClass('panel-collapsed');
			$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
			$this.parents('.panel').find('.panel-body').hide(); 
		} else {
			$this.parents('.panel').find('.panel-body').slideDown();
			$this.removeClass('panel-collapsed');
			$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
			$this.parents('.panel').find('.panel-body').show();
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
            	AppConfig['id_sector'] = $('#id_sector option:selected').map(function(a, item){return item.value;}).get();	console.log(AppConfig['id_sector']);
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
            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	console.log(AppConfig['id_centrog']);
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
	/* SELECT - CONVENIO DERIVADO */
	$('#sel_id_convenio').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_convenio'] = $('#sel_id_convenio option:selected').map(function(a, item){return item.value;}).get();	//console.log('onChange: '+AppConfig['id_convenio']);
            	/* LIMPIA DATOS*/
            	$( "label[id^='m']" ).text('');
            	$( "label[id^='d']" ).text('');
				AppConfig.estadoPanel($('#conMarco-panel-body'),'cerrar');
				AppConfig.estadoPanel($('#conDerivado-panel-body'),'cerrar');
            	/* CONSULTA EL CONVENIO SELECCIONADO */
            	if(AppConfig['id_convenio'][0] != "") {
            		AppConfig.getuniConvenio_AddGestion(AppConfig['id_convenio'][0]);	
            	}

            },
            onSelectAll: function(checked) {
            	AppConfig['id_convenio'] = $('#sel_id_convenio option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_convenio'] = $('#sel_id_convenio option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
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
	/* SELECT - TIPO */
	$('#sel_id_tipoc').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_tipoc'] = $('#sel_id_tipoc option:selected').map(function(a, item){return item.value;}).get();	//console.log('onChange: '+AppConfig['id_convenio']);	//console.log(AppConfig['id_tipoc'][0]);
            	if(AppConfig['id_tipoc'][0] != "") AppConfig.cargaSubtipos(AppConfig['id_tipoc'][0]);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_tipoc'] = $('#sel_id_tipoc option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_tipoc'] = $('#sel_id_tipoc option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
	        }
	});
	/* SELECT - SUBTIPO */
	$('#sel_id_subtipoc').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            onChange: function(option, checked, select) {
            	AppConfig['id_subtipoc'] = $('#sel_id_subtipoc option:selected').map(function(a, item){return item.value;}).get();	//console.log('onChange: '+AppConfig['id_convenio']);
            },
            onSelectAll: function(checked) {
            	AppConfig['id_subtipoc'] = $('#sel_id_subtipoc option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
	        },
            onDeselectAll: function(checked) {
            	AppConfig['id_subtipoc'] = $('#sel_id_subtipoc option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_convenio']);
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
	$('#fecha').datetextentry();

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
	
	$('[data-toggle="tooltip"]').tooltip();
	setTimeout(function() { $('#fecha').nextAll('span').find('.jq-dte-day').focus();}, 0.5*000);
	//console.log("ToolTip");
};


AppConfig.CargaMunicipios= function() {
	var tipoMpio = 'GetListMpioSimple';
	if(Func.BuscaArray(Func.GetCentrosG(),"1223")){	//BUSCA EL ICCU DENTRO DE LOS PERMISOS
		$("#codigo_mun").attr("multiple", "multiple");
		tipoMpio = 'GetListMpio';
	}
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit(tipoMpio, '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Municipios Ini");		//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoMpio"]=decrypted;											//console.log("geojson Mun:" + AppConfig["ListadoMpio"].features.length);
		$('#codigo_mun').multiselect('dataprovider', AppConfig["ListadoMpio"]);		//console.log(AppConfig["ListadoMpio"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.CargaSectores= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('GetListSector', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Sector");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoSector"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#id_sector').multiselect('dataprovider', AppConfig["ListadoSector"]);
		if(Func.GetIdPerfil()==122){
			$('#id_sector').multiselect('select', ["1"]);
			AppConfig["id_sector"] = ["1"];
		}
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.CargaSecretarias= function() {	
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
	var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());	console.log(Func.GetCentrosG());	//console.log(Func.GetCentrosG().join());
  	AppConfig.socketDataAdmin.emit('GetListSecretaria', {id_centrog : id_centroges, tipo_usr : Func.Ecrypted(Func.GetTipo()) }, function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Secretaria");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["ListadoSecretaria"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#id_centrog').multiselect('dataprovider', AppConfig["ListadoSecretaria"]);
		$('#id_centrog').multiselect('select', Func.GetCentrosG());
		AppConfig["id_centrog"] = Func.GetCentrosG();
		
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};

AppConfig.CargaMetas= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
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
AppConfig.cargaConvenios= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('getlistaConveniosParam', '', function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Convenio Marco");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["listadoConvenios"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		$('#sel_id_convenio').multiselect('dataprovider', AppConfig["listadoConvenios"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.getuniConvenio_AddGestion= function(id_convenio) {	console.log(id_convenio);
	if(id_convenio == "") return false;
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('getuniConvenio_AddGestion', {id_convenio : id_convenio }, function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Solicita info Convenio: "+id_convenio);				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										console.log(decrypted.datos[0]);
		var tipoc = decrypted.datos[0].tipoc;	console.log(tipoc);
		if(tipoc == 1 && ($("#dnro_con").text() == '' )) AppConfig.estadoPanel($('#conMarco-panel-body'),'Abrir');
		if(tipoc == 2) AppConfig.estadoPanel($('#conDerivado-panel-body'),'Abrir');
		$.each(decrypted.datos[0], function(i, item) {	//console.log(i + " " + item);	id_convenio
			if(tipoc==1){
				if(i == 'fuentes'){
					var vrFteTmp = item.split(";");		console.log(vrFteTmp.length);
					if(vrFteTmp.length>4){
						$("#mfilaFuente58").show()
					}
					$.each(vrFteTmp, function(j, it) {	console.log(j + " " + it);
						$("#mfuente"+(j+1)).html("<b>Fuente </b>"+it);
					});
				}else if(i == 'modificacion_con'){	console.log(i + " :" + item + "-");
					if(item) $("#m"+i).text('Si');
					else $("#m"+i).text('No');
				}else {
					$("#m"+i).text(item);
				}
			}else{
				if(i == 'fuentes'){
					var vrFteTmp = item.split(";");		console.log(vrFteTmp.length);
					if(vrFteTmp.length>4){
						$("#dfilaFuente58").show()
					}
					$.each(vrFteTmp, function(j, it) {	console.log(j + " " + it);
						$("#dfuente"+(j+1)).html("<b>Fuente </b>"+it);
					});
				}else if(i == 'modificacion_con'){	console.log(i + " :" + item + "-");
					if(item) $("#d"+i).text('Si');
					else $("#d"+i).text('No');
				}else {
					$("#d"+i).text(item);
				}
			}
		});
		if(tipoc == 2) AppConfig.getuniConvenio_AddGestion(decrypted.datos[0].id_con_marco);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN"); 
	});
};
AppConfig.cargaEstados= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('getlistaEstadosParam', '', function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Estados");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["listadoEstados"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		$('#sel_id_estado').multiselect('dataprovider', AppConfig["listadoEstados"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.cargaTipos= function() {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
	var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());	//console.log(Func.GetCentrosG().join());
  	AppConfig.socketDataAdmin.emit('getlistaTiposParam', {id_centrog : id_centroges}, function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Tipos");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["listadoTipos"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		$('#sel_id_tipoc').multiselect('dataprovider', AppConfig["listadoTipos"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.cargaSubtipos= function(id_tipoc) {	//console.log(AppConfig['id_centrog']);
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('getlistaSubtiposParam', {id_tipoc : id_tipoc}, function(message){
		console.log(moment().format('h:mm:ss:SSSS')+" Listado SUB Tipos");				//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);										//console.log(message);									
		AppConfig["listadoSubtipos"]=decrypted;											//console.log("geojson Metas:" + AppConfig["ListadoMeta"].length);	console.log(AppConfig["ListadoMeta"]);
		$('#sel_id_subtipoc').multiselect('dataprovider', AppConfig["listadoSubtipos"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.CargaProductosPrensa= function() {
	AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');	AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
  	AppConfig.socketDataAdmin.emit('GetListProductoPren', '', function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
		console.log(moment().format('h:mm:ss:SSSS')+" Listado Productos Prensa");			//console.log("message:" + message);
		var decrypted = FuncDecrypted(message);												//console.log(message);									
		AppConfig["ListadoProductosPren"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
		$('#id_producto').multiselect('dataprovider', AppConfig["ListadoProductosPren"]);
	  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
	});
};
AppConfig.Inicial();
AppConfig.cargaConvenios();
AppConfig.cargaEstados()
AppConfig.CargaMunicipios();
AppConfig.CargaSectores();
AppConfig.cargaTipos();
AppConfig.CargaSecretarias();
AppConfig.CargaMetas();
AppConfig.CargaProductosPrensa();



$('#btn_guardar').click(function(){
	bootbox.confirm("Seguro que desea Guardar?", function(result) {
	  	console.log("Confirm result: "+result);
	  	if(result){	//CAMPOS OBLIGATORIOS
	  		var fecha = $("#fecha").val().trim(); //console.log(fecha_ini);
	  		var descripcion = $("#descripcion").val().trim();				//console.log("Descripción: " + descripcion);
	  		var avance_porcentaje = $("#avance_porcentaje").val().trim();
	  		var sem = $("input[name='semaforo']:checked").val();	console.log(sem);
	  		var vr_pagado = $("#vr_pagado").val().trim();			console.log(vr_pagado);
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
	  		
	  		if($("#sel_id_convenio").is(":visible")){
	  			if(AppConfig["id_convenio"]===undefined || AppConfig["id_convenio"].length<1){
		  			Func.MsjPeligro("Debe seleccionar un Convenio");
		  			$('#sel_id_convenio').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#sel_id_convenio').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
	  			}	
	  		}
	  		if(id_categoria == ""){
	  			Func.MsjPeligro("Debe seleccionar una Estrategia");
	  			setTimeout(function() { $('#id_categoria').focus(); }, 500);
	  			return;
	  		}
			if(AppConfig["id_sector"]===undefined || AppConfig["id_sector"].length<1){
	  			Func.MsjPeligro("Debe seleccionar al menos un Sector");
	  			$('#id_sector').nextAll('div').addClass("open");
	  			setTimeout(function() { $('#id_sector').nextAll('div').find('.multiselect-search').focus();}, 500);
	  			return;
	  		}
	  		if(fecha == ""){
	  			Func.MsjPeligro("Debe ingresar una fecha");
	  			setTimeout(function() { $('#fecha').nextAll('span').find('.jq-dte-day').focus();}, 500);
	  			return;
	  		}else if(AppConfig["codigo_mun"]===undefined || AppConfig["codigo_mun"].length<1){
	  			Func.MsjPeligro("Debe seleccionar al menos un Municipio");
	  			$('#codigo_mun').nextAll('div').addClass("open");
	  			setTimeout(function() { $('#codigo_mun').nextAll('div').find('.multiselect-search').focus();}, 500);
	  			return;
	  		}else if(descripcion==""){
	  			Func.MsjPeligro("Digite una descripción");
	  			setTimeout(function() { $('#descripcion').focus(); }, 500);
	  			return;	  			
	  		}
	  		if($("#sel_id_tipoc").is(":visible")){
				if(AppConfig["id_tipoc"]===undefined || AppConfig["id_tipoc"].length<1){
		  			Func.MsjPeligro("Debe seleccionar el Tipo");
		  			$('#sel_id_tipoc').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#sel_id_tipoc').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
		  		}
	  		}
	  		if($("#sel_id_estado").is(":visible")){
				if(AppConfig["id_estado"]===undefined || AppConfig["id_estado"].length<1){
		  			Func.MsjPeligro("Debe seleccionar el estado actual del contrato");
		  			$('#sel_id_estado').nextAll('div').addClass("open");
		  			setTimeout(function() { $('#sel_id_estado').nextAll('div').find('.multiselect-search').focus();}, 500);
		  			return;
		  		}
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
	  		if(pbeneficiadas==""){
  				$('#seguimiento-panel-body').show();
	  			Func.MsjPeligro("Ingrese el número de personas beneficiadas");
	  			setTimeout(function() { $('#pbeneficiadas').focus(); }, 500);
	  			return;
  			}
	  		if(AppConfig["id_centrog"]===undefined || AppConfig["id_centrog"].length<1){
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
	  		}
	  		if($("#cod_meta").is(":visible")){
		  		if(id_categoria==1||id_categoria==2){ //SI ES PROYECTO
					if(AppConfig["cod_meta"]===undefined || AppConfig["cod_meta"].length<1){
						$('#seguimiento-panel-body').show();
			  			Func.MsjPeligro("Debe seleccionar al menos una meta");
			  			$('#cod_meta').nextAll('div').addClass("open");
			  			setTimeout(function() { $('#cod_meta').nextAll('div').find('.multiselect-search').focus();}, 500);
			  			return;
			  		}// FIN INFO CONTRACTUAL
		  		}
		  	}
		  	if($("#enlace_secop").is(":visible")){
				if(enlace_secop!=""){						//console.log("enlace_secop NO VACIO");
						if(Func.ValidaURL(enlace_secop)==false){ //console.log("enlace_secop con INFO NO VALIDO");
			  				$('#contractual-panel-body').show();
				  			Func.MsjPeligro("Ingrese una URL valida");
				  			setTimeout(function() { $('#enlace_secop').focus(); }, 500);
				  			return;
						}	
				}
			}
  			if(resultado==""){
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

  			if(AppConfig["id_convenio"]===undefined)AppConfig["id_convenio"]=""; var id_convenio = Func.Ecrypted(AppConfig["id_convenio"]);	//console.log(AppConfig["id_convenio"]);
  			if(AppConfig["id_estado"]===undefined)AppConfig["id_estado"]=""; var id_estado = Func.Ecrypted(AppConfig["id_estado"]);	console.log(AppConfig["id_estado"]);
  			if(AppConfig["id_tipoc"]===undefined)AppConfig["id_tipoc"]=""; var id_tipoc = Func.Ecrypted(AppConfig["id_tipoc"]);	console.log(AppConfig["id_tipoc"]);
  			if(AppConfig["id_subtipoc"]===undefined)AppConfig["id_subtipoc"]=""; var id_subtipoc = Func.Ecrypted(AppConfig["id_subtipoc"]);	console.log(AppConfig["id_subtipoc"]);
  			sem = Func.Ecrypted(sem);				
  			vr_pagado = Func.Ecrypted(vr_pagado);
	  		
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
  															id_tipo_cto:id_tipo_cto,fte_nacional:fte_nacional,fte_depto:fte_depto,fte_mpio:fte_mpio,fte_sgp:fte_sgp,
  															fte_regalias:fte_regalias,descripcion_fte_otros:descripcion_fte_otros,fte_otros:fte_otros,
  															enlace_secop:enlace_secop,cod_meta:cod_meta,pbeneficiadas:pbeneficiadas,areaint:areaint,
  															id_producto:id_producto,resultado:resultado,
  															id_convenio:id_convenio,id_estado:id_estado,id_tipoc:id_tipoc,id_subtipoc:id_subtipoc,sem:sem,vr_pagado:vr_pagado
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