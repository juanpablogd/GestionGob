$(document).ready(function() {

var appGrafica={
  parametros:null,
  chart:null,
  Inicial:function(){ //console.log(localStorage.ps);
    let valParametros = localStorage.ps;  //console.log(valParametros);
    //Set parametros
    this.parametros = Func.Decrypted(valParametros);  console.log(this.parametros);
    $("#nom_mpio").html(this.parametros.nom_mpio);
    //Ini grafica
  // create this.chart
    this.chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst);
    this.chart.padding(0,0,0,0);
    this.chart.radius = am4core.percent(110);
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    this.getData();
  },
  getData:function(){   console.log("getData");
      AppConfig.socketDataAdmin = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
      AppConfig.socketDataAdmin.emit('GetTiposGrafica',  {data : this.parametros}, function(message){       //console.log("message Mun DATA: " + message.length); //console.log("message Mun:" + message);
        console.log(moment().format('h:mm:ss:SSSS')+" Visitas Ini");      //console.log("message:" + message);
        var decrypted = FuncDecrypted(message);   //console.log(decrypted);   //console.log(decrypted.datos.length);
        appGrafica.setGrafica(decrypted);
        console.log(moment().format('h:mm:ss:SSSS')+" Unica Gestión FIN");  //console.log($.fn.dataTable.isDataTable( '#TBList' ));
      });
    
  },
  setGrafica:function(datos){
      this.chart.data = datos;    //console.log(this.chart.data);

      this.chart.colors.step = 2;
      this.chart.fontSize = 11;
      this.chart.innerRadius = am4core.percent(5);

      // define data fields
      this.chart.dataFields.value = "value";
      this.chart.dataFields.name = "name";
      this.chart.dataFields.children = "children";


      var level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
      level0SeriesTemplate.hiddenInLegend = false;
      this.chart.seriesTemplates.setKey("0", level0SeriesTemplate)

      // this makes labels to be hidden if they don't fit
      level0SeriesTemplate.labels.template.truncate = true;
      level0SeriesTemplate.labels.template.hideOversized = true;

      level0SeriesTemplate.labels.template.adapter.add("rotation", function(rotation, target) {
        target.maxWidth = target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
        target.maxHeight = Math.abs(target.dataItem.slice.arc * (target.dataItem.slice.innerRadius + target.dataItem.slice.radius) / 2 * am4core.math.RADIANS);

        return rotation;
      })


      var level1SeriesTemplate = level0SeriesTemplate.clone();
      this.chart.seriesTemplates.setKey("1", level1SeriesTemplate)
      level1SeriesTemplate.fillOpacity = 0.75;
      level1SeriesTemplate.hiddenInLegend = true;

      var level2SeriesTemplate = level0SeriesTemplate.clone();
      this.chart.seriesTemplates.setKey("2", level2SeriesTemplate)
      level2SeriesTemplate.fillOpacity = 0.5;
      level2SeriesTemplate.hiddenInLegend = true;

      level0SeriesTemplate.slices.template.interactionsEnabled = true;
      level0SeriesTemplate.slices.template.events.on(
        "hit",
        ev => {   //console.log("hit");   //Trae las propiedades
          var dp = ev.target;    console.log(dp.dataItem.dataContext.dataContext);
          setTimeout(function(){  //console.log('Valido');
                $.fancybox.open({
                    src  : '../Gestiones/ListaFiltroMap.html',
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
          setTimeout(function(){  //console.log('Valido');
                $.fancybox.open({
                    src  : '../Gestiones/ListaFiltroMap.html',   //src  : 'grafica_consulta.html',  //../Gestiones/ListaFiltroMap.html
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
          setTimeout(function(){  //console.log('Valido');
                $.fancybox.open({
                    src  : '../Gestiones/ListaFiltroMap.html',   //src  : 'grafica_consulta.html',  //../Gestiones/ListaFiltroMap.html
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
  },
}

appGrafica.Inicial();  

//   var parametros = Func.Decrypted(localStorage.ps);	console.log(parametros);
});