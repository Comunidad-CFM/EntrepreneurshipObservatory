<?php

namespace App\Http\Controllers;
use App\TerritoriosSectore;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;


class TerritoriosSectores extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request) {     

        $territorioSector = new TerritoriosSectore;        
        $territorioSector->sector_id = $request->input('sector_id');
        $territorioSector->territorio_id = $request->input('territorio_id');
        
        $territorioSector->save();

        return 'true';
    }
}
