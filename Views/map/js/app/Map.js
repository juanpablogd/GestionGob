var AppMap = {
    center: [-8235000, 535000],
    zoom: 8.5,
    view: new ol.View({
        maxZoom: 21
    }),
    cod_mpio: '',
    cod_prov: '',
    Definecod_mpio: function() {    //console.log($(window).height());
        $(window).resize(function() {   console.log("resize");
            $('#cod_mpio').css("height", alto );
            AppMap.cod_mpio.updateSize();
            var center = ol.proj.transform(AppMap.view.getCenter(), 'EPSG:3857', 'EPSG:4326');
        });
    },
    Initcod_mpio: function() {  console.log("Initcod_mpio");
        this_ = this;
    
        var attribution = new ol.control.Attribution({
            collapsible: false
        });
        var cod_mpio = new ol.Map({
            controls: ol.control.defaults({
                attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                    collapsible: false
                })
            }).extend([
                new ol.control.ScaleLine()
            ]),
            interactions: ol.interaction.defaults({mouseWheelZoom:false}),
            controls: ol.control.defaults({
                attribution: false
            }).extend([attribution]),
            target: 'cod_mpio',
            view: this_.view
        });
        
        cod_mpio.addLayer(Lyr.Base_ESRI_Satelite);
        Lyr.Base_ESRI_Satelite.setVisible(true);
        this_.view.setCenter(this.center);
        this_.view.setZoom(this.zoom);
        this.Definecod_mpio();
        
        return cod_mpio;
    },
    ZoomControl: function(opt_options) {
        var options = opt_options || {};
        var button = document.createElement('button');
        button.innerHTML = '<span class="glyphicon glyphicon-resize-small" aria-hidden="true"></span>';
        var this_ = this;
        var handle = function(e) {
            var v = this_.getMap().getView()
            v.setCenter([-8230000, 535000]);
            v.setZoom(8);
        };

        button.addEventListener('click', handle, false);
        button.addEventListener('touchstart', handle, false);


        var element = document.createElement('div');
        element.className = 'ZoomExt ol-unselectable ol-control';
        element.appendChild(button);

        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });
    },
    ActiveStreetViewOL: false,
    addZoomControl: function(map) {
        this_ = this;
        ol.inherits(this_.ZoomControl, ol.control.Control);
        map.addControl(new this_.ZoomControl());
    },
    displayClickStreetView: function(evt) {
        var coordinate = evt.coordinate;
        var coord_4326 = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
        var position_vista = new google.maps.LatLng(coord_4326[1], coord_4326[0]);
        gmaps.panorama.setPosition(position_vista);
        gmaps.streetViewService.getPanoramaByLocation(position_vista, 40, function(streetViewPanoramaData, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                gmaps.panorama.setVisible(true);
            } else {
                gmaps.panorama.setVisible(false);
            }
        });
        gmaps.ChangePosition(coordinate);

    },
    OffLyrBase:function(){
    	Lyr.Base_ESRI_Calles.setVisible(false);
    	Lyr.Base_MapQuest.setVisible(false);
    	gmaps.ActiveMapGoogle=false;
    },
    AddBaseEsriCalles:function(){
	    AppMap.map.addLayer(Lyr.Base_ESRI_Calles);
	    Lyr.Base_ESRI_Calles.setVisible(false);
	    $(".carousel-inner").append(
    		'<div class="item ">'+
	        '<div class="row-fluid">'+
	          '<div class="col-sm-12 col-md-12 BaseImg" id="base_esri_calles">'+
	          	'<a href="#" class="thumbnail"><img src="../../Images/Map/base_esri_calles.PNG"  >'+
	          		'<div class="carousel-caption captionBlue"><center><h6>ESRI Calles</h6></center></div>'+
	           	'</a>'+
	          '</div>'+
	        '</div>'+
	    '</div>');
	    $('#base_esri_calles').on('click', function(evt) {
	        AppMap.OffLyrBase();	        
	        Lyr.Base_ESRI_Calles.setVisible(true);
	    });	    
    }

}
Lyr = {
    StrVw_Source: '',
    StrVw_Vector: '',
    InitStrVw: function() {
        this_ = this;
        this_.StrVw_Source = new ol.source.Vector({});
        this_.StrVw_Vector = new ol.layer.Vector({
            source: this_.StrVw_Source,
            style: new ol.style.Style({
                image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 120],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '../../Images/Map/flecha.png',
                    scale: 0.15
                }))
            })
        });
    },
    Base_MapQuest: new ol.layer.Tile({
   	  preload: Infinity,
      style: 'Road',
      source: new ol.source.OSM()
    }),
    Base_ESRI_Calles: new ol.layer.Tile({
    	preload: Infinity,
        source: new ol.source.XYZ({
          attributions: '',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        })
    }),
    Base_ESRI_Satelite: new ol.layer.Tile({
        preload: Infinity,
        source: new ol.source.XYZ({
          attributions: '',
          url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Imagery/MapServer/tile/{z}/{y}/{x}'
        })
    }),
    Carto_ligth:  new ol.layer.Tile({ 
        source: new ol.source.XYZ({ 
            //light_all
            url:'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        })
    })
}