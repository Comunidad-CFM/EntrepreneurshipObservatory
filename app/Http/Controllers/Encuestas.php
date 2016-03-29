<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Encuesta;

class Encuestas extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {       
        $encuesta = new Encuesta;

        $encuesta->descripcion = $request->input('descripcion');
        $encuesta->estado = $request->input('estado');
        $encuesta->fechaCreacion = $request->input('fechaCreacion');
        $encuesta->fechaModificacion = $request->input('fechaModificacion');
        $encuesta->persona_id = $request->input('persona_id');
        
        $encuesta->save();

        return 'true';
    }

    public function getAll() {
        return Encuesta::all();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request) {
        $encuesta = Encuesta::find($request->input('id'));

        $encuesta->descripcion = $request->input('descripcion');
        $encuesta->fechaModificacion = $request->input('fecha');

        $encuesta->save();

        return 'true';
    }
}
