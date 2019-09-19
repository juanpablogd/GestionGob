var Config={
 	UrlSocket: 'http://saga.cundinamarca.gov.co:3322',
 	cl:'1erf2a5f1e87g1',
 	NextLogin:'../Home/',
 	// TABLA public.p_perfil
 	id_perfil:[21,18],			// tipo 'C'
	id_perfil_admin:[24,68]		// tipo 'A'
};

$(function () {
	
	$('#fechaDatosMin,#fechaDatosMax').datetimepicker({
    	format: 'DD/MM/YYYY',
        locale: 'es'
    });
    
});
   $(function () {
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
       /* $("#fechaDatosMin").on("dp.change", function (e) {
            $('#fechaDatosMax').data("DateTimePicker").minDate(e.date);
        });
        $("#fechaDatosMax").on("dp.change", function (e) {
            $('#fechaDatosMin').data("DateTimePicker").maxDate(e.date);
        });*/
    });