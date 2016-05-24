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

        return Aplicacione::join('personas', 'aplicaciones.persona_id', '=', 'personas.id')
        		->where('aplicaciones.encuesta_id', '=', $idEncuesta)
                ->select('aplicaciones.id as idAplicacion', 'personas.id as idPersona', 'personas.nombre', 'personas.apellido1', 'personas.apellido2', 'personas.email', 'personas.tipo','encuestador')
                ->orderBy('aplicaciones.id', 'asc')
                ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $idEncuesta = $request->input('idEncuesta');
        $idPeriodo = $request->input('idPeriodo');
        $fecha = $request->input('fecha');
        $entrepreneursId = substr(json_encode($request->input('entrepreneurs')), 1, -1);
        $entrepreneursId = explode(',', $entrepreneursId);

        foreach ($entrepreneursId as $id) {
            $aplicacion = new Aplicacione;

            $aplicacion->fechaAplicacion = $fecha;
            $aplicacion->encuesta_id = $idEncuesta;
            $aplicacion->persona_id = (int)$id;
            $aplicacion->periodo_id = $idPeriodo;

            $aplicacion->save();
        }

        return 'true';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function destroy($aplications) {
        $aplications = substr(json_encode($aplications), 1, -1);
        $aplications = explode(',', $aplications);

        foreach ($aplications as $id) {
            $aplicacion = Aplicacione::find((int)$id);
            $aplicacion->delete();
        }

        return 'true';
    }

    /**
     * Retorna las aplicaciones(Encuestas) que corresponden a la persona dada.
     *
     * @param  Request  $request
     * @return Response
     */
    public function getAplicacionesByPersona(Request $request) {
      $idPersona = $request->input('persona_id');

      $aplicacion = Aplicacione::select('aplicaciones.id', 'aplicaciones.fechaAplicacion', 'aplicaciones.encuesta_id', 'aplicaciones.persona_id', 'aplicaciones.periodo_id')
          ->where('persona_id', $idPersona)
          ->get();
      return $aplicacion;
    }
}
