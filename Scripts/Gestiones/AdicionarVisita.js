$(document).ready(function() {
	
	/* CARGA LISTADO DE PROVINCIAS*/
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

	/* CARGA LISTADO DE OBJTIVO - PROGRAMA*/
	$('#cod_programa').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
	});
	var optgroups = [
        {
            label: 'DESARROLLO INTEGRAL DEL SER HUMANO', children: [
                {label: 'JOVENES CONSTRUCTORES DE PAZ', value: '25183'},
                {label: 'ALIANZA POR LA INFANCIA', value: '25426'},
                {label: 'VIVE Y CRECE ADOLESCENCIA', value: '25436'}
            ]
        },
        {
            label: 'SOSTENIBILIDAD Y RURALIDAD', children: [
                {label: 'TERRITORIO SOPORTE PARA EL DESARROLLO', value: '1'},
                {label: 'BIENES Y SERVICIOS AMBIENTALES PATRIMONIO DE CUNDINAMARCA', value: '2'},
                {label: 'AGUA POTABLE Y SANEAMIENTO BASICO PARA LA SALUD DE LOS CUNDINAMARQUESES', value: '3'}
            ]
        }
    ]; console.log(optgroups);
    $('#cod_programa').multiselect('dataprovider', optgroups);

	/* CARGA LISTADO DE Sub PROGRAMA - META*/
	$('#cod_meta').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
	});
	var optgroups = [
        {
            label: 'Existencia', children: [
                {label: 'Vacunar en el cuatrienio a 24.000 niñas y niños de un año de edad con esquema de vacunación pai plus (hepatitis a y varicela).', value: '25183'},
                {label: 'Completo Pruebas Desarrollo Texto Largo 012', value: '25426'},
                {label: 'Promover la expansión de electrificación rural a 400 hogares. durante el periodo 2012-2016.', value: '25436'}
            ]
        },
        {
            label: 'Desarrollo', children: [
                {label: 'Desarrollar procesos de normalización. certificación de producto y gestión de calidad en 250 empresas durante el periodo de gobierno', value: '1'},
                {label: 'Crear y o fortalecer 1.000 mipymes en gestión e innovación empresarial para la productividad. durante el período de gobierno.', value: '2'},
                {label: 'Desarrollar procesos de normalización. certificación de producto y gestión de calidad en 250 empresas durante el periodo de gobierno', value: '3'}
            ]
        }
    ]; console.log(optgroups);
    $('#cod_meta').multiselect('dataprovider', optgroups);    
    
	/* CARGA LISTADO DE Productos de Prensa*/
	$('#id_prensa').multiselect({
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableCaseInsensitiveFiltering: true
	});

    $('#id_prensa').multiselect(); 
    
    
    
    /* CODIGO DE PANEL DESPLEGABLE */
	$(document).on('click', '.panel-heading span.clickable', function(e){
	    var $this = $(this);
		if(!$this.hasClass('panel-collapsed')) {
			$this.parents('.panel').find('.panel-body').slideUp();
			$this.addClass('panel-collapsed');
			$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
		} else {
			$this.parents('.panel').find('.panel-body').slideDown();
			$this.removeClass('panel-collapsed');
			$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
		}
	});
    
});