$(document).ready(function() {
	var IdGestion = Func.GetIdGestion();
	console.log(IdGestion);
if(IdGestion == ""){
	window.location.href = 'index.html';
}


AppConfig.SetNombreGestion= function() {
	var NomGestion = Func.GetNomGestion();
	$("#nom_gestion").text(NomGestion);
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
						}else if(name=="url"){		//console.log(name + '=' + value);
								var str = value;
								if(str==null){	
									$("#panel-archivos").hide();
								}else{
									var str_array = str.split(',');
									for(var i = 0; i < str_array.length; i++) {
									   str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	console.log(str);
									   var datafile = str.split('@');	console.log(datafile[1].substring(0, 5));
										if(datafile[1].substring(0, 5)=="image"){
											$("#aniimated-thumbnials").append('<a href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'"><img class="galeria" src="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'" /></a>');	
										}else{
											if($('#lista_archivos').is(':empty')) $("#lista_archivos").append('<br><label class="control-label">Archivos:</label>');
											$("#lista_archivos").append('<br><a target="_blank" href="http://saga.cundinamarca.gov.co/SIG/'+datafile[0]+'"><h4>'+datafile[0].replace(/^.*[\\\/]/, '').substring(8)+'</h4></a>');
										}
									}
								}
						}else{
							$("#"+name).text(value);
						} 
			      	});
			      	if(value1.responsable_nom_ext=="" && value1.responsable_tel_ext=="" && value1.responsable_email_ext==""){	//console.log("Contraer panel");
			      		$("#responsable_ext-span").addClass("panel-collapsed");
			      		$("#responsable_ext-panel-body").hide();
			      		$("#responsable_ext-icon").removeClass("glyphicon-chevron-up");
			      		$("#responsable_ext-icon").addClass("glyphicon-chevron-down");
			      	}
				}); //console.log("Cargaaaaaa");
			});
			$('#aniimated-thumbnials').lightGallery({
			    thumbnail:true
			});
		    console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
		});
};

AppConfig.CargarVisitas= function() {
		AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
	  	AppConfig.socketDataAdmin.emit('GetUnicaGesVisita',  {id_gestion : IdGestion}, function(message){				//console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
			console.log(moment().format('h:mm:ss:SSSS')+" Visitas Ini");			//console.log("message:" + message);
			var decrypted = FuncDecrypted(message);											console.log(decrypted.datos.length); console.log(decrypted);
			if(decrypted.datos.length){
				$.each(decrypted, function () {
					$.each(this, function (name1, value1) {		console.log(name1 + '=' + value1);
						var html =	  '<div id="panel_heading_'+name1+'" class="panel-heading"></div>'+
								      '<div id="panel_body_'+name1+'" class="panel-body">'+
										  	'<div class="form-group">'+
											    '<label for="codigo_mun_vis_'+name1+'">Municipio:&nbsp;</label><label id="codigo_mun_vis_'+name1+'">&nbsp;</label>'+
										  	'</div>'+
											'<div class="form-group">'+
												'<label for="descripcion_vis_'+name1+'">Descripción:&nbsp;</label><label id="descripcion_vis_'+name1+'">&nbsp;</label>'+
											'</div>'+
											'<div class="form-group">'+
										    	'<label for="avance_porcen_'+name1+'">% de Avance:&nbsp;</label><label id="avance_porcen_'+name1+'">&nbsp;</label>'+
											'</div>'+
											'<div class="form-group">'+
										    	'<label for="valor_'+name1+'">Cantidad:&nbsp;</label><label id="valor_'+name1+'">&nbsp;</label>'+
											'</div>'+
											'<div class="form-group">'+
										    	'<label for="und_'+name1+'">Und medida:&nbsp;</label><label id="und_'+name1+'">&nbsp;</label>'+
											'</div>'+
											'<div id="aniimated-thumbnials_'+name1+'"></div>'+
											'<div id="lista_archivos_'+name1+'"></div>'+
								      '</div>';
					 	$("#panel-visitas").append(html);
						$.each(value1, function (name, value) {	console.log(name + '=' + value);
							if(name == "fecha" ) $('#panel_heading_'+name1).html("Avance "+(name1+1)+":      "+value);
							if(name == "nombre_mun" ) $('#codigo_mun_vis_'+name1).html(value);
							if(name == "descripcion" ) $('#descripcion_vis_'+name1).html(value);
							if(name == "avance_porcen" ) $('#avance_porcen_'+name1).html(value);
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
									   str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	console.log(str);
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
				$('#aniimated-thumbnials').lightGallery({
				    thumbnail:true
				});
			}else
			{
				//$("#panel-visitas").hide();
			}
		    console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión FIN");	//console.log($.fn.dataTable.isDataTable( '#TBList' ));
		});
};

AppConfig.Inicial();
AppConfig.SetNombreGestion();
AppConfig.CargarGestion();
AppConfig.CargarVisitas();


    
});