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
        $personaId = $request->input('personaId');
        $sectoresId = $request->input('sectoresId');   
        
        foreach ($sectoresId as $id) {
            $personaSector = new PersonasSectore;                     
            $personaSector->sector_id = $id;                    
            $personaSector->persona_id = $personaId;        

            $personaSector->save();        
        }
        return 'true';
    }
    
}
