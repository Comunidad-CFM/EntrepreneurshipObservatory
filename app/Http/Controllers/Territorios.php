<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Territorio;

class Territorios extends Controller
{
    public function getAll() {     
        return Territorio::all();
    }
}
