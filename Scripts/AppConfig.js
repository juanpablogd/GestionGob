var AppConfig={
 	UrlSocket: 'http://saga.cundinamarca.gov.co:4171', 			//Socket Login			app.js
 	UrlSocketApp: 'http://saga.cundinamarca.gov.co:3322',		//Socket Aplicación		AppSeguimientoActividades.js
 	cl:'1erf2a5f1e87g1',
 	NextLogin:'../map/',
	// TABLA public.p_perfil
		//ADMIN           (18)			// tipo 'C'
		//CONSULTA        (2)				// tipo 'C'
		//77,89=Planeación -- 91=Administrativo -- 110=Gobierno\Rendición 
 	id_perfil:[2,18,77,89,91,93,110,19,20,21,77,101,105,118,119,120,121,122,123,124,125,126,127,128,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,150], 					// tipo 'C'
 	
	 	//ADMIN           (24,69)			// tipo 'A'
	 	//EDICIÓN Y CARGA (79,87,96)		// tipo 'A'
	 	//CONSULTA        (70)				// tipo 'C'
	id_perfil_admin:[24,69,79,87,96,70],	// tipo 'A',
	//id_centros_gestores:[],
	socketGeoAdmin:'',
	MinImagen: 1,
	MaxImagen: 10,
	minImageWidth: 600,
	minImageHeight: 600,
	tamanoArchivo: 5000
}; 
