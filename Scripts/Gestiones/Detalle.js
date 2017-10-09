$(document).ready(function() {

	var IdGestion = Func.GetIdGestion();
	console.log(IdGestion);
	if(IdGestion == "")	window.location.href = 'index.html';

	AppConfig.graficaOpciones = {
	          chart: {
	              type: 'solidgauge'
	          },
	          title: null,
	          pane: {
	              center: ['50%', '85%'],
	              size: '140%',
	              startAngle: -90,
	              endAngle: 90,
	              background: {
	                  backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
	                  innerRadius: '60%',
	                  outerRadius: '100%',
	                  shape: 'arc'
	              }
	          },
	          tooltip: {
	              enabled: false
	          },
	    // the value axis
	    yAxis: {
	        lineWidth: 0,
	        minorTickInterval: null,
	        tickAmount: 2,
	        title: {
	            y: -70
	        },
	        labels: {
	            y: 16
	        }
    	},credits: {
	              text: '',
	              href: '#'
	          },
	          plotOptions: {
	              solidgauge: {
	                  dataLabels: {
	                      y: 5,
	                      borderWidth: 0,
	                      useHTML: true
	                  }
	              }
	          }
	    
    };
   	AppConfig.gavance = Highcharts.chart('container-porcentaje',Highcharts.merge( 
      AppConfig.graficaOpciones,{
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: '% de Avance',
                y: 10
            }
        },
        series: [{
            name: '% de Avance ',
            data: [0],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: ' % '
            }
        }]
      })
    );
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
						}else if(name=="avance_porcentaje"){	console.log(name + '=' + value);
							AppConfig.gavance.update({
							       series:{
							          data:[
							              {
							                y: value,
							                color: AppConfig.getColor(value)
							              }
							          ]
							        }
							      });
						}else if(name=="url"){		//console.log(name + '=' + value);
								var str = value;
								if(str==null){	
									$("#panel-archivos").hide();
								}else{
									var str_array = str.split(',');
									for(var i = 0; i < str_array.length; i++) {
									   str = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");	console.log(str);
									   var datafile = str.split('@');	//console.log(datafile[1].substring(0, 5));
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
			      	if(value1.enlace_secop.length==0 && (value1.fte_nacional=="$0" || value1.fte_nacional==null) && (value1.fte_depto=="$0" || value1.fte_depto==null)  && (value1.fte_mpio=="$0" || value1.fte_mpio==null) && (value1.fte_sgp=="$0" || value1.fte_sgp==null) && (value1.fte_regalias=="$0" || value1.fte_regalias==null) && (value1.fte_otros=="$0" || value1.fte_otros==null)){ console.log("Contrae Panel");
			      		$("#contrato-span").addClass("panel-collapsed");
			      		$("#contrato-panel-body").hide();
			      		$("#contrato-icon").removeClass("glyphicon-chevron-up");
			      		$("#contrato-icon").addClass("glyphicon-chevron-down");
			      	}
				}); //console.log("Cargaaaaaa");
			});	console.log("lightGallery");
			$('#aniimated-thumbnials').lightGallery({
			    thumbnail:true
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
					 	$("#panel-visitas").append(html);	//console.log(eliminar);
						$.each(value1, function (name, value) {	//console.log(name + '=' + value);
							if(name == "fecha" ) $('#panel_heading_'+name1).html("Avance "+(name1+1)+":      "+value+"      "+eliminar);
							if(name == "nombre_mun" ) $('#codigo_mun_vis_'+name1).html(value);
							if(name == "descripcion" ) $('#descripcion_vis_'+name1).html(value);
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
AppConfig.SetNombreGestion();
AppConfig.CargarGestion();
AppConfig.CargarVisitas();


    
});
