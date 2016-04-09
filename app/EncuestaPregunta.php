<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EncuestaPregunta extends Model
{
    protected $fillable = array('id', 'pregunta_id', 'encuesta_id');
    protected $hidden = array('created_at', 'updated_at');
}
