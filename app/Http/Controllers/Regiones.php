<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Regione;

class Regiones extends Controller
{
    public function getAll() {    
        return Regione::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response id if all its okay
     */
    public function store(Request $request) {     
        $region = new Regione;        
        $region->nombre = $request->input('nombre');
        $region->descripcion = $request->input('descripcion');

        $region->save();

        return 'true';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function destroy($id) {                  
        $region = Regione::find($id);
        $region->delete();

        return 'true';
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function update(Request $request) {
        $region = Regione::find($request->input('id'));
        $region->nombre = $request->input('nombre');  
        $region->descripcion = $request->input('descripcion');                
        
        $region->save();

        return 'true';
    }
}
