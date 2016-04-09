<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Encuestapregunta;

class EncuestaPreguntas extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $encuestaPreguntas = new EncuestaPreguntas;

        $encuestaPreguntas->pregunta_id = $request->input('pregunta_id');
        $encuestaPreguntas->encuesta_id = $request->input('encuesta_id');

        $encuestaPreguntas->save();

        return 'true';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function remove(Request $request) {
        $encuestaPreguntas = EncuestaPreguntas::find($request->input('id'));

        $encuestaPreguntas->delete();

        return 'true';
    }
}
