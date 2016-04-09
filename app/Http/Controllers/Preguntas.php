<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pregunta;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class Preguntas extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getAll($id = null) {

        return Pregunta::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $pregunta = new Pregunta;

        $pregunta->enunciado = $request->input('enunciado');
        $pregunta->tipo = $request->input('tipo');
        $pregunta->indicador_id = $request->input('indicador_id');

        $pregunta->save();

        return 'true';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return Pregunta::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request) {
        $pregunta = Pregunta::find($request->input('id'));

        $pregunta->enunciado = $request->input('enunciado');
        $pregunta->tipo = $request->input('tipo');
        $pregunta->indicador_id = $request->input('indicador_id');

        $pregunta->save();

        //return "Sucess updating user #" . $pregunta->id;
        return 'true';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request) {
        $pregunta = Pregunta::find($request->input('id'));

        $pregunta->delete();

        return 'true';
    }
}


