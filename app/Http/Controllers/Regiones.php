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
}
