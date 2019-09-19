
var socket = io.connect(AppConfig.UrlSocketApp+'/DataAdmin');
$(document).ready(function () {	//console.log(Func.UsuarioLogueado());
 
    $("#enviar").click(function () {
        if (!$("#num_celular").val()) {
            bootbox.alert("por favor ingrese el número celular", function () {});
            $("#num_celular").focus();
        } else if (!$("#smsTxt").val()) {
            bootbox.alert("por favor ingrese el texto del mensaje", function () {});
            $("#smsTxt").focus();
        } else {
            var num_celular = $("#num_celular").val();
            var smsTxt = $("#smsTxt").val();
            var data= {'num_celular': num_celular,'smsTxt': smsTxt};
            var DataAES = Func.Ecrypted(data);
            socket.emit('setSMS',DataAES,function(data){
            	var dat=Func.Decrypted(data); console.log(dat);
                $("#num_celular").val('');
                $("#smsTxt").val('');
                bootbox.alert("Mensaje enviado exitosamente con el codigo: <br> "+dat.MessageId, function () {});
            });
        }
    });
});