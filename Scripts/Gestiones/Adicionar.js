$(document).ready(function() {
	$('#provincias').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
	});
	var optgroups = [
        {
            label: 'ALMEIDAS', children: [
                {label: 'Chocontá', value: '25183'},
                {label: 'Machetá', value: '25426'},
                {label: 'Manta', value: '25436'}
            ]
        },
        {
            label: 'ALTO MAGDALENA', children: [
                {label: 'Agua de Dios', value: '1'},
                {label: 'Girardot', value: '2'},
                {label: 'Guataquí', value: '3'}
            ]
        }
    ]; console.log(optgroups);
    
    $('#provincias').multiselect('dataprovider', optgroups);
});