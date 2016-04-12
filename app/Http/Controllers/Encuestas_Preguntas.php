<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Encuestas_Pregunta;

class Encuestas_Preguntas extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $encuestaId = $request->input('encuestaId');
        $questionsId = substr(json_encode($request->input('questions')), 1, -1);
        $questionsId = explode(',', $questionsId);

        foreach ($questionsId as $id) {
            $encuestas_Pregunta = new Encuestas_Pregunta;

            $encuestas_Pregunta->pregunta_id = (int)$id;
            $encuestas_Pregunta->encuesta_id = $encuestaId;

            //$encuestas_Pregunta->save();
        }

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
