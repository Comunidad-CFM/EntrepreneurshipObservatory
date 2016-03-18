<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Persona;

class Personas extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {       
        $persona = new Persona;

        $persona->cedula = $request->input('cedula');
        $persona->nombre = $request->input('nombre');
        $persona->apellido1 = $request->input('apellido1');
        $persona->apellido2 = $request->input('apellido2');
        $persona->email = $request->input('email');
        $persona->contrasena = $request->input('contrasena');
        $persona->tipo = $request->input('tipo');        
        
        $persona->save();

        return 'true';
    }
    
    /**
     * Return a specific user by email.
     *
     * @return Response
     */
    public function logIn(Request $request) {
        return Persona::where('email', $request->input('email'))->where('contrasena', md5($request->input('contrasena')))->select('id', 'cedula', 'nombre', 'apellido1', 'apellido2', 'email', 'tipo')->get();
    }

    public function getAll() {
        return Persona::all();
    }
}
