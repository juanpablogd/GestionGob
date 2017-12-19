//console.log(Config.UrlSocket); 
var appMain={
     glo:{
      geom:['cod_mpio','cod_prov'],
      geoAdmin:[],
	  motivo:'',
	  fecha:''      
    },
    info:'',
    info2:'',
    source:{
      cod_mpio:'',
      cod_prov:''
    },
    lyr:{
      cod_mpio:'',
      cod_prov:''
    },
    series:{
      cod_mpio:[],
      cod_prov:[]
    },
    categories:{
      cod_mpio:[],
      cod_prov:[]
    },
    column:{
        cod_mpio:'',
        cod_prov:''
    },
    socket:io.connect(Config.UrlSocket+'/DataAdmin'),
    colors:{
      pie:{
          '2':'#e41a1c',
          '3':'#377eb8',
          '4':'#4daf4a',
          '5':'#984ea3',
          '6':'#ff7f00',
      },
      cod_prov:['white','#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
      cod_mpio: ['white','#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'],
    },
  
    column_cod_mpio:function(){
        appMain.column.cod_mpio=Highcharts.chart('col_cod_mpio', {
            chart: {
                type: 'column',
                height: 300,
                marginTop:5,
                spacingTop: 5

            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['-'],
                labels:{
                  style: {
                      fontSize: "12px",
                      fontWeight: 'bold'
                  }
                }
            },
            credits: {
              text: 'SAGA-SECTIC',
              href: '#'
            },
            yAxis: {
              title:'Cantidad Casos',
            },
            series: [{
                name:'Cantidad Casos',
                showInLegend: false,
                 data: [ {
                    y: 0,
                    color: '#BF0B23'
                }]
            }]
        });
    },
    column_cod_prov:function(){
       appMain.column.cod_prov=Highcharts.chart('col_cod_prov', {
            chart: {
                type: 'column',
                height: 300,
                marginTop:5,
                spacingTop: 5
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['-'],
                labels:{
                  style: {
                      fontSize: "12px",
                      fontWeight: 'bold'
                  }
                }
            },
            credits: {
              text: 'SAGA-SECTIC',
              href: '#'
            },
            yAxis: {
              title:'Cantidad Casos',
            },
            series: [{
                name:'Cantidad Casos',
                showInLegend: false,
                data: [ {
                    y: 0,
                    color: '#BF0B23'
                }]

            }]
        });
    },
 
  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
         r: parseInt(result[1], 16),g: parseInt(result[2], 16),b: parseInt(result[3], 16)
    } : null;
  },
  getFuente:function(resolution,n,key){
    if(key=='cod_mpio'){
    	if(resolution <= 160) {
	      fuente = (10+n)+'px Calibri,sans-serif';
	    }else if(resolution > 160 && resolution <= 300){
	      fuente = (9+n)+'px Calibri,sans-serif';
	    }else if(resolution > 300 && resolution <= 320){
	      fuente = (8+n)+'px Calibri,sans-serif';
	    }else {
	      fuente = '0px Calibri,sans-serif';
	    }
    }else{
    	if(resolution <= 160) {
	      fuente = (12+n)+'px Calibri,sans-serif';
	    }else if(resolution > 160 && resolution <= 300){
	      fuente = (11+n)+'px Calibri,sans-serif';
	    }else if(resolution > 300 && resolution <= 320){
	      fuente = (10+n)+'px Calibri,sans-serif';
	    }else {
	      fuente = (8+n)+'px Calibri,sans-serif';
	    }
    }
	    
    return fuente;

  },
  styleFunction:{
    cod_prov:function(feature,resolution) { //console.log(feature);
      var sty=appMain.styleFunction.main(feature,resolution,'cod_prov','cuenta');
      return sty;
    },
    cod_mpio:function(feature,resolution) {
      var sty=appMain.styleFunction.main(feature,resolution,'cod_mpio','cuenta');
      return sty;
    },
    main:function(feature,resolution,key,dat) {
	    var prop=feature.getProperties();
	    var texto = feature.get('n')+'\n'+ ((feature.get(dat)> 0) ? feature.get(dat):"");
	    var fuente=appMain.getFuente(resolution,0,key);
	    var stroke='black',width=0.5;
	   
	    var rgb=appMain.hexToRgb(prop.fill);
	  
	    if(prop.cuenta==0){
	      rgb={
	          r:250,
	          g:250,
	          b:250
	      }
	    }
	       
	    return new ol.style.Style({
	          stroke: new ol.style.Stroke({
	            color: stroke,
	            width: width
	          }),
	          fill: new ol.style.Fill({
	            color: "rgba("+rgb.r+","+rgb.g+","+rgb.b+",1)"            
	          }),
	          text: new ol.style.Text({
	            font: fuente,
	            text: texto,
	            fill: new ol.style.Fill({
	              color: '#000'
	            }),
	            stroke: new ol.style.Stroke({
	              color: 'white',
	              width: 4
	            })
	          })
	
	
	     });
    }
  },
  AutoDisplayLeyend:function(c,key){
      var leyend=document.getElementById('labels'+key);
      var labels=[];
      for(var i=0;i<c.symbols.length;i++){
          labels.push('<div>'+numeral(c.symbols[i].from).format('0,0').replace(',','.')+' - '+numeral(c.symbols[i].to).format('0,0').replace(',','.')+'</div>');
      }
      leyend.innerHTML=labels.join('');
      var leyend=document.getElementById('symbols'+key);
      var labels=[];
      for(var i=0;i<c.symbols.length;i++){
        if(c.symbols[i].to>0){
          labels.push('<div class="symbolBox" style="background-color:'+c.symbols[i].color+'"></div>');
        }
      }
      leyend.innerHTML=labels.join('');
  },
  displayFeatureInfo:function(pixel,key) {
        var info='',pesos='';
        if(key=='cod_mpio'){
        	info='info2';	
        }else{
        	info='info';
        }
        
        
        appMain[info].css({
          left: pixel[0] + 'px',
          top: (pixel[1] +15) + 'px'
        });
        var feature = AppMap[key].forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });
        if (feature) {
          appMain[info].tooltip('hide')
              .attr('data-original-title', feature.get('n')+'<br>'+pesos+numeral(feature.get('cuenta')).format('0,0').replace(',','.'))
              .tooltip('fixTitle')
              .tooltip('show');
        } else {
          appMain[info].tooltip('hide');
        }
  },
  geoTooltip:function(){
    appMain.info = $('#info');
    appMain.info2 = $('#info2');
    appMain.info.tooltip({animation: false, trigger: 'manual',html:true});
    appMain.info2.tooltip({animation: false, trigger: 'manual',html:true});
    /* AppMap.cod_prov.on('pointermove', function(evt) {
    	appMain.displayFeatureInfo(AppMap.cod_mpio.getEventPixel(evt.originalEvent),'cod_mpio');
        appMain.displayFeatureInfo(AppMap.cod_prov.getEventPixel(evt.originalEvent),'cod_prov');
    }); */
    AppMap.cod_mpio.on('pointermove', function(evt) {
        appMain.displayFeatureInfo(AppMap.cod_mpio.getEventPixel(evt.originalEvent),'cod_mpio');
        //appMain.displayFeatureInfo(AppMap.cod_prov.getEventPixel(evt.originalEvent),'cod_prov');
    });
    AppMap.cod_mpio.on('click', function(evt) {appMain.displayFeatureInfo(evt.pixel,'cod_mpio');});
    //AppMap.cod_prov.on('click', function(evt) {appMain.displayFeatureInfo(evt.pixel,'cod_prov');});
  },
  GetGeo:function(){
    //console.log("Ingresa a geo");
    appMain.socket.emit('GetGeom',"data",function(data){
        //console.log('retorna Geo');
        $.each( appMain.glo.geom, function( i, val ){
            var geo =Func.Decrypted(data[val]);
            appMain.glo.geoAdmin[val]=topojson.feature(geo, geo.objects.collection);
        });
        console.log(appMain.glo.geoAdmin);
        appMain.asigDataGeo();
    });
  },
 
  updateFecha:function(fecha){
  	if(appMain.glo.fecha==''){
	  	$('#fechaDatosMin').data('DateTimePicker').minDate(moment(fecha.min,'YYYY-MM-DD'));
	    $('#fechaDatosMin').data('DateTimePicker').maxDate(moment(fecha.max,'YYYY-MM-DD'));
		
		$('#fechaDatosMax').data('DateTimePicker').minDate(moment(fecha.min,'YYYY-MM-DD'));
	    $('#fechaDatosMax').data('DateTimePicker').maxDate(moment(fecha.max,'YYYY-MM-DD'));
	        
	    $('#fechaDatosMin').data('DateTimePicker').date(moment(fecha.min,'YYYY-MM-DD'));
	    $('#fechaDatosMax').data('DateTimePicker').date(moment(fecha.max,'YYYY-MM-DD'));
	    
	    appMain.glo.fecha=fecha;
    }
  },
  updateMotivo:function(motivo){
  	if(appMain.glo.motivo==''){
		$("#selMotivo").empty().append('<option value="all">--Todos--</option>');
	    $.each(motivo, function( index, value ) {
		  $("#selMotivo").append('<option value="'+value.motivo_final+'">'+value.descripcion+'</option>');
		});
		appMain.glo.motivo=motivo;
	}
  },
  getParametros:function(){ 
  	var data={}
    data.idFuentes=appMain['idFuente'];
    data.id_tipo=appMain['id_tipoc'];
    data.id_subtipo=appMain['id_subtipoc'];
  	data.semaforo=$("#semaforo").val();
  	data.fechaDatosMin=$('#fechaDatosMin').data('DateTimePicker').date();
  	data.fechaDatosMax=$('#fechaDatosMax').data('DateTimePicker').date();
  	return data;
  },
  getData:function(){
    var data=appMain.getParametros();
    console.log("Ingresa a getDash");
    console.log(data);
    appMain.socket.emit('getDash',data,function(dataEnc){
      console.log("devuelve a getDash");  
      console.log(dataEnc);
      var data=Func.Decrypted(dataEnc);
      console.log(data);
      waitingDialog.hide();
      if(appMain.lyr['cod_prov']){
      	AppMap['cod_prov'].removeLayer(appMain.lyr['cod_prov']);	
      }
      if(appMain.lyr['cod_prov']){
      	AppMap['cod_mpio'].removeLayer(appMain.lyr['cod_mpio']);	
      }
      
      //appMain.updateFecha(data['fecha'][0]);
      //appMain.updateMotivo(data['motivo']);
      appMain.asigData('cod_mpio',data['cod_mpio']);
      appMain.asigData('cod_prov',data['cod_prov']);
      $("#CantTotal").empty().append(data["total"][0].cuenta);
      
    });
  },
  asigDataGeo:function(){
      appMain.getData();
  },
  asigData:function(key,data){
        console.log(data);
        var sum=[],cont=[];
       $.each(appMain.glo.geoAdmin[key].features, function( index, value ) {
          //console.log(index);
          //console.log(value);
          appMain.glo.geoAdmin[key].features[index].properties.cuenta=0;
          var as=$(data).filter(function (i,n){return n[key]===value.properties.id});
          //console.log(as);
          if(as.length==1)  {
            appMain.glo.geoAdmin[key].features[index].properties.cuenta=as[0].cuenta;
            cont.push(as[0].cuenta);
          }
        });
        cont=Func.uniques(cont);
        appMain.crearGeo(key,'cuenta',cont.length);
  },
  zoomMap:function(feature){
          console.log("inggresa");
          var cor=feature.getGeometry().getExtent();
          var x=(cor[0]+cor[2])/2;
          var y=(cor[1]+cor[3])/2;
          appMain.info2.tooltip('hide');
          appMain.info.tooltip('hide');
          Func.flyTo([x,y], function() {});
          setTimeout(function(){
            AppMap.view.animate({zoom: 8}, {center: AppMap.center});
            setTimeout(function(){
              var pixel=AppMap.suma.getPixelFromCoordinate([x,y]);
            
            }, 3500);
          }, 11000);
  },
  crearGeo:function(key,tipoGroup,l){
      console.log(key);
      console.log(tipoGroup);
      var numberOfBreaks = 1;
      if(l>6)numberOfBreaks = 6  ;  
      else numberOfBreaks = l;
	  //geoJenks = geocolor.equalIntervals(appMain.glo.geoAdmin[key], tipoGroup, numberOfBreaks, appMain.colors[tipoGroup]);
	  geoJenks = geocolor.jenks(appMain.glo.geoAdmin[key], tipoGroup, numberOfBreaks, appMain.colors[key]);
	  appMain.AutoDisplayLeyend(geoJenks.legend,key);  
	  
      
      console.log(geoJenks);
      
      appMain.source[key]=new ol.source.Vector({
          features: (new ol.format.GeoJSON()).readFeatures(geoJenks)
      });
      var temp_json=[]
      appMain.source[key].forEachFeature(function(feature){
        var prop=feature.getProperties();
        if(prop[tipoGroup]>0){
          temp_json.push({y: prop[tipoGroup],color: prop.fill,categories:prop.n});   
        }
      });
      Func.sorting(temp_json, 'y');

      appMain.categories[key]=[];
      appMain.series[key]=[];
      var i=0; 
      $.each(temp_json, function( index, value ) {
        i++;
        if(i<21){
          appMain.categories[key].push(value.categories); 
          appMain.series[key].push({y: value.y,color: value.color});     
        }
      });
      var altura=$( window ).height();
      var ancho=$( window ).width();
      altura=altura-450;
      var GrafAltura=0;
      if(ancho<1025){
      	GrafAltura=400;
      }else{
      	GrafAltura= altura-200;
      }
	  appMain.column[key].update({
        chart: {
              height: GrafAltura
        },
        xAxis: {
          categories:appMain.categories[key]
        },
        series:{
          data:appMain.series[key]
        }
      });
      
      appMain.lyr[key]= new ol.layer.Vector({
          source: appMain.source[key],
          style: appMain.styleFunction[key]
      });
     console.log("paso");
     AppMap[key].addLayer(appMain.lyr[key]);
     console.log("paso2");
   
  },
  eventJquery:function(){
  	$("#btonBuscar").click(function() {
    		waitingDialog.show();
    		appMain.getData();
  	});
  },
  graficaTipo:function(){
      Highcharts.chart('container', {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: ''
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: false,
                      format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                      style: {
                          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                      }
                  },
                  showInLegend: true
              }
          },
          series: [{
              name: 'Brands',
              colorByPoint: true,
              data: [{
                  name: 'Acueducto',
                  y: 56.33
              }, {
                  name: 'Alcantarillado',
                  y: 24.03,
                  sliced: true,
                  selected: true
              }, {
                  name: 'Agua para la Vereda',
                  y: 10.38
              }, {
                  name: 'Compactadores',
                  y: 5.88
              }]
          }]
      });
  },
  CargaFuentes:function() {  
      appMain.socket.emit('GetListFuentes', null, function(message){     //console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
      console.log(moment().format('h:mm:ss:SSSS')+" Listado Fuentes");        //console.log("message:" + message);
      var decrypted = Func.Decrypted(message);                   //console.log(decrypted[0].value);
      if(decrypted[0].value == ""){
        decrypted.shift();
      }   console.log(decrypted);
      appMain["ListadoFuentes"]=decrypted;
      $('#idFte').multiselect('dataprovider', appMain["ListadoFuentes"]);
        console.log(moment().format('h:mm:ss:SSSS')+" FIN");
    });
  },
  cargaTipos:function() {
    var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());  console.log(Func.GetCentrosG().join());
      appMain.socket.emit('getlistaTiposParam', {id_centrog : id_centroges}, function(message){
      console.log(moment().format('h:mm:ss:SSSS')+" Listado Tipos");        //console.log("message:" + message);
      var decrypted = Func.Decrypted(message);                   //console.log(message);                 
      if(decrypted[0].label == " -- Seleccione --"){
        decrypted[0].label = " Todos ";
      }   console.log(decrypted);
      appMain["listadoTipos"]=decrypted;                      
      $('#sel_id_tipoc').multiselect('dataprovider', appMain["listadoTipos"]);
        console.log(moment().format('h:mm:ss:SSSS')+" FIN");
    });
  },
  cargaSubtipos:function(id_tipoc) {
      appMain.socket.emit('getlistaSubtiposParam', {id_tipoc : id_tipoc}, function(message){
        console.log(moment().format('h:mm:ss:SSSS')+" Listado SUB Tipos");        //console.log("message:" + message);
        var decrypted = Func.Decrypted(message);                   //console.log(message);                 
        if(decrypted[0].label == " -- Seleccione --"){
          decrypted[0].label = " Todos ";
        }   console.log(decrypted);
        appMain["listadoSubtipos"]=decrypted;                     
        $('#sel_id_subtipoc').multiselect('dataprovider', appMain["listadoSubtipos"]);
        console.log(moment().format('h:mm:ss:SSSS')+" FIN");
      });
  },
  iniSelects:function(){
    /* SELECT - CENTRO GESTOR */
    $('#idFte').multiselect({
              enableClickableOptGroups: true,
              enableCollapsibleOptGroups: true,
              enableFiltering: true,
              includeSelectAllOption: true,
              enableCaseInsensitiveFiltering: true,
              onChange: function(option, checked, select) { //  console.log("onChange");
                appMain['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get(); //console.log(AppConfig['id_centrog']);
              },
              onSelectAll: function(checked) {        //  console.log("onSelectAll");
                appMain['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get(); //console.log(AppConfig['id_centrog']);
            },
              onDeselectAll: function(checked) {        //  console.log("onDeselectAll");
                appMain['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get(); //console.log(AppConfig['id_centrog']);
            }
    });
    /* SELECT - TIPO */
    $('#sel_id_tipoc').multiselect({
              enableClickableOptGroups: true,
              enableCollapsibleOptGroups: true,
              enableFiltering: true,
              enableCaseInsensitiveFiltering: true,
              onChange: function(option, checked, select) {
                var options = []; appMain['id_subtipoc'] = [''];
                $('#sel_id_subtipoc').multiselect('dataprovider', options);
    
                appMain['id_tipoc'] = $('#sel_id_tipoc option:selected').map(function(a, item){return item.value;}).get();  //console.log('onChange: '+AppConfig['id_convenio']); //console.log(AppConfig['id_tipoc'][0]);
                if(appMain['id_tipoc'][0] != "") appMain.cargaSubtipos(appMain['id_tipoc'][0]);
              },
              onSelectAll: function(checked) {
                appMain['id_tipoc'] = $('#sel_id_tipoc option:selected').map(function(a, item){return item.value;}).get();  //console.log(AppConfig['id_convenio']);
            },
              onDeselectAll: function(checked) {
                appMain['id_tipoc'] = $('#sel_id_tipoc option:selected').map(function(a, item){return item.value;}).get();  //console.log(AppConfig['id_convenio']);
            }
    });
    /* SELECT - SUBTIPO */
    $('#sel_id_subtipoc').multiselect({
              enableClickableOptGroups: true,
              enableCollapsibleOptGroups: true,
              enableFiltering: true,
              enableCaseInsensitiveFiltering: true,
              onChange: function(option, checked, select) {   //console.log("cambia subTIPO");
                appMain['id_subtipoc'] = $('#sel_id_subtipoc option:selected').map(function(a, item){return item.value;}).get();  //console.log('onChange: '+AppConfig['id_convenio']);
              },
              onSelectAll: function(checked) {
                appMain['id_subtipoc'] = $('#sel_id_subtipoc option:selected').map(function(a, item){return item.value;}).get();  //console.log(AppConfig['id_convenio']);
            },
              onDeselectAll: function(checked) {
                appMain['id_subtipoc'] = $('#sel_id_subtipoc option:selected').map(function(a, item){return item.value;}).get();  //console.log(AppConfig['id_convenio']);
            }
    });
  },
  IniMain:function(){
      waitingDialog.show();
      
      // this.column_cod_prov();
      this.column_cod_mpio();
      appMain.eventJquery();
      AppMap.cod_mpio=AppMap.Initcod_mpio();
      //AppMap.cod_prov=AppMap.Initcod_prov();
      appMain.CargaFuentes();
      appMain.cargaTipos();
      appMain.GetGeo();
      appMain.geoTooltip();
      appMain.graficaTipo();
      appMain.iniSelects();
  }
};

appMain.IniMain();

