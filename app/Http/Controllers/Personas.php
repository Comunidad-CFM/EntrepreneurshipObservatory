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
        $persona->contrasena = md5($request->input('contrasena'));
        $persona->tipo = $request->input('tipo');        
        
        $persona->save();

        return 'true';
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update(Request $request) {
        $persona = Persona::find($request->input('id'));
        $persona->nombre = $request->input('nombre');  
        $persona->apellido1 = $request->input('apellido1');
        $persona->apellido2 = $request->input('apellido2');
        $persona->email = $request->input('email');          
        $persona->cedula = $request->input('cedula');   
        
        $persona->save();

        return 'true';
    }
    
    /**
     * Verify an existing email
     *
     * @param  Request  $request
     * @return Response
     */
    public function ifExist(Request $request) {
        return Persona::where('email', $request->input('email'))->select('email')->get();        
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
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function remove(Request $request) {          
        $persona = Persona::find($request->input('id'));

        $persona->delete();

        return 'true';
    }

    /**
     * Get all bussinessmen of the database.
     *
     * @param  Request  $request
     * @return Response
     */
    public function getBusinessmen() {
        return Persona::where('tipo', 'B')->get();  
    }
}
