<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\PersonasSectore;

class PersonasSectores extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {
        $personaId = $request->input('personaCedula');
        $sectorId = $request->input('sectorId');        


        $personaSector = new PersonasSectore;
        $persornaSector->persona_cedula = $personaId;
        $persornaSector->sector_id = $sectorId;

        $persornaSector->save();
        

        return 'true';
    }
    
}
