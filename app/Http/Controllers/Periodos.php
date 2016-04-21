<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Periodo;

class Periodos extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getForAplicacion(Request $request) {
        return Periodo::where('anio', $request->input('anio'))->where('cuatrimestre', $request->input('cuatrimestre'))->select('id')->get();
    }
}
