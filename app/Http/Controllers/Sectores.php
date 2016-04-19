<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Sectore;

class Sectores extends Controller
{
    public function getAll() {    	
        return Sectore::all();
    }
}
