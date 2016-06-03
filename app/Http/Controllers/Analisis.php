<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Aplicacione;

class Analisis extends Controller
{
    function get($idPeriodo) {
    	return Aplicacione::join('aplicaciones_respuestas', 'aplicaciones.id', '=', 'aplicaciones_respuestas.aplicacion_id')
    			->join('preguntas', 'preguntas.enunciado', '=', 'aplicaciones_respuestas.pregunta')
    			->join('indicadores', 'indicadores.id', '=', 'preguntas.indicador_id')
    			->select('aplicaciones.id', 'aplicaciones_respuestas.respuesta', 'indicadores.nombre')
    			->where('aplicaciones.periodo_id', '=', $idPeriodo)
    			->get();
    }
}
