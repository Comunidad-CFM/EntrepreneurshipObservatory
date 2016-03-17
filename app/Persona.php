<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    protected $fillable = array('id', 'ceduala', 'nombre','apellido1','apellido2', 'email', 'contrasena');
}
