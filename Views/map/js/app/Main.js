$(document).ready(function() {
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
        parametros:{cod_mpio},
        chart:null,
        socket:io.connect(AppConfig.UrlSocketApp+'/DataAdmin'),
        colors:{
          pie:{
              '2':'#e41a1c',
              '3':'#377eb8',
              '4':'#4daf4a',
              '5':'#984ea3',
              '6':'#ff7f00',
          },
          cod_prov:['white','#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
          cod_mpio: ['white','#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026','rgba(107,6,1,1)'],
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
          var stroke='#319FD3',width=1;
         
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
                  })
                  /*,
                  stroke: new ol.style.Stroke({
                    color: 'white',
                    width: 4
                  })*/
                })
      
      
           });
        }
      },
      AutoDisplayLeyend:function(c,key){
          var leyend=document.getElementById('labels'+key);
          var labels=[];
          let total = c.length;
          labels.push('<div> < 1</div>')
          for(var i=0;i<total;i++){  //console.log(c.length + " " +i);
            if(total==(i+1)){
              labels.push('<div> > '+numeral(c[i]).format('0,0').replace(',','.')+'</div>')
            }else labels.push('<div>'+numeral(c[i]).format('0,0').replace(',','.')+' - '+numeral(c[i+1]).format('0,0').replace(',','.')+'</div>');
          }
          leyend.innerHTML=labels.join('');
          var leyend=document.getElementById('symbols'+key);
          var labels=[];
          labels.push('<div class="symbolBox" style="background-color:white"></div>');
          for(var i=0;i<total;i++){ //console.log(total + " " +i);
              labels.push('<div class="symbolBox" style="background-color:'+appMain.colors[key][i+1]+'"></div>');
          }
          leyend.innerHTML=labels.join('');
      },
      displayFeatureInfo:function(pixel,key) { //console.log(pixel);
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
        AppMap.cod_mpio.on('click', function(e) {
    /*        var id_centrog = AppConfig['id_centrog'];   //console.log(id_centrog);
            (id_centrog !== undefined)? id_centrog = id_centrog.join() : id_centrog = ''; //console.log("id_centrog: "+id_centrog);
            var cod_meta = AppConfig['cod_meta'];       
            (cod_meta !== undefined)? cod_meta = cod_meta.join() : cod_meta = ''; */
            var pixel = e.pixel;
              AppMap.cod_mpio.forEachFeatureAtPixel(pixel, function(feature, layer) { console.log(feature.values_);
                var data = appMain.getParametros(); //console.log(data);
                appMain.parametros.cod_mpio = feature.values_.id;
                data.cod_mpio = feature.values_.id;
                data.nom_mpio = feature.values_.n;
                //localStorage.setItem(ps, Func.Ecrypted(data));    //localStorage.ps = Func.Ecrypted(data);
                localStorage["ps"] = Func.Ecrypted(data);   console.log(data);  //console.log(localStorage.ps);
                if(feature.values_.cuenta == 0){
                  Func.MsjAvisoTop("No se encontraron datos en "+data.nom_mpio);
                }else{
                  $("#CantTotal").empty().append(feature.values_.cuenta);
                  appMain.getDatagrafica(data,feature.values_.n,feature.values_.cuenta);  
                }
              }); 
          //appMain.displayFeatureInfo(evt.pixel,'cod_mpio');
        });
        //console.log("geoTooltip");
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
            //console.log(appMain.glo.geoAdmin);
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
        var data={};
        var codObra = numeral($("#cod_obra").val());  //console.log(codObra.value());
        data.cod_obra=codObra.value();
        data.qid_centro=appMain['qid_centro'];
        data.idFuentes=appMain['idFuente'];
        data.id_clasificacion=appMain['id_clasificacion'];
        data.id_tipo=appMain['id_tipoc'];
        data.id_subtipo=appMain['id_subtipoc'];
        data.semaforo=$("#semaforo").val();  //console.log($('#fechaDatosMin').data('DateTimePicker'));
        if($('#fechaDatosMin').data('DateTimePicker') != undefined){
          data.fechaDatosMin=$('#fechaDatosMin').data('DateTimePicker').date();
          data.fechaDatosMax=$('#fechaDatosMax').data('DateTimePicker').date();      
        }
        return data;
      },
      getData:function(){
        appMain.parametros.cod_mpio = "";
        var data=appMain.getParametros();
        data.cod_mun = "";  console.log(data);
        appMain.parametros.cod_mpio = "";
        localStorage.ps = Func.Ecrypted(data);  //console.log("Ingresa a getDash"); //console.log(data);
        //Consulta datos de Gráfica
        appMain.getDatagrafica(data,"Cundinamarca",""); 
        //Consulta datos de Mapa
        appMain.socket.emit('getDash',data,function(dataEnc){
          console.log("devuelve a getDash");  //console.log(dataEnc);

          if(appMain.lyr['cod_prov']){
            AppMap['cod_prov'].removeLayer(appMain.lyr['cod_prov']);  
          }
          if(appMain.lyr['cod_mpio']){
            AppMap['cod_mpio'].removeLayer(appMain.lyr['cod_mpio']);  
          }
          waitingDialog.hide();

          if(dataEnc!=undefined){
            $("#col_cod_mpio").show();
            $("#container").show();
            //$("#PanelLeyendacod_mpio").show();
            var data=Func.Decrypted(dataEnc);   //console.log(data);
            appMain.asigData('cod_mpio',data['cod_mpio']);
            $("#CantTotal").empty().append(data["total"][0].cuenta);
          }else{
            $("#col_cod_mpio").hide();
            $("#container").hide();
            //$("#PanelLeyendacod_mpio").hide();
            Func.MsjAvisoTop("No se encontraron datos!");
            $("#CantTotal").empty().append("0");
          }
          $("#PanelLeyendacod_mpio").hide();
        });
      },
      listaContratos:function(){ console.log("listaContratos");
        $.fancybox.open({
          type: "html",
          src: '<table id="example" class="display" style="width:100%">'+
                        '<thead>'+
                            '<tr>'+
                                '<th>Cod obra</th>'+
                                '<th>Contrato</th>'+
                                '<th>Clasificación</th>'+
                                '<th>Municipio</th>'+
                                '<th>Fecha</th>'+
                                '<th>Descripcion</th>'+
                                '<th>Valor</th>'+
                                '<th>Avance</th>'+
                                '<th>Centro</th>'+
                                '<th>Ver más</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tfoot>'+
                            '<tr>'+
                                '<th>Cod obra</th>'+
                                '<th>Contrato</th>'+
                                '<th>Clasificación</th>'+
                                '<th>Municipio</th>'+
                                '<th>Fecha</th>'+
                                '<th>Descripcion</th>'+
                                '<th>Valor</th>'+
                                '<th>Avance</th>'+
                                '<th>Centro</th>'+
                                '<th>Ver más</th>'+
                            '</tr>'+
                        '</tfoot>'+
                '</table>',
          opts: {
            animationDuration: 110,
            touch:false,
            animationEffect: "material",
            afterLoad: function(instance, current, e) {
 console.log("afterLoad");   //console.log(JSON.stringify(AppMap.param));
                    $("#example").parent().css( "width", "98%" ).css( "height", "98%" ).css( "max-width", "98%" ).css( "max-height", "98%" ).css( "margin", "0" );
                    var total;
                    var data = appMain.getParametros();
                    var table = $('#example').DataTable( {
                        "processing": true,
                        "serverSide": true,
                        "fixedHeader": true,
                        "lengthMenu": [[5, 10], [5, 10]],
                        "order": [[ 8, "desc" ]],
                        "pageLength": 10,
                        "scrollX": true,
                        //"order": [[ 9, 'desc' ]],
                        "dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>',
                        "ajax": {
                            url: "../../Services/server_processing.php?f="+JSON.stringify(data),
                            dataSrc: function ( data ) { //console.log(data);
                               total = data.total;
                               return data.data;
                             } 
                        },
                        "columns": [
                            { "data": "id" },
                            { "data": "nro_con" },
                            { "data": "nom_clasificacion" },
                            { "data": "municipio" },
                            { "data": "fecha" },
                            { "data": "descripcion",
                                "render": function ( data, type, row ) {
                                    var conCat = data;    //console.log(data);
                                    if (data=='80') conCat = data+'...';
                                    return conCat;
                            } },
                            { "data": "vr_total","className": "dt-body-right" },
                            { "data": "avance_porcentaje","className": "dt-body-right" },
                            { "data": "centro" },
                            { "data": null,"defaultContent": '<i class="fa fa-list-alt" aria-hidden="true"></i>',"className": "dt-body-center",
                            },
                        ],
                        "language": {   //<i class="fas fa-cog fa-spin"></i>
                            processing: '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>  Procesando',
                                "sLengthMenu":     "Mostrar _MENU_ registros",
                            "sZeroRecords":    "No se encontraron resultados",
                            "sEmptyTable":     "Ningún dato disponible en esta tabla",
                            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                            "sInfoFiltered":   "",
                            "sInfoPostFix":    "",
                            "sSearch":         "Buscar:",
                            "sUrl":            "",
                            "sInfoThousands":  ",",
                            "sLoadingRecords": "Cargando...",
                            "oPaginate": {
                                "sFirst":    "Primero",
                                "sLast":     "Último",
                                "sNext":     "Siguiente",
                                "sPrevious": "Anterior"
                            },
                            "oAria": {
                                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                            }
                        },
                        "footerCallback": function ( row, data, start, end, display ) {
                                    var api = this.api(), data;
                         
                                    // Remove the formatting to get integer data for summation
                                    var intVal = function ( i ) {
                                        return typeof i === 'string' ?
                                            i.replace(/[\$,]/g, '')*1 :
                                            typeof i === 'number' ?
                                                i : 0;
                                    };
                         
                                    // Total over this page
                                    pageTotal = api
                                        .column( 6, { page: 'current'} )
                                        .data()
                                        .reduce( function (a, b) {
                                            return intVal(a) + intVal(b);
                                        }, 0 );
                         
                                    // Update footer
                                    $( api.column( 6 ).footer() ).html(
                                        'Subtotal Pág: $'+numeral(pageTotal).format('0,0') +' <hr> Total Listado: $'+ numeral(total).format('0,0') +''
                                    );
                                },
                        "fnInitComplete": function(oSettings, json) {
                            var tHead = $("div.dataTables_scrollHeadInner").children().children();  //console.log(tHead);
                            tHead.prepend('<tr id="tblFiltro"></tr>');
                                this.api().columns().every( function () {
                                    var column = this; //console.log(column);
                                    var miHtml;
                                    var ordenCol = column[0][0];
//0=>Vigencia  1=>Mpio  2=>Sector  3=>Meta  4=>Entidad  5=>Contrato  6=>Objeto  7=>InvMpio  8=>InvDepto
//0=>CodObra  1=>Cto  2=>Clasifica  3=>Mpio  4=>Fecha  5=>Desc  6=>Vr  7=>Avance  8=>Centro  9=>Ver Más
                                    if(ordenCol==0){    //0=>CodObra
                                        miHtml = $('<td><input id="filID" class="form-control form-control-sm" type="text" placeholder="Año"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filID").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(0).search() !== valDigitado && valDigitado.length > 1 )table.column(0).search( valDigitado ).draw();
                                        })
                                    }
                                    if(ordenCol==1){    //1=>Contrato
                                        miHtml = $('<td><input id="filCto" class="form-control form-control-sm" type="text" placeholder="Año"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filCto").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(1).search() !== valDigitado && valDigitado.length > 1 )table.column(1).search( valDigitado ).draw();
                                        })
                                    } //appMain["listadoClasificacion"]
                                    if(ordenCol==2){    //console.log(appMain["listadoClasificacion"]);
                                        var todos = true;
                                        if(appMain['listadoClasificacion'].length != 0) todos = false;
                                        miHtml = $('<td><select  id="filClasifica" class="form-control"><option value=""></option></select></td>');
                                        $("#tblFiltro").append(miHtml); //console.log(AppMap.glo.dataGrafica['mpio']);
                                        for (var i = 0, len = appMain["listadoClasificacion"].length; i < len; i++) {
                                            //if(todos || jQuery.inArray(appMain["listadoClasificacion"][i].cod, AppMap.param.sector) > -1){
                                                $("#filClasifica").append('<option value="'+appMain["listadoClasificacion"][i].label+'">'+appMain["listadoClasificacion"][i].label+' </option>');
                                            //}
                                        } 
                                        $( "#filClasifica" ).change(function() {
                                            if ( table.column(2).search() !== $( this ).val() ) table.column(2).search( $( this ).val() ).draw();
                                        });
                                    }
                                    console.log(data['cod_mpio']);
                                    if(ordenCol==3){    //3=>Mpio
                                        var todos = true;
                                        miHtml = $('<td><select  id="filMpio" class="form-control"><option value=""></option></select></td>');
                                        $("#tblFiltro").append(miHtml); //console.log(AppMap.varMultiselect['vMunicipio']);
                                        //console.log(JSON.stringify(AppMap.param));
                                        /*if(AppMap.param.municipio.length != 0) todos = false;
                                        for (var i = 0, len = AppMap.varMultiselect['vMunicipio'].length; i < len; i++) {   //console.log(AppMap.varMultiselect['vMunicipio'][i]);
                                            if(AppMap.varMultiselect['vMunicipio'][i].hasOwnProperty("children")){
                                                //console.log(AppMap.varMultiselect['vMunicipio'][i]);
                                                for (var j = 0, lon = AppMap.varMultiselect['vMunicipio'][i]['children'].length; j < lon; j++){
                                                    if(todos || jQuery.inArray(AppMap.varMultiselect['vMunicipio'][i]['children'][j].value, AppMap.param.municipio) > -1){
                                                        $("#filMpio").append('<option value="'+AppMap.varMultiselect['vMunicipio'][i]['children'][j].label+'">'+AppMap.varMultiselect['vMunicipio'][i].label+" - "+AppMap.varMultiselect['vMunicipio'][i]['children'][j].label+'</option>');
                                                    }
                                                }
                                            }else{
                                                if(todos || jQuery.inArray(AppMap.varMultiselect['vMunicipio'][i].value, AppMap.param.municipio) > -1){
                                                    $("#filMpio").append('<option value="'+AppMap.varMultiselect['vMunicipio'][i].label+'">'+AppMap.varMultiselect['vMunicipio'][i].label+'</option>');
                                                }
                                            }
                                        }*/
                                        $( "#filMpio" ).change(function() {
                                            if ( table.column(3).search() !== $( this ).val() ) table.column(3).search( $( this ).val() ).draw();
                                        });
                                    }
//0=>CodObra  1=>Cto  2=>Clasifica  3=>Mpio  4=>Fecha  5=>Desc  6=>Vr  7=>Avance  8=>Centro  9=>Ver Más
                                    if(ordenCol==4){  //4=>Fecha
                                        var todos = true;   //console.log(AppMap.param.meta.length);
                                        miHtml = $('<td><input id="filFecha" class="form-control form-control-sm" type="text" placeholder="Fecha"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filFecha").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(4).search() !== valDigitado && valDigitado.length > 1 )table.column(4).search( valDigitado ).draw();
                                        })
                                    }
                                    if(ordenCol==5){    //5=>Descripción
                                        var todos = true;   //console.log(AppMap.param.meta.length);
                                        miHtml = $('<td><input id="filDescripcion" class="form-control form-control-sm" type="text" placeholder="Fecha"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filDescripcion").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(5).search() !== valDigitado && valDigitado.length > 1 )table.column(5).search( valDigitado ).draw();
                                        })
                                    }
                                    if(ordenCol==6){    //6=>Valor
                                        miHtml = $('<td><input id="filValor" class="form-control form-control-sm" type="text" placeholder="Inversión Departamento"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filValor").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(6).search() !== this.value && (valDigitado.length > 3 || valDigitado.length ==0))table.column(6).search( valDigitado ).draw();
                                        })
                                    }
                                    if(ordenCol==7){    //7=>Avance
                                        miHtml = $('<td><input id="filAvance" class="form-control form-control-sm" type="text" placeholder="Inversión Departamento"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filAvance").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(7).search() !== this.value && (valDigitado.length > 3 || valDigitado.length ==0))table.column(7).search( valDigitado ).draw();
                                        })
                                    }
                                    if(ordenCol==8){    //7=>Avance
                                        miHtml = $('<td><input id="filCentro" class="form-control form-control-sm" type="text" placeholder="Inversión Departamento"></td>');
                                        $("#tblFiltro").append(miHtml);
                                        $("#filCentro").on( 'keyup change', function () { console.log("keyup change:"+this.value);
                                            var valDigitado = this.value;
                                            if ( table.column(8).search() !== this.value && (valDigitado.length > 3 || valDigitado.length ==0))table.column(8).search( valDigitado ).draw();
                                        })
                                    }
                                    
                                } ); 
                            $('#example tbody').on( 'click', 'tr', function () { console.log(this);
                                var idRow = $(this).attr('id');
                                var arRow = idRow.split("_");
                                var idRegistro = arRow[1];  console.log(idRegistro);
                                var tblVigencia=$(this).find("td:eq(0)").text();
                                var tblMunicipio=$(this).find("td:eq(1)").text(); 
                                var txtInvMpio = 'Inversión del Departamento en el Municipio';
                                var txtFacturacion = 'Facturado Contrato, asociado a la meta para ('+tblMunicipio+')';
                                if (tblMunicipio == "CUNDINAMARCA"){
                                    tblMunicipio  = "Inversión global para Cundinamarca";    
                                    txtInvMpio = 'Inversión global en Cundinamarca';
                                }else if(tblMunicipio == "CENTRO ADMINISTRATIVO"){
                                    tblMunicipio  = "Fortalecimiento Institucional (Centro Administrativo)";
                                    txtInvMpio = 'Inversión Fortalecimiento Institucional (Centro Administrativo)';
                                }
                                
                                var tblSector=$(this).find("td:eq(2)").text();
                                var tblMeta=$(this).find("td:eq(3)").text();
                                var tblEntidad=$(this).find("td:eq(4)").text();
                                var tblContato=$(this).find("td:eq(5)").text();
                                var tblInvdepto=$(this).find("td:eq(7)").text();
                                var tblInvmpio=$(this).find("td:eq(8)").text();

                                //LLama detalle de contrato
                                $.ajax({url: "../../Services/getContrato.php?id="+idRegistro, 
                                    success : function(result){ /*     //console.log(result);
                                        var dataCto = JSON.parse(result);      //console.log(vEntidad);
                                        var facturacion = numeral(dataCto[0].fact_meta).format('0,0');
                                        var fechaRegistro = moment(dataCto[0].fecha_registro, "YYYYMMDD").format('DD/MM/YYYY');
                                        var nomMeta = dataCto[0].nombre.split('-');
                                        var tiProyecto = dataCto[0].tipo_proy;
                                        if(tiProyecto==null) tiProyecto = "No disponible";
                                        if (dataCto != null && dataCto != ""){  console.log(tblContato);
                                            var ctoTransferencia = '<tr><td><b>Contrato</b></td><td> '+tblContato+' </td></tr>';
                                            var txtEspacio =  '<tr><td><b>Ubicación</b></td><td> '+tblMunicipio+' </td></tr>';
                                            var txtObjeto = '<tr><td><b>Objeto</b></td><td>'+dataCto[0].obj_contrato_todo+'</td></tr>';
                                            var txtFecharegistro = '<tr><td><b>Fecha de Registro (dd/mm/aaaa)</b></td><td>'+fechaRegistro+'</td></tr>';
                                            var txtPlazoejecucion = '<tr><td><b>Plazo de ejecución</b></td><td>'+dataCto[0].plazo_ejecucion+'</td></tr>';
                                            var txtInvDptoCto = '<tr><td><b>Inversión del depto. en el contrato</b></td><td> '+tblInvdepto+'</td></tr>';
                                            var txtGeneralFac = '<tr><td><b>'+txtFacturacion+'</b></td><td>$ '+facturacion+'</td></tr>';
                                            if (tblContato == "80" || tblContato == "80..."){
                                                ctoTransferencia = '<tr><td><b>Transferencia</b></td><td>'+dataCto[0].obj_contrato_todo+'</td></tr>';  
                                                txtObjeto = '';
                                                txtFecharegistro = '';
                                                txtPlazoejecucion = '';
                                                txtInvDptoCto = '';
                                                txtGeneralFac = '';
                                            } 
                                            var lista = 
                                                '<table class="table table-bordered table-striped table-responsive">'+
                                                    '<col width="190px"><col>'+
                                                    ctoTransferencia+
                                                    txtObjeto+
                                                  '<tr><td><b>Vigencia:</b></td><td> '+tblVigencia+' </td> </tr>'+
                                                  txtFecharegistro+
                                                  txtPlazoejecucion+
                                                  txtInvDptoCto+
                                                  txtEspacio+
                                                  '<tr><td><b>'+txtInvMpio+'</b></td><td> '+tblInvmpio+'</td></tr>'+
                                                  '<tr><td><b>Entidad</b></td><td>'+tblEntidad+'</td></tr>'+
                                                  '<tr><td><b>Sector</b></td><td> '+tblSector+' </td></tr>'+
                                                  '<tr><td><b>Tipo de proyecto</b></td><td> '+tiProyecto+'</td></tr>'+
                                                  '<tr><td><b>Meta</b></td><td>'+tblMeta+' '+nomMeta[1]+'</td></tr>'+
                                                  txtGeneralFac+
                                                '</table>';

                                            //lista = '<table class="table"><thead><tr><th>Firstname</th><th>Lastname</th><th>Email</th></tr></thead><tbody><tr><td>John</td><td>Doe</td><td>john@example.com</td></tr><tr><td>Mary</td><td>Moe</td><td>mary@example.com</td></tr><tr><td>July</td><td>Dooley</td><td>july@example.com</td></tr></tbody></table>';
                                            // ABRE VENTANA DE DETALLE
                                            $.fancybox.open({
                                              type: "html",
                                              autoSize : false,
                                              src:
                                                '<div style="display: none;" id="animatedModal" class="animated-modal" >'+
                                                    lista+
                                                "</div>",
                                            });
                                        } */
                                    }
                                });

                            } );
                            //SI es del mapa
                            //if(mapa) AppMap.param.municipio = AppMap.tmp['municipio'];
                            //console.log(AppMap.param.municipio);
                        }
                    } );

            }  
          }
        });
      },
      setGrafica:function(datos,mpio,total){  console.log(datos);
          this.chart.data = datos;    //console.log(this.chart.data);

          this.chart.colors.step = 2;
          this.chart.fontSize = 11;
          this.chart.innerRadius = am4core.percent(5);

          // define data fields
          this.chart.dataFields.value = "value";
          this.chart.dataFields.name = "name";
          this.chart.dataFields.category = "name";
          this.chart.dataFields.children = "children";
          this.chart.dataFields.color = "color";

          var level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
          //level0SeriesTemplate.hiddenInLegend = false;
          this.chart.seriesTemplates.setKey("0", level0SeriesTemplate);

          // this makes labels to be hidden if they don't fit
          level0SeriesTemplate.labels.template.truncate = true;
          level0SeriesTemplate.labels.template.wrap = true;
          level0SeriesTemplate.labels.template.hideOversized = true;
          level0SeriesTemplate.labels.template.radius = am4core.percent(3);
          level0SeriesTemplate.labels.template.fill = am4core.color("black");
          level0SeriesTemplate.labels.template.text = "{name}";
          level0SeriesTemplate.labels.template.relativeRotation  = 90;
          level0SeriesTemplate.calculatePercent = true;
          level0SeriesTemplate.dataFields.name = "name";
          level0SeriesTemplate.fontSize = 12;
          //this.chart.legend.fontSize = 10;

          level0SeriesTemplate.dataFields.category = "name";
          level0SeriesTemplate.dataFields.color = "color";
          level0SeriesTemplate.slices.template.propertyFields.fill = "color";
          level0SeriesTemplate.slices.template.propertyFields.stroke = "color";
          level0SeriesTemplate.slices.template.tooltipText  = "{category}: {value.value} ({porcentaje}%)";


          level0SeriesTemplate.labels.template.adapter.add("rotation", function(rotation, target) { //console.log(target.dataItem.slice.innerRadius);
            target.maxWidth = target.dataItem.slice.radius - (target.dataItem.slice.innerRadius * 0.9);
            target.maxHeight = Math.abs(target.dataItem.slice.arc * (target.dataItem.slice.innerRadius + target.dataItem.slice.radius) / 2 * am4core.math.RADIANS);
            return rotation;
          })


          var level1SeriesTemplate = level0SeriesTemplate.clone();
          this.chart.seriesTemplates.setKey("1", level1SeriesTemplate)
          level1SeriesTemplate.fillOpacity = 0.75;
          level1SeriesTemplate.hiddenInLegend = true;
          level1SeriesTemplate.calculatePercent = true;
          level1SeriesTemplate.dataFields.name = "name";
          level1SeriesTemplate.dataFields.category = "name";
          level1SeriesTemplate.slices.template.tooltipText  = "{category}: {value.value} ({porcentaje}%)";

          var level2SeriesTemplate = level0SeriesTemplate.clone();
          this.chart.seriesTemplates.setKey("2", level2SeriesTemplate)
          level2SeriesTemplate.fillOpacity = 0.60;
          level2SeriesTemplate.hiddenInLegend = true;
          level2SeriesTemplate.calculatePercent = true;
          level2SeriesTemplate.dataFields.name = "name";
          level2SeriesTemplate.dataFields.category = "name";
          level2SeriesTemplate.slices.template.tooltipText  = "{category}: {value.value} ({porcentaje}%)";

          level0SeriesTemplate.slices.template.interactionsEnabled = true;
          level0SeriesTemplate.slices.template.events.on(
            "hit",
            ev => {   //console.log("hit");   //Trae las propiedades
              var dp = ev.target;    console.log(dp.dataItem.dataContext.dataContext);
              var data = appMain.getParametros(); //console.log(data);
              data.cod_mpio = appMain.parametros.cod_mpio;
              data.id_tipo = dp.dataItem.dataContext.dataContext.id_tipoc;
              data.id_subtipo = "";
              data.id_detalle = "";
              localStorage["ps"] = Func.Ecrypted(data);   console.log(data);  //console.log(localStorage.ps);
              setTimeout(function(){  //console.log('Valido');
                    $.fancybox.open({
                        src  : '../Gestiones/indexMapa.html',   //src  : 'grafica_consulta.html',  //../Gestiones/ListaFiltroMap.html
                        type : 'iframe',
                        opts : {
                            afterShow : function( instance, current ) {
                              console.info( 'done!' );
                            }
                        }
                    });
              }, 99);
            },
            this
          );

          level1SeriesTemplate.slices.template.interactionsEnabled = true;
          level1SeriesTemplate.slices.template.events.on( 
            "hit",
            ev => {   //console.log("hit");   //Trae las propiedades
              var dp = ev.target;    console.log(dp.dataItem.dataContext.dataContext);
              var data = appMain.getParametros(); //console.log(data);
              data.cod_mpio = appMain.parametros.cod_mpio;
              data.id_tipo = "";
              data.id_subtipo = dp.dataItem.dataContext.dataContext.id_subtipoc;
              data.id_detalle = "";
              localStorage["ps"] = Func.Ecrypted(data);   console.log(data);  //console.log(localStorage.ps);
              setTimeout(function(){  //console.log('Valido');
                    $.fancybox.open({
                        src  : '../Gestiones/indexMapa.html',   //src  : 'grafica_consulta.html',  //../Gestiones/ListaFiltroMap.html
                        type : 'iframe',
                        opts : {
                            afterShow : function( instance, current ) {
                              console.info( 'done!' );
                            }
                        }
                    });
              }, 99);
            },
            this
          );

          level2SeriesTemplate.slices.template.interactionsEnabled = true;
          level2SeriesTemplate.slices.template.events.on(
            "hit",
            ev => {   //console.log("hit");   //Trae las propiedades
              var dp = ev.target;    console.log(dp.dataItem.dataContext.dataContext);
              var data = appMain.getParametros(); //console.log(data);
              data.cod_mpio = appMain.parametros.cod_mpio;
              data.id_tipo = "";
              data.id_subtipo = "";
              data.id_detalle = dp.dataItem.dataContext.dataContext.id_detalle;
              localStorage["ps"] = Func.Ecrypted(data);   console.log(data);  //console.log(localStorage.ps);
              setTimeout(function(){  //console.log('Valido');
                    $.fancybox.open({
                        src  : '../Gestiones/indexMapa.html',   //src  : 'grafica_consulta.html',  //../Gestiones/ListaFiltroMap.html
                        type : 'iframe',
                        opts : {
                            afterShow : function( instance, current ) {
                              console.info( 'done!' );
                            }
                        }
                    });
              }, 99);
            },
            this
          );

          this.chart.legend = new am4charts.Legend();
          //this.chart.legend.position = "right";
          this.chart.legend.fontSize = 10;
          this.chart.legend.labels.template.text = "[bold]{name}[/]";
          this.chart.legend.labels.template.truncate = true;
          this.chart.legend.labels.template.wrap = false;
          this.chart.legend.itemContainers.template.paddingTop = 4;
          this.chart.legend.itemContainers.template.paddingBottom = 4;
          this.chart.legend.itemContainers.template.width = am4core.percent(30);
          this.chart.legend.valueLabels.template.width = am4core.percent(30);

          // Add chart title
          if (mpio != undefined){
            if (total != undefined && total != ""){
              this.chart.titles.values[0].text = " "+mpio; //" "+mpio+" ("+total+")";
            }else this.chart.titles.values[0].text = " "+mpio+" ";
            
          }else{
            this.chart.titles.values[0].text = "Cundinamarca";  
          } //console.log(this.chart.titles.values[0].dom.id);
          //$("#"+this.chart.titles.values[0].dom.id).attr("fill","red");
          this.chart.titles.values[0].fill = am4core.color("#62A2CA");
          /*this.chart.legend.itemContainers.template.width = am4core.percent(100);
          this.chart.legend.valueLabels.template.width = am4core.percent(100);*/
      },
      getDatagrafica:function(parametros,mpio,total){
        //AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
        appMain.socket.emit('GetTiposGrafica',  {data : parametros}, function(message){       //console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
          console.log(moment().format('h:mm:ss:SSSS')+" Visitas Ini");      //console.log("message:" + message);
          var decrypted = FuncDecrypted(message);   //console.log(decrypted);   //console.log(decrypted.datos.length);
          if (decrypted.length > 0){
            appMain.setGrafica(decrypted,mpio,total);
            $("#chartdiv").show();
          }else{
            $("#chartdiv").hide();
          }
          
          console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión FIN");  //console.log($.fn.dataTable.isDataTable( '#TBList' ));
        });
      },
      asigDataGeo:function(){ console.log("asigDataGeo");
          appMain.getData();
      },
      asigData:function(key,data){  //console.log(data);
            var sum=[],cont=[];
           $.each(appMain.glo.geoAdmin[key].features, function( index, value ) {  //console.log(index); console.log(value);
              appMain.glo.geoAdmin[key].features[index].properties.cuenta=0;
              var as=$(data).filter(function (i,n){return n[key]===value.properties.id}); 
              //if (as[0].cod_mpio == "25862") console.log(as[0]);
              if(as.length==1)  {
                appMain.glo.geoAdmin[key].features[index].properties.cuenta=as[0].cuenta;
                cont.push(as[0].cuenta);
              }
            });
            cont=Func.uniques(cont);  //console.log(cont);
            appMain.crearGeo(key,'cuenta',cont);
            console.log("Final: asigData");
      },
      zoomMap:function(feature){
              console.log("ingresa");
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
      getColor:function(global_valores,d){ //console.log(d);
          return d > global_valores[5]  ? appMain.colors['cod_mpio'][6] :
                   d > global_valores[4]  ? appMain.colors['cod_mpio'][5] :
                   d > global_valores[3]  ? appMain.colors['cod_mpio'][4] :
                   d > global_valores[2]  ? appMain.colors['cod_mpio'][3] :                   
                   d > global_valores[1]   ? appMain.colors['cod_mpio'][2] :
                   d > global_valores[0]  ? appMain.colors['cod_mpio'][1] :
                               appMain.colors['cod_mpio'][0];
      },
      getColorNeutro:function(cod_prov){  //console.log(cod_prov);
        // GRIS //
/*        if (cod_prov == "251800" || cod_prov == "250200" || cod_prov == "250300"){
          return "#f0f0f0CC";
        }else if(cod_prov == "250100" || cod_prov == "250500" || cod_prov == "250600"){
          return "#d9d9d9CC";
        }else if(cod_prov == "250700" || cod_prov == "250800" || cod_prov == "251100"){
          return "#525252CC";
        }else if(cod_prov == "251200" || cod_prov == "251300" || cod_prov == "251500"){
          return "#969696CC";
        }else if(cod_prov == "251600" || cod_prov == "251700" || cod_prov == "250400"){
          return "#969696CC";
        }else{
          return "#bdbdbdCC";
        } */
        if (cod_prov == "251800" || cod_prov == "250200" || cod_prov == "250300"){
          return "#deebf7CC";
        }else if(cod_prov == "250100" || cod_prov == "250500" || cod_prov == "250600"){
          return "#c6dbefCC";
        }else if(cod_prov == "250700" || cod_prov == "250800" || cod_prov == "251100"){
          return "#9ecae1CC";
        }else if(cod_prov == "251200" || cod_prov == "251300" || cod_prov == "251500"){
          return "#6baed6CC";
        }else if(cod_prov == "251600" || cod_prov == "251700" || cod_prov == "250400"){
          return "#4292c6CC";
        }else{
          return "#2171b5CC";
        }
      },
      crearGeo:function(key,tipoGroup,l){   //console.log(l); //console.log(key);
        //console.log(tipoGroup);
        var numberOfBreaks = l-1; //console.log(appMain.glo.geoAdmin[key]); console.log(tipoGroup); console.log(numberOfBreaks); console.log(appMain.colors[key]);
        var geoJenks = [];
          var arr = l;
            function sortNumber(a,b) {
                return a - b;
            }
            arr.sort(sortNumber);   //console.log(arr);
            var len =  arr.length;
            geoJenks[0] = 0;
            geoJenks[1] = arr[Math.floor(len*.05) - 1]; if(geoJenks[1] == undefined) geoJenks[1] = 10;
            geoJenks[2] = arr[Math.floor(len*.28) - 1]; if(geoJenks[2] == undefined) geoJenks[2] = 30;
            geoJenks[3] = arr[Math.floor(len*.5) - 1];  if(geoJenks[3] == undefined) geoJenks[3] = 50;
            geoJenks[4] = arr[Math.floor(len*.73) - 1]; if(geoJenks[4] == undefined) geoJenks[4] = 70;
            geoJenks[5] = arr[Math.floor(len*.95) - 1]; if(geoJenks[5] == undefined) geoJenks[5] = 90;
            //console.log(AppMap.rango.percentil['10'] + " -> " + AppMap.rango.percentil['50'] + " -> " + AppMap.rango.percentil['90']);
        console.log(geoJenks);  console.log(key);
        
        appMain.AutoDisplayLeyend(geoJenks,key);   //console.log(geoJenks);
          
          appMain.source[key]=new ol.source.Vector({
              features: (new ol.format.GeoJSON()).readFeatures(appMain.glo.geoAdmin[key])
          });
          var temp_json=[]
          appMain.source[key].forEachFeature(function(feature){
              var prop=feature.getProperties(); //console.log(prop);  //console.log(appMain.getColor(geoJenks,prop.n));
              if (prop.id == "25862") console.log(prop);
              // CALCULAR VALOR SEGÚN VALOR
              //var colorFeature = appMain.getColor(geoJenks,prop[tipoGroup]);  //console.log(colorFeature);
              // VALOR NEUTRO
              var colorFeature = appMain.getColorNeutro(prop.codigo_pro);  //console.log(colorFeature);
              
              style = new ol.style.Style({
                          //I don't know how to get the color of your kml to fill each room
                          fill: new ol.style.Fill({ color: colorFeature }),
                          stroke: new ol.style.Stroke({ color: 'black', width: 1 }),
                          text: new ol.style.Text({
                              text: feature.get('name'),
                              font: '12px Calibri,sans-serif',
                              fill: new ol.style.Fill({ color: colorFeature }),
                              stroke: new ol.style.Stroke({
                                  color: '#319FD3', width: 1
                              })
                          })
                      });

              feature.setStyle(style);

              if(prop[tipoGroup]>0){
                temp_json.push({y: prop[tipoGroup],color: colorFeature,categories:prop.n});
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
          console.log("paso1");
         
          appMain.lyr[key]= new ol.layer.Vector({
              source: appMain.source[key],
              style: appMain.styleFunction[key]
          });
         console.log("paso2");
         AppMap[key].addLayer(appMain.lyr[key]);
         console.log("paso3");
       
      },
      eventJquery:function(){
        $("#btonBuscar").click(function() {
            waitingDialog.show();
            appMain.getData();
        });
        $("#btonListado").click(function() {
            appMain.listaContratos();
        });
        $('#fechaDatosMin,#fechaDatosMax').datetimepicker({
          format: 'DD/MM/YYYY',
            locale: 'es'
        });
        $('#fechaDatosMin').datetimepicker({
          defaultDate: "11/1/2013",
            format: 'DD/MM/YYYY',
          locale: 'es'          
        });
        $('#fechaDatosMax').datetimepicker({
            defaultDate: moment().format("DD/MM/YYYY"),
            format: 'DD/MM/YYYY',
          locale: 'es'
        });
      },
      CargaFuentes:function() {  
          appMain.socket.emit('GetListFuentes', null, function(message){     //console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
          console.log(moment().format('h:mm:ss:SSSS')+" Listado Fuentes");        //console.log("message:" + message);
          var decrypted = Func.Decrypted(message);                   //console.log(decrypted[0].value);
          if(decrypted[0].value == ""){
            decrypted.shift();
          }   //console.log(decrypted);
          appMain["ListadoFuentes"]=decrypted;
          $('#idFte').multiselect('dataprovider', appMain["ListadoFuentes"]);
            console.log(moment().format('h:mm:ss:SSSS')+" FIN");
        });
      },
      cargaClasificacion:function() { console.log("cargaClasificacion"); //var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());  console.log(Func.GetCentrosG().join());
          appMain.socket.emit('getlistaClasificacionConsulta', {}, function(message){ //id_centrog : id_centroges
          console.log(moment().format('h:mm:ss:SSSS')+" Listado Tipos");        //console.log("message:" + message);
          var decrypted = Func.Decrypted(message);                   //console.log(message);                 
/*          if(decrypted[0].label == " -- Seleccione --"){
            decrypted[0].label = " Todos ";
          }   //console.log(decrypted);*/
          appMain["listadoClasificacion"]=decrypted;                      
          $('#sel_id_clasificacion').multiselect('dataprovider', appMain["listadoClasificacion"]);
            console.log(moment().format('h:mm:ss:SSSS')+" FIN");
        });
      },
      cargaTipos:function() {
        //var id_centroges = Func.Ecrypted(Func.GetCentrosG().join());  console.log(Func.GetCentrosG().join());
          appMain.socket.emit('getlistaTiposConsulta', {}, function(message){ //id_centrog : id_centroges
          console.log(moment().format('h:mm:ss:SSSS')+" Listado Tipos");        //console.log("message:" + message);
          var decrypted = Func.Decrypted(message);                   //console.log(message);                 
          if(decrypted[0].label == " -- Seleccione --"){
            decrypted[0].label = " Todos ";
          }   //console.log(decrypted);
          appMain["listadoTipos"]=decrypted;  //console.log(appMain["listadoTipos"]);
          $('#sel_id_tipoc').multiselect('dataprovider', appMain["listadoTipos"]);
            console.log(moment().format('h:mm:ss:SSSS')+" FIN");
        });
      },
      cargaEntidades:function() { console.log("cargaEntidades");
          appMain.socket.emit('GetListEntidades', '', function(message){
          console.log(moment().format('h:mm:ss:SSSS')+" Listado Entidades");        //console.log("message:" + message);
          var decrypted = Func.Decrypted(message);                   //console.log(message);                 
          if(decrypted[0].label == " -- Seleccione --"){
            decrypted[0].label = " Todos ";
          }   //console.log(decrypted);
          appMain["listadoEntidades"]=decrypted;                      
          $('#sel_id_centro').multiselect('dataprovider', appMain["listadoEntidades"]);
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
            appMain["listadoSubtipos"]=decrypted;   console.log(appMain["listadoSubtipos"]);
            $('#sel_id_subtipoc').multiselect('dataprovider', appMain["listadoSubtipos"]);
            console.log(moment().format('h:mm:ss:SSSS')+" FIN");
          });
      },
      iniControles:function(){
        /* SELECT - CENTRO GESTOR */
        $('#sel_id_centro').multiselect({
                  enableClickableOptGroups: true,
                  enableCollapsibleOptGroups: true,
                  enableFiltering: true,
                  enableCaseInsensitiveFiltering: true,
                  buttonWidth: '100%',
                  onChange: function(option, checked, select) {
                    appMain['qid_centro'] = $('#sel_id_centro option:selected').map(function(a, item){return item.value;}).get();  console.log('onChange: '+appMain['qid_centro']); //console.log(appMain['id_tipoc'][0]);
                  },
                  onSelectAll: function(checked) {
                    appMain['qid_centro'] = $('#sel_id_centro option:selected').map(function(a, item){return item.value;}).get();  //console.log(appMain['qid_centro']);
                },
                  onDeselectAll: function(checked) {
                    appMain['qid_centro'] = $('#sel_id_centro option:selected').map(function(a, item){return item.value;}).get();  //console.log(appMain['qid_centro']);
                }
        });
        /* SELECT - FUENTE */
        $('#idFte').multiselect({
                  enableClickableOptGroups: true,
                  enableCollapsibleOptGroups: true,
                  enableFiltering: true,
                  includeSelectAllOption: true,
                  enableCaseInsensitiveFiltering: true,
                  buttonWidth: '100%',
                  onChange: function(option, checked, select) { //  console.log("onChange");
                    appMain['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get(); //console.log(appMain['id_centrog']);
                  },
                  onSelectAll: function(checked) {        //  console.log("onSelectAll");
                    appMain['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get(); //console.log(appMain['id_centrog']);
                },
                  onDeselectAll: function(checked) {        //  console.log("onDeselectAll");
                    appMain['idFuente'] = $('#idFte option:selected').map(function(a, item){return item.value;}).get(); //console.log(AppConfig['id_centrog']);
                }
        });
        /* SELECT - CLASIFICACION */
        $('#sel_id_clasificacion').multiselect({
                  enableClickableOptGroups: true,
                  enableCollapsibleOptGroups: true,
                  enableFiltering: true,
                  enableCaseInsensitiveFiltering: true,
                  buttonWidth: '100%',
                  onChange: function(option, checked, select) {
                    appMain['id_clasificacion'] = $('#sel_id_clasificacion option:selected').map(function(a, item){return item.value;}).get();  //console.log('onChange: '+AppConfig['id_convenio']); //console.log(AppConfig['id_tipoc'][0]);
                  },
                  onSelectAll: function(checked) {
                    appMain['id_clasificacion'] = $('#sel_id_clasificacion option:selected').map(function(a, item){return item.value;}).get();  //console.log(AppConfig['id_convenio']);
                },
                  onDeselectAll: function(checked) {
                    appMain['id_clasificacion'] = $('#sel_id_clasificacion option:selected').map(function(a, item){return item.value;}).get();  //console.log(AppConfig['id_convenio']);
                }
        });        /* SELECT - TIPO */
        $('#sel_id_tipoc').multiselect({
                  enableClickableOptGroups: true,
                  enableCollapsibleOptGroups: true,
                  enableFiltering: true,
                  enableCaseInsensitiveFiltering: true,
                  buttonWidth: '100%',
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
                  buttonWidth: '100%',
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
        /* DEFINE ALTURA DE VENTANA*/
        var alto = $(window).height() - 90; console.log(alto); console.log($("#colFiltro").height());
        $('#colFiltro').css("height", alto );
        $('#cod_mpio').css("height", alto - 50 );
        $('#colGrafica').css("height", alto );
        $('#chartdiv').css("height", alto - 10 );

        /* INI GRAFICA */ 
          //let valParametros = localStorage.ps;  //console.log(valParametros);
          //Set parametros
          //this.parametros = Func.Decrypted(valParametros);  console.log(this.parametros);
          //$("#nom_mpio").html(this.parametros.nom_mpio);
          // Themes begin

          am4core.useTheme(am4themes_kelly);
          am4core.useTheme(am4themes_animated);

        // create this.chart
          appMain.chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst);
          appMain.chart.padding(0,0,0,0);
          appMain.chart.radius = am4core.percent(100);
          //Titulo
          var title = this.chart.titles.create();
          title.fontSize = 22;
          title.marginBottom = 10;
          title.text = "Cundinamarca";


          //appMain.getDatagrafica();

      },
      IniMain:function(){
          waitingDialog.show();
          appMain.iniControles();
          //this.column_cod_mpio();
          appMain.eventJquery();
          AppMap.cod_mpio=AppMap.Initcod_mpio();  console.log(AppMap.cod_mpio);
          appMain.cargaEntidades();
          appMain.CargaFuentes();
          appMain.cargaClasificacion();
          appMain.cargaTipos();
          appMain.GetGeo();
          appMain.geoTooltip();
          //appMain.graficaTipo();
          
      }
    };

    appMain.IniMain();

});