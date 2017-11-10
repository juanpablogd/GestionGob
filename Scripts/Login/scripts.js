
var socket = io.connect(AppConfig.UrlSocket+'/web'); //console.log(AppConfig.UrlSocket);
$(document).ready(function () {	//console.log(Func.UsuarioLogueado());
	 if(Func.UsuarioLogueado()){
		window.location.href = '../Gestiones/index.html'; 	
	 }else{
        var vid_usr = localStorage.id_usr; //console.log(vid_usr);
        var modulo = $("#modulo").val();
        var data= {id_usr: vid_usr,'mod': modulo, login: 'Ok'};
        var DataAES = Func.Ecrypted(data);
        socket.emit('LoginUsuario',DataAES,function(data){
                var dat=Func.Decrypted(data); console.log(dat);
                if (dat.length>0){
                    localStorage.dt=data;
                    bootbox.alert("Bienvenido, " + dat[0].nombre, function () {});
                    window.location.assign(AppConfig.NextLogin);
               }else{   console.log("Usuario no encontrado! ");
                    localStorage.clear();
                    bootbox.alert("Usuario no encontrado!", function () {});
                }
            }); 

     }
 
    $("#ingresar").click(function () {
        if (!$("#usuario").val()) {
            bootbox.alert("por favor ingrese el nombre de usuario", function () {});
            $("#usuario").focus();
        } else if (!$("#contrasena").val()) {
            bootbox.alert("por favor ingrese la contraseña", function () {});
            $("#contrasena").focus();
        } else {
            var usuario = $("#usuario").val();
            var login = $("#contrasena").val();
            var modulo = $("#modulo").val();
            var data= {'usr': usuario,'mod': modulo,'pas': login};
            var DataAES = Func.Ecrypted(data);
            socket.emit('LoginUsuario',DataAES,function(data){
            	var dat=Func.Decrypted(data); console.log(dat);
            	if (dat.length>0){
            		localStorage.dt=data;
            		bootbox.alert("Bienvenido, " + dat[0].nombre, function () {});
                    window.location.assign(AppConfig.NextLogin);
               }else{	console.log("Usuario no encontrado! ");
                    localStorage.clear();
                    bootbox.alert("Usuario no encontrado!", function () {});
                }
            });
        }
    });
});