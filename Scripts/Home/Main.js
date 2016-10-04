$( document ).ready(function() {
	
	Config.obtieneParametros= function(){	//console.log("Obtiene Parametros");
	  	Config["espacio"] = $('#espacio option:selected').text();
	  	$('#txt-espacio').html(Config["espacio"]);
		  	
	  	Config["tiempoini"] = $('#finicio').val();
	  	$('#txt-fechaini').html('(' + moment(Config["tiempoini"],'YYYY-MM-DD').format('DD/MM/YYYY') + ')');
	  	
	  	Config["tiempofin"] = $('#ffin').val();
	  	$('#txt-fechafin').html('(' + moment(Config["tiempofin"],'YYYY-MM-DD').format('DD/MM/YYYY') + ')');
	  	
	  	Config["id_categoria"] = $('#id_categoria option:selected').val();
	  	
	  	$("#br-cat").remove();
	  	if(Config["id_categoria"]){
	  		$('#txt-id_categoria').html($('#id_categoria option:selected').text()).after('<br id="br-cat"  />');
	  	}else {
	  		$('#txt-id_categoria').html('');
	  	}
	  	Config["avance_porcentaje"] = $("#avance_porcentaje").slider('getValue');
	  	$('#txt-porcenini').html('Avance: '+Config["avance_porcentaje"][0]);
	  	$('#txt-porcenfin').html(Config["avance_porcentaje"][1]+' %');
	  	
	  	var txt = AppConfig['cod_meta'];	
	  	$("#br-met").remove();
	  	$('#txt-metas').html('');
	  	if(txt !== undefined){	//console.log(txt.length + " " +txt.join());	//console.log($('#cod_meta option').length);
	  		if(($('#cod_meta option').length-1)==txt.length){
	  			$('#txt-metas').html('Metas: Todas (' + txt.length+')').after('<br id="br-met" />');
	  		}
	  		else if(txt.length>0) $('#txt-metas').html('Metas: ' + txt.join(' ')).after('<br id="br-met" />');
	  	}
	  	
	  	arr = $('#id_centrog option:selected').map(function(a, item){return item.label;}).get();
	  	$("#br-centro").remove();
	  	$('#txt-centro').html('');	//console.log($('#id_centrog option').length + " " + arr.length); 
  		if(($('#id_centrog option').length) == arr.length && arr.length > 0) {
  			$('#txt-centro').html('Entidad(es): Todas (' + arr.length +')').after('<br id="br-centro" />');
  		}else if(arr.length>0){
	  		txt = "";
	  		for (var i = 0, len = arr.length; i < len; i++) {
			  txt = txt +  arr[i] + '<br>';
			}
	  		$('#txt-centro').html('Entidad(es): ' + txt).after('<br id="br-centro" />');	
	  	}	  		
	};
	
	Config.CargaSecretarias= function() {	
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
		var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());	//console.log(Func.GetCentrosG().join());	//console.log(Func.GetCentrosG());
	  	AppConfig.socketDataAdmin.emit('GetListSecretaria', {id_centrog : id_centroges, tipo_usr : Func.Ecrypted(Func.GetTipo()) }, function(message){			//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Listado Secretaria");				//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);										//console.log(message);									
			AppConfig["ListadoSecretaria"]=decrypted;										//console.log("geojson Mun:" + AppConfig["cod_mpio"].features.length);
			$('#id_centrog').multiselect('dataprovider', AppConfig["ListadoSecretaria"]);
		  	console.log(moment().format('h:mm:ss:SSSS')+" FIN");
		});
	};
	
	Config.CargaMetas= function() {	//console.log(AppConfig['id_centrog']);
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
		});
	};
	
	Config.Inicial= function(){
		Config["espacio"]='Municipio';
		
		$('.input-daterange').datepicker({
			format: "yyyy-mm-dd",
			todayBtn: true,
    		clearBtn: true,
		    language: "es",
		    daysOfWeekHighlighted: "0,6",
		    autoclose: true,
		    todayHighlight: true,
		    startDate: '-4y',
		    endDate: '+4y',
		}).on('changeDate', function(ev){
			Config.obtieneParametros();
        });
		
    	$('#finicio').datepicker('update', '2016-01-01');
    	$('#ffin').datepicker('update', '2019-12-31');
    	
    	$('select').change(function() {
    		Config.obtieneParametros();
		});
		
		$("#avance_porcentaje").slider({}).on('change', function(ev){
			Config.obtieneParametros();
        });
        
        /* SELECT - CENTRO GESTOR */
		$('#id_centrog').multiselect({
	            enableClickableOptGroups: true,
	            enableCollapsibleOptGroups: true,
	            enableFiltering: true,
	            includeSelectAllOption: true,
	            enableCaseInsensitiveFiltering: true,
	            buttonWidth: '285px',
	            maxHeight: 520,
	            dropRight: true,
	            onChange: function(option, checked, select) {	//	console.log("onChange");
	            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
	            	Config.obtieneParametros();
	            },
	            onSelectAll: function(checked) {				//	console.log("onSelectAll");
	            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
	            	Config.obtieneParametros();
		        },
	            onDeselectAll: function(checked) {				//	console.log("onDeselectAll");
	            	AppConfig['id_centrog'] = $('#id_centrog option:selected').map(function(a, item){return item.value;}).get();	//console.log(AppConfig['id_centrog']);
	            	Config.obtieneParametros();
		        }
		});
		/* SELECT - SUBPROGRAMA / META*/
		$('#cod_meta').multiselect({
	            enableClickableOptGroups: true,
	            enableCollapsibleOptGroups: true,
	            enableFiltering: true,
	            includeSelectAllOption: true,
	            enableCaseInsensitiveFiltering: true,
	            buttonWidth: '285px',
	            maxHeight: 470,
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
		
		$("#btn_consultar").click(function(){				//console.log('Data');
			var id_centrog = AppConfig['id_centrog'];		//console.log(id_centrog);
			if(id_centrog !== undefined) id_centrog = id_centrog.join();
			var cod_meta = AppConfig['cod_meta'];
			if(cod_meta !== undefined) cod_meta = cod_meta.join();
			if(Config["espacio"]=='Municipio'){
				Config.DataMunicipio(Config["tiempoini"],Config["tiempofin"],Config["id_categoria"],Config["avance_porcentaje"][0],
								 Config["avance_porcentaje"][1],id_centrog,cod_meta);
			}else if(Config["espacio"]=='Provincia'){
				Config.DataProvincia(Config["tiempoini"],Config["tiempofin"],Config["id_categoria"],Config["avance_porcentaje"][0],
								 Config["avance_porcentaje"][1],id_centrog,cod_meta);				
			}else{
				Config.DataDepartamento(Config["tiempoini"],Config["tiempofin"],Config["id_categoria"],Config["avance_porcentaje"][0],
								 Config["avance_porcentaje"][1],id_centrog,cod_meta);
			}			
		});
    	
	};
	
	Config.GeoMunicipio();
	Config.GeoProvincia();
	Config.GeoDepartamento();
	AppMap.map=AppMap.InitMap();
	AppMap.addZoomControl(AppMap.map);
	AppMap.addStreetViewControl(AppMap.map);
	AppMap.AddBaseEsriCalles();
	Config.AddTooltip();
	Config.Inicial();
	Config.CargaSecretarias();
	Config.CargaMetas();
	Config.obtieneParametros();
});