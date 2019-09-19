$(document).ready(function() {

	var IdGestion = Func.GetIdGestion();
	console.log(IdGestion);
	if(IdGestion == "")	window.location.href = 'index.html';
   	AppConfig.gavance = function( valorPorc){
   		var chart = AmCharts.makeChart("chartdiv", {
			"theme": "light",
		  	"type": "gauge",
			"axes": [{
				"topText": valorPorc + " %",
				"topTextFontSize": 15,
				"topTextYOffset": 50,
				"axisColor": "#31d6ea",
				"axisThickness": 1,
				"endValue": 100,
				"gridInside": true,
				"inside": true,
				"radius": "58%",
				"valueInterval": 25,
				"tickColor": "#000000", //PEN
				"startAngle": -90,
				"endAngle": 90,
				"unit": "%",
				"bandOutlineAlpha": 0,
				"bands": [{
					"color": "#0080ff",	//0080ff
					"endValue": 100,
					"innerRadius": "105%",
					"radius": "170%",
					"gradientRatio": [0.5, 0, -0.5],
					"startValue": 0
					}, {
					"color": "#3cd3a3",	//3cd3a3
					"endValue": 0,
					"innerRadius": "105%",
					"radius": "170%",
					"gradientRatio": [0.5, 0, -0.5],
					"startValue": 0
					}]
		  	}],
			"autoMargins": true,
			"marginTop": 0,
			"marginBottom": -100,
			"marginLeft": 0,
			"marginRight": 0,
			"pullOutRadius": 0,
			"arrows": [{
				"alpha": 1,
				"innerRadius": "15%",
				"nailRadius": 0,
				"radius": "170%",
		  		"value": valorPorc,
			}]
			,
			"listeners": [{
			    "event": "rendered",
			    "method": function(e) {
			      console.log("renderizó Grafica ok");
			    }
			}],
			"export": {
			    "enabled": true
			}
		});
   	} 
	AppConfig.getColor=function(val){   console.log(val);
        if(val>=0 && val<30){  //console.log(c.symbols[i].color);
          return "red";
        }else if(val>=30 && val<60){
        	return "yellow";
        }else if(val>=60){
        	return "green";
        }
	}

AppConfig.SetNombreGestion= function() {
	var NomGestion = Func.GetNomGestion(); //IdGestion
	$("#nom_gestion").text(NomGestion);

	var img = $("<img />").attr('src', 'http://saga.cundinamarca.gov.co/apps/GestionGob/Resources/phpqrcode/index.php?data=http://saga.cundinamarca.gov.co/apps/GestionGob/Views/Gestiones/reporte.php?id='+IdGestion+'&level=H&size=3')
	    .on('load', function() {
	        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
	            alert('broken image!');
	        } else {
	            $("#imgQR").append(img);
	        }
	    });

};

AppConfig.Inicial= function() {
	/* CODIGO DE PANEL DESPLEGABLE */
    $('.acordeon-body').on('shown.bs.collapse', function () {	//console.log("Evento Mostrar");	//console.log($(this));console.log($(this).prev());
    	$(this).prev().find("i").removeClass('fa-sort-down').addClass('fa-sort-up')
    });
    $('.acordeon-body').on('hidden.bs.collapse', function () {	//console.log("Evento Ocultar");
        $(this).prev().find("i").removeClass('fa-sort-up').addClass('fa-sort-down');
    });

    $('.card-header').on('click',function(){	//console.log("Evento CLICK");
    	var eHeader = $(this);
    	if($(this).find("i").hasClass('fa-sort-down')) $(this).next().collapse('show');
    	else $(this).next().collapse('hide');
    });


	var arr = [13, 468, 3, 6, 220, 762, 97, 16, 522, 69, 119, 2895, 1255, 49, 19, 261, 9, 140, 55, 20, 6, 22, 6,1,1,1099, 17, 115];
	function sortNumber(a,b) {
    	return a - b;
	}
	arr.sort(sortNumber);	console.log(arr);
	var len =  arr.length;
	var per20 =  Math.floor(len*.8) - 1;

	console.log(arr[per20]);

};

AppConfig.CargarGestion= function() {
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetUnicaGes',  {id_gestion : IdGestion}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión Ini");			//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);											//console.log(decrypted);
			$.each(decrypted, function () {
				$.each(this, function (name1, value1) {		//console.log(value1);	//console.log(name1 + '=' + value1); 
					$.each(value1, function (name, value) {	//console.log(name + '=' + value);
						if(name=="enlace_secop"){
							$("#"+name).html('<a target="_blank" href="'+value+'">'+value+'</a>');
						}else if(name=="avance_porcentaje"){	console.log(name + '=' + value);
							AppConfig.gavance(value);
							if(value<96){
								$("#accordionSeguimiento").hide();
							}
						}else if (name=="id_convenio"){
							AppConfig.getuniConvenio(value);
						}else if(name=="url"){		//console.log(name + '=' + value);
								var str = value;
								if(str==null){	
									$("#panel-archivos").hide();
								}else{
									var str_array = str.split(',');
									for(var i = 0; i < str_array.length; i++) {
									   str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	//console.log(str);
									   var datafile = str.split('@');	//console.log(datafile[1].substring(0, 5));
										if(datafile[1].substring(0, 5)=="image"){
											$("#aniimated-thumbnials").append('<a href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'" data-sub-html="Fecha: <h4>'+datafile[2]+'</h4>"><img class="galeria" src="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'" /></a>');	
										}else{
											if($('#lista_archivos').is(':empty')) $("#lista_archivos").append('<br><label class="control-label">Galería: </label>');
											$("#lista_archivos").append('<br><a target="_blank" href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'"><h4>'+datafile[0].replace(/^.*[\\\/]/, '').substring(8)+'</h4></a>');
										}
									}
								}
						}else{
							$("#"+name).text(value);
						} 
			      	});
/*			      	if(value1.responsable_nom_ext=="" && value1.responsable_tel_ext=="" && value1.responsable_email_ext==""){	//console.log("Contraer panel");
			      		$("#responsable_ext-span").addClass("panel-collapsed");
			      		$("#responsable_ext-panel-body").hide();
			      		$("#responsable_ext-icon").removeClass("glyphicon-chevron-up");
			      		$("#responsable_ext-icon").addClass("glyphicon-chevron-down");
			      	}
			      	if(value1.enlace_secop.length==0 && (value1.fte_nacional=="$0" || value1.fte_nacional==null) && (value1.fte_depto=="$0" || value1.fte_depto==null)  && (value1.fte_mpio=="$0" || value1.fte_mpio==null) && (value1.fte_sgp=="$0" || value1.fte_sgp==null) && (value1.fte_regalias=="$0" || value1.fte_regalias==null) && (value1.fte_otros=="$0" || value1.fte_otros==null)){ //console.log("Contrae Panel");
			      		$("#contrato-span").addClass("panel-collapsed");
			      		$("#contrato-panel-body").hide();
			      		$("#contrato-icon").removeClass("glyphicon-chevron-up");
			      		$("#contrato-icon").addClass("glyphicon-chevron-down");
			      	}	*/
				}); //console.log("Cargaaaaaa");
			});	//console.log("lightGallery");
			$('#aniimated-thumbnials').lightGallery({
			    thumbnail:true,
			    animateThumb: false,
			    showThumbByDefault: false
			});
		    console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
		});
};
var Eventos = function(){
	$(".btn_eliminar_visita").click(function(){	console.log("Click ELiminar");
		var vis = $(this).attr('v');				//console.log(fila);	//console.log();
		var id = $(this).attr('val' );		//console.log(id_gestion);	//console.log($.fn.dataTable.isDataTable( oTable ));
		bootbox.confirm('<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color:red"></i> Seguro que desea <B>Eliminar</B> la gestión: <B>'+$('#descripcion_vis_'+vis).text()+'</B>', function(result) {
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
	AppConfig.Inicial();
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
						var eliminar = '';
						if(Func.GetTipo()!="C"){
							//eliminar  = '<a  class="btn_eliminar_visita" val="'+value1.id+'" v="'+name1+'">Eliminar <i class="fa fa-trash" aria-hidden="true"></i></a>';
						}
						var html = ''+
						'<div id="accordion'+name1+'">'+
						'  <div class="card">'+
						'    <div class="card-header">'+
						'        <button id="panel_heading_'+name1+'" class="btn btn-outline-info collapsed" type="button" data-toggle="collapse" data-target="#panel_body_'+name1+'" aria-expanded="false" aria-controls="conDerivado-panel-body">'+
						'        </button>'+
						'        <span class="badge badge-pill badge-info" id="avance_porcen_'+name1+'"></span>'+
						'        <i class="fa fa-sort-down right-icon-pos acordeon-icono" aria-hidden="true"></i>'+
						'    </div>'+
						'    <div id="panel_body_'+name1+'" class="collapse acordeon-body" data-parent="#accordionSeguimiento">'+
						'      <div class="card-body">'+
						'      	<div class="row">'+
						'			<div class="col-sm">'+
						'				<label for="resultado" class="control-label" style="font-weight:500">Avance:&nbsp;</label><label id="descripcion_vis_'+name1+'" class="control-label">&nbsp;</label>'+
						'			</div>'+
						'		</div>'+
						'		<div class="row">'+
						'			<div class="col-sm">'+
						'				<div id="aniimated-thumbnials_'+name1+'"></div>'+
						'				<div id="lista_archivos_'+name1+'"></div>'+
						'			</div>'+
						'		</div>'+
						'      </div>'+
						'    </div>'+
						'  </div>'+
						'</div>';
					 	$("#panel-visitas").append(html);	//console.log(eliminar);
						$.each(value1, function (name, value) {	//console.log(name + '=' + value);
							if(name == "fecha" ) $('#panel_heading_'+name1).html("Avance "+(name1+1)+":      "+value+"      "+eliminar);
							if(name == "nombre_mun" ) $('#codigo_mun_vis_'+name1).html(value);
							if(name == "descripcion" ) $('#descripcion_vis_'+name1).html(value);
							if(name == "avance_porcen" ){	console.log(value);	//
								$('#avance_porcen_'+name1).html(value+" %");
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

	AppConfig.estadoPanel= function(objeto,evento){		//console.log(objeto);
		var $this = objeto;		//console.log($this.prev());
		var $pheading = $this.prev();
		if(evento == "Abrir"){
			//$this.addClass('show');
/*			$this.show();
			$this.hide();		
			$this.slideDown();
			$pheading.find('span').removeClass('panel-collapsed');
			$pheading.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up'); */
		}else{
/*			$this.show();
			$this.slideUp();
			$pheading.find('span').addClass('panel-collapsed');
			$pheading.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down'); */
		}
	};
	AppConfig.getuniConvenio= function(id_convenio) {	//console.log(id_convenio);
		if(id_convenio == "") return false;
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin'); AppConfig.socketDataAdmin.on('error', function (err, client) {console.error('idle client error', err.message, err.stack);});
	  	AppConfig.socketDataAdmin.emit('getuniConvenio_AddGestion', {id_convenio : id_convenio }, function(message){
			console.log(moment().format('h:mm:ss:SSSS')+" Solicita info Convenio: "+id_convenio);				//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);										//console.log(decrypted.datos[0]);
			var tipoc = decrypted.datos[0].tipoc;	//console.log(tipoc);
			if(tipoc == 1 && ($("#dnro_con").text() == '' )) AppConfig.estadoPanel($('#conMarco-panel-body'),'Abrir');
			if(tipoc == 2) AppConfig.estadoPanel($('#conDerivado-panel-body'),'Abrir');
			$.each(decrypted.datos[0], function(i, item) {	//console.log(i + " => " + item);	//id_convenio
				if(item==null) item = "NA";
				var prefijo = "d";
				if(tipoc==1) prefijo = "m";
				if(i == 'fuentes'){
					var vrFteTmp = item.split(";");		//console.log(vrFteTmp.length);
					if(vrFteTmp.length>4){
						$("#"+prefijo+"filaFuente58").show()
					}
					$.each(vrFteTmp, function(j, it) {	//console.log(j + " " + it);
						$("#"+prefijo+"fuente"+(j+1)).html("<b>Fuente </b>"+it);
					});
				}else if(i == 'modificacion_con'){	//console.log(i + " :" + item + "-");
					if(item) $("#"+prefijo+""+i).text('Si');
					else $("#"+prefijo+""+i).text('No');
				}else if(i == 'url'){	//console.log(item);
					var str = item;
					var str_array = str.split(',');
					for(var i = 0; i < str_array.length; i++) {
					   var str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	//console.log(str);
					   var datafile = str.split('@');	//console.log(datafile[1].substring(0, 5));
						if(datafile[1].substring(0, 5)!="image"){	//console.log(prefijo + " - " + datafile[0] + " - " + $("#"+prefijo+"Adjuntos").is(':empty'));
							if($("#"+prefijo+"Adjuntos").is(':empty')) $("#"+prefijo+"Adjuntos").append('<br><label class="control-label">Archivos:</label>');
							$("#"+prefijo+"Adjuntos").append('&nbsp;<a target="_blank" href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'"><span class="badge badge-secondary">'+datafile[0].replace(/^.*[\\\/]/, '').substring(8)+'</span></a>&nbsp;');
						}
					}
				}else {
					$("#"+prefijo+""+i).text(item);
				}
			});
			if(tipoc == 2) AppConfig.getuniConvenio(decrypted.datos[0].id_con_marco);
		  	console.log(moment().format('h:mm:ss:SSSS')+" FIN"); 
		});
	};

AppConfig.Inicial();
AppConfig.SetNombreGestion();
AppConfig.CargarGestion();
AppConfig.CargarVisitas();

    
});
