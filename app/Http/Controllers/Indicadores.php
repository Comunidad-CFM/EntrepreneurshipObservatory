<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Indicadore;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class Indicadores extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getAll($id = null) {

        return Indicadore::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $indicador = new Indicadore;

        $indicador->nombre = $request->input('nombre');
        $indicador->descripcion = $request->input('descripcion');

        $indicador->save();

        return 'Indicador record successfully created with id ' . $indicador->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id) {
        return Indicador::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id) {
        $indicador = Indicador::find($id);

        $indicador->nombre = $request->input('nombre');
        $indicador->descripcion = $request->input('descripcion');
        $indicador->save();

        return "Sucess updating user #" . $indicador->id;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Request $request) {
        $indicador = Indicador::find($request->input('id'));

        $indicador->delete();

        return "Indicador record successfully deleted #" . $request->input('id');
    }
}

