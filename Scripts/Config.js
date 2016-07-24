
var Config={
 	UrlSocket: 'http://saga.cundinamarca.gov.co:4171', 			//Socket Login
 	UrlSocketApp: 'http://saga.cundinamarca.gov.co:3322',		//Socket Aplicación
 	cl:'1erf2a5f1e87g1',
 	NextLogin:'../Home/',
	
	// TABLA public.p_perfil
		//ADMIN           (18)			// tipo 'C'
		//CONSULTA        (2)				// tipo 'C'
		//77,89=Planeación -- 91=Administrativo -- 110=Gobierno\Rendición 
 	id_perfil:[2,18,77,89,91,110], 					// tipo 'C'
 	
	 	//ADMIN           (24,69)			// tipo 'A'
	 	//EDICIÓN Y CARGA (79,87,96)		// tipo 'A'
	 	//CONSULTA        (70)				// tipo 'A'
	id_perfil_admin:[24,69,70,79,87,96],	// tipo 'A'
	socketGeoAdmin:''
};

/*
 * Configuracion evento NodeJS
 */
Config.socketGeoAdmin = io.connect(Config.UrlSocketApp+'/GeoAdmin');

var FuncDecrypted=function(message){
	var decrypted = JSON.parse(CryptoJS.AES.decrypt(message,Config.cl).toString(CryptoJS.enc.Utf8));
	return decrypted; 
};

Config.socketGeoAdmin.emit('GetMunicipio', '', function(message){			//console.log("message Mun:" + message.length);
	console.log(moment().format('h:mm:ss:SSSS')+" Mun Ini");
	var decrypted =FuncDecrypted(message);									//console.log("decrypted Mun:" + decrypted.type);		
	var geojson=topojson.feature(decrypted, decrypted.objects.collection);
  	Config["cod_mpio"]=geojson;												//console.log("geojson Mun:" + Config["cod_mpio"].features.length);
  	console.log(moment().format('h:mm:ss:SSSS')+" Mun FIN");
});	

Config.socketGeoAdmin.emit('GetProvincia', '', function(message){
	console.log(moment().format('h:mm:ss:SSSS')+" prov Ini");
	var decrypted =FuncDecrypted(message);
	var geojson=topojson.feature(decrypted, decrypted.objects.collection);
	Config["cod_prov"]=geojson;
	console.log(moment().format('h:mm:ss:SSSS')+" prov FIN");											
});
Config.socketGeoAdmin.emit('GetDepartamento', '', function(message){
	console.log(moment().format('h:mm:ss:SSSS')+" Dpto Ini");
	var decrypted =FuncDecrypted(message);
	var geojson=topojson.feature(decrypted, decrypted.objects.collection);
	Config["cod_dpto"]=geojson;
	console.log(moment().format('h:mm:ss:SSSS')+" Dpto FIN");
});