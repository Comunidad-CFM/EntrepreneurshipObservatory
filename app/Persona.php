<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    protected $fillable = array('id', 'cedula', 'nombre','apellido1','apellido2', 'email', 'contrasena','tipo');
    protected $hidden = array('updated_at', 'created_at');
}
