var Func={
	Decrypted : function (message) { 
		try {
			var text=CryptoJS.AES.decrypt(message,AppConfig.cl).toString(CryptoJS.enc.Utf8);	//console.log(text);
		}
		catch(err) {	//console.log(err);
		    this.CerrarAPP();
			return false;
		}
		if(text==''){
			this.CerrarAPP();
			return false;
		}else{
			var decrypted =JSON.parse(CryptoJS.AES.decrypt(message,AppConfig.cl).toString(CryptoJS.enc.Utf8));	//console.log(decrypted);
			return decrypted;	
		}
	},
	Ecrypted: function (json){
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(json), AppConfig.cl);
		return ciphertext.toString();
	},
	DataLogin: function (){
		var DatosUsuario=this.Decrypted(localStorage.dt); //console.log(DatosUsuario);
		return	DatosUsuario;
	},
	degToRad:function(deg) {
       return deg * Math.PI * 2 / 360;
   	},
   	sorting:function(json_object, key_to_sort_by) {
	    function sortByKey(a, b) {
	        var x = a[key_to_sort_by];
	        var y = b[key_to_sort_by];
	        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	    }

	    json_object.sort(sortByKey);
	},
	uniques(arr) {
	    var a = [];
	    for (var i=0, l=arr.length; i<l; i++)
	        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
	            a.push(arr[i]);
	    return a;
	}, 
	GetIdusuario: function (){
		var data=this.DataLogin();	console.log(data);
		return data[0].id;
	},
	GetNombre: function (){
		var data=this.DataLogin();
		return data[0].nombre;
	},
	GetIdPerfil: function (){	//jp 18
		var data=this.DataLogin();	//console.log(data);
		if(data) return data[0].id_perfil;
	},
	GetAdmin: function (){
		var data=this.DataLogin();
		if(!data) return false;
		if(data[0].id_perfil_admin==24){
	        return true;	
	    }else{
	    	return false;
	    }
	},
	GetTipo: function (){ //jp 24
		var data=this.DataLogin();		//console.log(data[0]);	//console.log(data[0].id_perfil_admin);
		if (data[0] === undefined) return "C";

		var id_perfil_admin = data[0].id_perfil_admin;	//var id_perfil_admin = data[0].id_perfil_admin; //JP
		if(id_perfil_admin==24||id_perfil_admin==69){
	        return "A";	//ADMINISTRADOR
	    }else if(id_perfil_admin==79||id_perfil_admin==87||id_perfil_admin==96){
	    	return "E";	//ENLACE DE CARGUE
	    }else if(id_perfil_admin==70){
	    	return "C";	//CONSULTA
	    }
	},
	GetTipoapp: function (IdPerfil){ //jp 24
		if(IdPerfil==93 || IdPerfil == 121 || IdPerfil == 122){
	        return "obra";	
	    }else{
	    	return "gestion";	
	    }
	},
	GetCentrosG: function (){ //jp 24
		var data=this.DataLogin();	//console.log(data);	//console.log("CORREGIR: centrog");
		if (data[0] === undefined) return [];
		data = data[0].centrog;		//console.log(data.length);	//JP
		//data = 1119;		//console.log(data.length);
		var cg = [];
		for (s=0;s<data.length;s++) {
			cg.push(data[s].id); console.log(data[s]);
		}
		return cg; 
	},
	GetHoraLogin: function (){
		var data=this.DataLogin();
		return data[0].hora;
	},
	GetCl: function (){
		var data=this.DataLogin();
		return data[0].contrasegna;
	},
	GetUsuario: function (){
		var data=this.DataLogin();	console.log(data[0]);
		return data[0].usuario;
	},
	CerrarAPP: function(){
		//console.log("CORREGIR: CERRAR APP");
		localStorage.clear();								//JP
	   	window.location.assign("../Login/index.html");		//JP
	},
	ValidaUsuario: function(){
		if(!localStorage.dt){
			this.CerrarAPP();
	    }else{
	    	var id_perfil=this.GetIdPerfil();
	        if(AppConfig.id_perfil.indexOf(id_perfil)<0){
	        	this.CerrarAPP();	
	        }
	    }
	},
	UsuarioLogueado: function(){	//console.log(localStorage.dt);
		if(localStorage.dt){
			return true;
	    }else{
	    	//var data=this.DataLogin(); console.log(data);
	    	return false;
	    }
	},
	IntevaloLogin:function(){
		var app=this;
		app.ValidaUsuario();
		setInterval(function(){	//console.log('Valido');
			app.ValidaUsuario();
		}, 1000*5);	
	},
	degToRad:function(deg) {
       return deg * Math.PI * 2 / 360;
  	},
  	SetIdGestion:function(IdGestion){	//console.log(this.Ecrypted(IdGestion));
  		localStorage.setItem("t", this.Ecrypted(IdGestion));
  	},
  	GetIdGestion:function(){	//console.log(this.Ecrypted(IdGestion));
  		var IdGestion = this.Decrypted(localStorage.t);
  		return IdGestion;
  	},
  	SetNomGestion:function(NomGestion){	//console.log(this.Ecrypted(IdGestion));
  		localStorage.setItem("n", this.Ecrypted(NomGestion));
  	},
  	GetNomGestion:function(){	//console.log(this.Ecrypted(IdGestion));
  		var NomGestion = this.Decrypted(localStorage.n); //console.log(NomGestion);
  		return NomGestion;
  	},
  	setIdconvenio:function(idConvenio){	//console.log(this.Ecrypted(idConvenio));
  		localStorage.setItem("tc", this.Ecrypted(idConvenio));
  	},
  	getIdconvenio:function(){
  		var idConvenio = this.Decrypted(localStorage.tc);	//console.log(idConvenio);
  		return idConvenio;
  	},
  	setNomconvenio:function(nomConvenio){	//console.log(this.Ecrypted(nomConvenio));
  		localStorage.setItem("nc", this.Ecrypted(nomConvenio));
  	},
  	getNomconvenio:function(){
  		var nomConvenio = this.Decrypted(localStorage.nc);	//console.log(nomConvenio);
  		return nomConvenio;
  	},
	MsjPeligro:function(msj){
		$.notify({
			// options
			icon: 'fa fa-exclamation-circle',
			message: msj 
		},{
			// settings
			type: 'danger',
			timer : 100,
			delay: 3000,
			animate: {
				enter: 'animated bounceInRight',
				exit: 'animated bounceOutRight'
			},
			placement: {
				from: "bottom",
				align: "right"
			}
		});
	},
	MsjAviso:function(msj){
		$.notify({
			// options
			icon: 'fa fa-exclamation-circle',
			message: msj 
		},{
			// settings
			type: 'info',
			timer : 100,
			delay: 3000,
			animate: {
				enter: 'animated bounceInRight',
				exit: 'animated bounceOutRight'
			},
			placement: {
				from: "bottom",
				align: "right"
			}
		});
	},
	MsjAvisoTop:function(msj){
		$.notify({
			// options
			icon: 'fa fa-exclamation-circle',
			message: msj 
		},{
			// settings
			type: 'danger',
			timer : 100,
			delay: 3000,
			animate: {
				enter: 'animated bounceInRight',
				exit: 'animated bounceOutRight'
			},
			placement: {
				from: "top",
				align: "right"
			}
		});
	},
	ComparaFechas:function(dateTimeA, dateTimeB){
	    var momentA = moment(dateTimeA,"YYYY-MM-DD");
	    var momentB = moment(dateTimeB,"YYYY-MM-DD");
	    if (momentA > momentB) return 1;
	    else if (momentA < momentB) return -1;
	    else return 0;
	},
	ValidaURL:function isUrlValid(userInput) {
	    var regexQuery = "^(https?://)?(www\\.)?([a-z]+\:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ \#]*)#?([^ \#]*)?$";
	    var url = new RegExp(regexQuery,"i");	//console.log(url);
	    if (url.test(userInput)) {	//alert('valid url: ' + userInput);
	        return true;
	    }	//alert('invalid url: ' + userInput);
	    return false;
	},
	ValidaPorcentaje:function(str){
		var x = parseFloat(str);
		if (isNaN(x) || x < 0 || x > 100) {
			return false;
		} else return true; 
	},
	BuscaArray:function(arr, obj){
		var vr = false;
		for(var i=0; i<arr.length; i++) {
		    if (arr[i] == obj) vr = true;
		}
		return vr;
	}
};

var FuncDecrypted=function(message){	//console.log("FuncDecrypted INI: "+AppConfig.cl);
	var decrypted = JSON.parse(CryptoJS.AES.decrypt(message,AppConfig.cl).toString(CryptoJS.enc.Utf8));	//console.log("FuncDecrypted INI"+CryptoJS.AES.decrypt(message,AppConfig.cl).toString(CryptoJS.enc.Utf8));
	return decrypted;
};
/*	FORMATO DE MILES PARA LA CLASE VALOR*/
$( ".valor" ).each(function( index ) {	//console.log( index + ": " + $( this ).text() );
  	new Cleave($( this ), {
	    numeral: true,
	    numeralThousandsGroupStyle: 'thousand'
	});
});
if(Func.UsuarioLogueado()){
	console.log(Func.GetTipoapp(Func.GetIdPerfil()));
	console.log(Func.GetAdmin());
	if(Func.GetTipoapp(Func.GetIdPerfil()) == "gestion" && !Func.GetAdmin()) $("#opcion_convenios").hide();
}