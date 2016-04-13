<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Aplicacione;

class Aplicaciones extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getAll() {
        return Aplicacione::all();
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getForSurvey(Request $request) {
    	$idEncuesta = $request->input('idEncuesta');

        /*return Aplicacione::join('personas', 'aplicaciones.persona_id', '=', 'personas.id')
        		->where('aplicaciones.encuesta_id', '=', $encuesta_id)
                ->select('aplicaciones.id as idAplicacion', 'personas.id as idPersona', 'personas.nombre', 'personas.apellido1', 'personas.apellido2', 'personas.email', 'personas.tipo')
                ->orderBy('aplicaciones.id', 'asc')
                ->get();*/

        return Aplicacione::join('personas', 'aplicaciones.persona_id', '=', 'personas.id')
        		->where('aplicaciones.encuesta_id', '=', $idEncuesta)
                ->select('aplicaciones.id as idAplicacion', 'personas.id as idPersona', 'personas.nombre', 'personas.apellido1', 'personas.apellido2', 'personas.email', 'personas.tipo')
                ->orderBy('aplicaciones.id', 'asc')
                ->get();
    }
}
