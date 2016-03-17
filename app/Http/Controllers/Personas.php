<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Persona;

class Personas extends Controller
{
    /**
     * Return a specific user by email.
     *
     * @return Response
     */
    public function logIn(Request $request) {
        return Persona::where('email', $request->input('email'))->where('contrasena', $request->input('contrasena'))->select('id', 'cedula', 'nombre', 'apellido1', 'apellido2', 'email', 'tipo')->get();
    }
}
