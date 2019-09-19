<?php
header('Access-Control-Allow-Origin: *');
//header("Content-type: application/pdf; charset=UTF-8");
header("Content-Type: text/html; charset=utf-8");
ini_set('memory_limit', '-1');
require("../../../../SIG/servicios/conexion.php");
//require('libs/fpdf/fpdf.php');
require('../../Resources/fpdf/rotation.php');
$id = $_REQUEST["id"];
//var_dump($_REQUEST);
//echo "Reporte PDF: ".$_REQUEST["id"];
class PDF extends PDF_Rotate
{
	function RotatedText($x,$y,$txt,$angle)
	{
	    //Text rotated around its origin
	    $this->Rotate($angle,$x,$y);
	    $this->Text($x,$y,$txt);
	    $this->Rotate(0);
	}

	function RotatedImage($file,$x,$y,$w,$h,$angle)
	{
	    //Image rotated around its upper-left corner
	    $this->Rotate($angle,$x,$y);
	    $this->Image($file,$x,$y,$w,$h);
	    $this->Rotate(0);
	}
	//Letter (US)	215.9 x 279.4 - 8.5 x 11
	//Oficio/Legal	216   x 356 mm	8,5 x 14,0 pulg
	function pagInicio()
	{	//echo $this->GetX() . " - ". $this->GetY() . "@@@@@@@@"; //mitad 178
		$this->AddPage('L','Legal');
		$this->Image('../../Images/Home/iniFondo.png',0,0,356,216);
		$this->Image('../../Images/Home/iniLogo.png',95,-9,188);
		$this->Image('../../Images/Home/iniFondoblanco.png',0,152,356,29);
		$this->Image('../../Images/Home/logoEPC.png',6,153,31,25);
		$this->Image('../../Images/Home/logoICCU.png',45,154,56,23);
		$this->Image('../../Images/Home/logoIDACO.png',94,153.5,82,28);
		$this->Image('../../Images/Home/logoSECTIC.png',178,155,68,25);
		$this->Image('../../Images/Home/logoSECPLANEACION.png',240,153,119,27);

		$this->Image('../../Images/Home/certificaciones.png',64,183,60);
		$this->Image('../../Images/Home/jera.png',120,183,120);
		$this->Image('../../Images/Home/unidos_podemos_mas.png',235,181,98);
		//$this->SetXY(150,50);
		//$this->Output();
	}
	//Letter (US)	215.9 x 279.4 - 8.5 x 11
	//Oficio/Legal	216   x 356 mm	8,5 x 14,0 pulg
	function consulta($cx,$id){
		$sql = "WITH mpio AS (
					SELECT tm.id_gestion,string_agg(pm.nombre_mun::text, ', '::text) AS municipio,string_agg(pm.codigo_mun::text, ', '::text) AS codigo_municipio 
					 FROM seguimientopdd.sa_t_mpio tm INNER JOIN administrativa.g_municipio_simp pm on tm.codigo_mun = pm.codigo_mun 
					 GROUP BY tm.id_gestion 
					 ), sec AS ( 
					SELECT tc.id_gestion,  
						 string_agg(pc.nombre::text, ', '::text) AS centro,string_agg(pc.id::text, ', '::text) AS id_centrog 
					 FROM seguimientopdd.sa_t_centro_gestor tc INNER JOIN  
					 seguimientopdd.vw_centro_gestor pc on tc.id_centro::text = pc.id 
					 GROUP BY tc.id_gestion)
					, met as (  				  				
					SELECT mt.id_gestion,string_agg(mt.cod_meta::text, ', '::text) AS meta 
					 FROM seguimientopdd.sa_t_meta mt  
					 GROUP BY mt.id_gestion)
					, str as (  				  				
					SELECT sc.id_gestion,string_agg(psa.nom_sector::text, ', '::text) AS nom_sector,string_agg(psa.id::text, ', '::text) AS id_sector 
					 FROM seguimientopdd.sa_t_sector sc INNER JOIN seguimientopdd.sa_p_sector psa on sc.id_sector = psa.id  
					 GROUP BY sc.id_gestion)
					, cto as (  
					SELECT ct.id_gestion,string_agg(ct.enlace_secop::text, ', '::text) AS enlace_secop,fte_nacional,fte_depto,fte_mpio,fte_sgp,fte_regalias,descripcion_fte_otros,fte_otros 
					 FROM seguimientopdd.sa_t_contrato ct   
					 GROUP BY ct.id_gestion,fte_nacional,fte_depto,fte_mpio,fte_sgp,fte_regalias,descripcion_fte_otros,fte_otros)
					, pren as (  
					SELECT pp.id_gestion,string_agg(ppa.nom_producto::text, ', '::text) AS nom_producto,string_agg(ppa.id::text, ', '::text) AS id_producto 
					 FROM seguimientopdd.sa_t_prod_prensa pp INNER JOIN seguimientopdd.sa_p_productos_pren ppa on pp.id_producto = ppa.id  
					 GROUP BY pp.id_gestion)
					, img as (  
							select id_gestion,string_agg(url::text||'@'||tipo||'@'||coalesce(fecha::text,''''), ', '::text) AS url from (
							SELECT i.id_gestion,i.url,i.tipo,v.fecha 
							 FROM seguimientopdd.sa_t_adjunto i left join seguimientopdd.sa_t_visita v 
							 on i.id_visita = v.id 
							  GROUP BY i.id_gestion,i.url,i.tipo, i.id_visita,v.fecha 
							  order by i.id_gestion,i.id_visita NULLS first,v.fecha 
							) t GROUP BY id_gestion
					 )
					 select a.fecha,c.nom_categoria,a.noticia,a.descripcion,avance_porcentaje,COALESCE(meta, '') meta,municipio codigo_mun,nom_sector,centro,responsable_nom,responsable_tel,responsable_email,COALESCE(responsable_nom_ext, '') responsable_nom_ext,COALESCE(responsable_tel_ext, '') responsable_tel_ext,COALESCE(responsable_email_ext, '') responsable_email_ext,COALESCE(enlace_secop, '') enlace_secop, 
						to_char(fte_nacional, 'FM$999,999,999,990') fte_nacional,to_char(fte_depto, 'FM$999,999,999,990') fte_depto,to_char(fte_mpio, 'FM$999,999,999,990') fte_mpio,to_char(fte_sgp, 'FM$999,999,999,990') fte_sgp,to_char(fte_regalias, 'FM$999,999,999,990') fte_regalias,descripcion_fte_otros,to_char(fte_otros, 'FM$999,999,999,990') fte_otros,to_char(vr_fuentes, 'FM$999,999,999,990') vr_fuentes,a.empleos_gen_indirecto,a.empleos_gen_directo,
						to_char(a.pbeneficiadas, '999,999,999,990') pbeneficiadas,a.areaint,nom_producto,m.id_gestion,url,a.resultado,codigo_municipio,c.id id_categoria,id_sector,id_centrog,id_producto,
						a.id_convenio,conv.tipoc tipo_conv,a.id_estado,id_tipoc,id_subtipoc,semaforo,vr_pagado,und,valor,objeto,nom_tipo,nom_subtipo,
						seguimientopdd.get_gestion_fecha_actualizacion($id) fecha_actualizacion,nro_con
						,fec_inicio,plazo_dias,fec_proy_finalizacion,fec_terminacion
					 from seguimientopdd.sa_t_gestion a  
					 left join seguimientopdd.sa_t_convenio conv on a.id_convenio = conv.id 
					 left join sec s on a.id = s.id_gestion  
					 left join seguimientopdd.sa_p_categoria c on a.id_categoria = c.id 
					 left join met e on a.id = e.id_gestion 
					 left join mpio m on a.id = m.id_gestion 
					 left join str r on a.id = r.id_gestion 
					 left join cto o on a.id = o.id_gestion 
					 left join pren p on a.id = p.id_gestion 
					 left join img i on a.id = i.id_gestion 
					 left join seguimientopdd.sa_p_con_tipo tip on tip.id = a.id_tipoc 
					 left join seguimientopdd.sa_p_con_subtipo stp on stp.id = a.id_subtipoc
					 where a.id=$id
					 order by a.fecha desc,id_gestion desc"; //echo $sql;	//echo getcwd() . "\n";
		$resultado = pg_query($cx,$sql) or die(pg_last_error());
		//echo getcwd() . "\n";
		//$this->Cell(340,6,utf8_decode($sql),1,null,"C");
		$total_filas = pg_num_rows($resultado);

		while ($fila = pg_fetch_assoc($resultado)) {
			$this->AddPage('L','Legal');
			$this->Image('../../Images/Home/unidos_podemos_mas_fondo.png',0,190,98);
			$this->SetFont('Arial','B',33);	//$this->SetFont('Arial','B',11);
			$this->SetTextColor(3,35,61);	$this->SetXY(20,20);
			$this->Cell(340,6,utf8_decode("Evolución"),0,null,"L");
			$this->SetXY(20,50);			//% DE AVANCE
			$this->SetFont('Arial','B',22);	//MUNICIPIO
			$this->Cell(130,6,utf8_decode("% Avance: ".$fila["avance_porcentaje"]),0,null,"L");
			$this->Image('../../Images/'.$fila["semaforo"].'.jpg',20,65,100);
			//Municipio
			$this->SetXY(20,120);
			$this->Cell(130,6,utf8_decode("Municipio:"),0,null,"L");		//"Municipio:"
			$this->SetXY(20,132);
			$this->SetFont('Arial','',20);
			$this->Cell(130,6,utf8_decode($fila["codigo_mun"]),0,null,"L");	//$fila["codigo_mun"]
			//Nombre de PROYECTO
			$this->SetXY(160,20);
			$this->SetFont('Arial','B',20);
			$this->Cell(160,6,utf8_decode("Nombre Proyecto:"),0,null,"L");
			$this->SetXY(160,32);
			$this->SetFont('Arial','',18);
			$this->Multicell(160,6, iconv('UTF-8', 'windows-1252', $fila["descripcion"]),0,"J");
			//Valor Proyecto
			$this->SetXY(160,70);
			$this->SetFont('Arial','B',33);
			$this->Cell(160,6,utf8_decode("Valor: ".$fila["vr_fuentes"]),0,null,"L");
			//Número Contrato Obra
			$this->SetXY(160,100);
			$this->SetFont('Arial','B',18);
			$this->WriteHTML(utf8_decode("<b>Número Contrato Obra:</b> ".$fila["nro_con"]));
			//Plazo Ejecución
			$this->SetXY(160,115);
			$this->WriteHTML(utf8_decode("<b>Plazo ejecución:</b> ".$fila["plazo_dias"]." días."));
			//Plazo Ejecución
			$this->SetXY(160,130);
			$this->WriteHTML(utf8_decode("<b>Fecha Inicio:</b> ".$fila["fec_inicio"]."."));
			//Plazo Ejecución
			$this->SetXY(160,145);
			$this->WriteHTML(utf8_decode("<b>Fecha Fin inicial:</b> ".$fila["fec_proy_finalizacion"]."."));
			$vfec_terminacion = $fila["fec_terminacion"];
			if($fila["fec_terminacion"] == "") $vfec_terminacion = $fila["fec_proy_finalizacion"];
			//Plazo Ejecución
			$this->SetXY(160,160);
			$this->WriteHTML('<p align="rigth"><b>Fecha Fin con modificaciones:</b> '.$vfec_terminacion.'.</p>');
			//$this->Cell(160,6,utf8_decode("Número Contrato Obra: ".$fila["nro_con"]),0,null,"C");
			//Última de Actualización
			$this->SetXY(10,189);
			$this->SetFont('Arial','B',14);
			$this->Cell(340,6,utf8_decode("Última Actualización: ".$fila["fecha_actualizacion"]),0,null,"C");
			/**************************PÁGINA DOS***************************/
			$this->AddPage('L','Legal');
			$this->Image('../../Images/Home/unidos_podemos_mas_fondo.png',0,190,98);
			$this->SetFont('Arial','B',11);
			$this->SetFillColor(46,117,182); $this->SetTextColor(255,255,255);
			$this->Cell(90,6,utf8_decode("Municipio: ".$fila["codigo_mun"]),1,null,"C",1);	//$filas[$count]=$fila; //BELTRAN
			$this->SetFont('Arial','B',10);
			$this->Cell(250,6,utf8_decode($fila["descripcion"]),1,null,"C",1);	//$filas[$count]=$fila; //BELTRAN
			$this->Ln();
			$this->SetFont('Arial','',9);	
			$this->SetFillColor(234,239,247);$this->SetTextColor(3,35,61);
			$this->Multicell(340,6, iconv('UTF-8', 'windows-1252', $fila["objeto"]),1,"J",1);
			$this->SetFillColor(210,222,239);
			$this->Cell(48,6,utf8_decode("% Avance: ".$fila["avance_porcentaje"]),1,null,"L",1);
			$this->Cell(48,6,utf8_decode("Fecha inicio: ".$fila["fecha"]),1,null,"L",1);
			$this->Cell(81,6,utf8_decode("Sector: ".$fila["nom_sector"]),1,null,"L",1);
			$this->Cell(82,6,utf8_decode("Tipo: ".$fila["nom_tipo"]),1,null,"L",1);
			$this->Cell(81,6,utf8_decode("Subtipo: ".$fila["nom_subtipo"]),1,null,"L",1);
			$this->Ln();
			//Fecha de Actualización
			$this->SetXY(10,180);
			$this->SetFont('Arial','B',10);
			$this->Cell(340,6,utf8_decode("Fecha de Actualización: ".$fila["fecha_actualizacion"]),0,null,"C");
			//echo $this->GetX()."----".$this->GetY();	//10-40
			if($fila["id_convenio"]!=""){ //2) Convenio Derivado	1) Convenio Marco
				$sql = "WITH ft AS (
								select id_convenio,string_agg(nom_fuente||': '||to_char(vr_fuente, 'FM$999,999,999,990'), '; '::text) AS fuentes 
									 from seguimientopdd.sa_t_convenio_fte f inner join seguimientopdd.sa_p_fuente pf on f.id_fuente = pf.id group by id_convenio 
							), mt AS (
							select id_convenio,string_agg(cod_meta, ', '::text) AS metas 
								from seguimientopdd.sa_t_convenio_meta group by id_convenio
							), img as (  
							SELECT i.id_convenio,string_agg(i.url::text||'@'||i.tipo, ', '::text) AS url 
							 FROM seguimientopdd.sa_t_adjunto i  
							 GROUP BY i.id_convenio ORDER BY i.id_convenio desc
						 )
					select tipoc,nro_con,objeto,secop_con, nom_tercero||' '||id_tercero tercero,nom_supervisor,nom_interventor,
						fec_suscripcion,fec_inicio,plazo_dias,fec_proy_finalizacion,metas,modificacion_con,fec_terminacion,
						fuentes,to_char(vr_fuentes, 'FM$999,999,999,990') vr_fuentes,to_char(vr_adicion, 'FM$999,999,999,990') vr_adicion
						,to_char(vr_total, 'FM$999,999,999,990') vr_total,observacion,md.id_con_marco,url 
						 from seguimientopdd.sa_t_convenio c inner join ft on c.id = ft.id_convenio
						 inner join mt on c.id = mt.id_convenio 
						 left join seguimientopdd.sa_t_convenio_md md on c.id = md.id_con_derivado 
						 left join img i on c.id = i.id_convenio 
					 where c.id = ".$fila["id_convenio"];
					$res = pg_query($cx,$sql) or die(pg_last_error());
					while ($row = pg_fetch_assoc($res)){
						$this->SetXY(10,46);	//echo $this->GetX() . "   " . $this->GetY();
						$this->SetFont('Arial','B',9);
						$this->SetFillColor(46,117,182); $this->SetTextColor(255,255,255);
						$this->Cell(340,6,utf8_decode("CONVENIO"),1,null,"C",1);
						$this->Ln();
						$this->SetFont('Arial','',9);
						$tipoConvenio = "Marco";
						if($row["tipoc"]=="2") $tipoConvenio = "Derivado";
						$this->SetFillColor(234,239,247);$this->SetTextColor(3,35,61);
						$this->Cell(40,6,utf8_decode("No. convenio: ".$row["nro_con"] ),1,null,"L",1);
						$this->Cell(40,6,utf8_decode("Tipo: ".$tipoConvenio ),1,null,"L",1);
						$this->Cell(200,6,"Tercero: ".iconv('UTF-8', 'windows-1252',$row["tercero"]),1,null,"L",1);
						$this->Cell(60,6,"Metas PDD: ".iconv('UTF-8', 'windows-1252',$row["metas"]),1,null,"L",1);
						$this->Ln();
						$this->SetFillColor(210,222,239);
						$this->Multicell(340,6, iconv('UTF-8', 'windows-1252', $row["objeto"]),1,"J",1);
						$this->Ln();
						$this->SetFillColor(234,239,247);$this->SetTextColor(3,35,61);
						$this->Cell(200,6,utf8_decode("Vr. fuentes: ".$row["fuentes"] ),1,null,"L",1);
						$this->Cell(70,6,utf8_decode("Vr. adición: ".$row["vr_adicion"] ),1,null,"L",1);
						$this->SetFont('Arial','B',9);
						$this->Cell(70,6,utf8_decode("Total: ".$row["vr_total"] ),1,null,"L",1);
						$this->fotos($fila["fecha"],$fila["url"]);
					}
			}
		}
		pg_close($cx);
	}
	function fotos($fecha,$url)
	{	
		$fotos = explode(",", $url);	//print_r($fotos);
		foreach($fotos as $key => $value) {
			$propiedad = explode("@", $fotos[$key]);	//echo $propiedad[0];
			$fechaImagen = $propiedad[2]; if (strlen($fechaImagen) < 4) $fechaImagen = $fecha;
			$multiplo = $key%3;
			if ($multiplo==0){
				$this->AddPage('L','Legal');
				$this->SetFont('Arial','B',33);
				$this->Cell(340,6,utf8_decode("Registro Fotográfico"),0,null,"C");
				$this->Ln();
				$this->Image('../../Images/Home/unidos_podemos_mas_fondo.png',0,190,98);
			}
			$this->SetFont('Arial','',12);
			$miX = ($multiplo*100)+(10*($multiplo+1)); //echo $miX;
			$this->SetXY($miX,30);
			$this->Cell(100,7,utf8_decode($fechaImagen),1,null,"C");
			$urlSaga = '../../../../SIG/'.trim($propiedad[0]);	//print_r(getimagesize($urlSaga))."************";
			list($width, $height) = getimagesize($urlSaga);

				$ratio = $width / $height;
				if( $ratio > 1) {
				    $resized_width = 100; //suppose 500 is max width or height
				    $resized_height = 100/$ratio;
				}
				else {
				    $resized_width = 100*$ratio;
				    $resized_height = 100;
				}

/*			    if ($imageFileType == 'png') {
			        $image = imagecreatefrompng($urlSaga);
			    } else if ($imageFileType == 'gif') {
			        $image = imagecreatefromgif($urlSaga);
			    } else {
			        $image = imagecreatefromjpeg($urlSaga);
			    }

				$resized_image = imagecreatetruecolor($resized_width, $resized_height);
				$miImg = imagecopyresampled($resized_image, $image, 0, 0, 0, 0, $resized_width, $resized_height, $width, $height); */
			$this->Image($urlSaga,$miX,40,$resized_width,$resized_height);

			
		    //echo $propiedad[2];
		}
/*		$this->AddPage('L','Legal');
		$this->SetFont('Arial','B',9);
		$this->Cell(340,6,utf8_decode("Municipio: "),1,null,"C");	*/
		
	}
}
$pdf = new PDF();
$pdf->pagInicio();
$pdf->consulta($cx,$id);
$pdf->Output();
?>
