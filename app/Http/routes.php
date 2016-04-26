<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['prefix' => 'api'], function () {
    // Login.
    Route::post('login', 'Personas@logIn');

    // Personas.
    Route::post('personas/registro', 'Personas@store');
    Route::post('personas/ifExist', 'Personas@ifExist');
    Route::post('personas/editarPers', 'Personas@update');
    Route::post('personas/eliminarPers', 'Personas@remove');
    Route::get('personas/todas', 'Personas@getAll');
    Route::get('personas/empresarios', 'Personas@getBusinessmen');

    // Preguntas.
    Route::post('preguntas/registro', 'Preguntas@store');
    Route::get('preguntas/todas', 'Preguntas@getAll');
    Route::post('preguntas/editar', 'Preguntas@update');
    Route::post('preguntas/eliminar', 'Preguntas@destroy');
    Route::post('preguntas/registro', 'Indicadores@store');

    // Encuestas.
    Route::post('encuestas/registro', 'Encuestas@store');
    Route::get('encuestas/todas', 'Encuestas@getAll');    
    Route::post('/encuestas/update', 'Encuestas@update');
    Route::post('/encuestas/remove', 'Encuestas@remove');
    Route::post('/encuestas/changeState', 'Encuestas@changeState');
    Route::post('/encuestas/getQuestions', 'Encuestas@getQuestions');

    // EncuestasPreguntas.
    Route::post('/encuestasPreguntas/store', 'EncuestasPreguntas@store');
    Route::post('/encuestasPreguntas/remove', 'EncuestasPreguntas@remove');

    // Aplicaciones.
    Route::post('/aplicaciones/getForSurvey', 'Aplicaciones@getForSurvey');
    Route::post('/aplicaciones/store', 'Aplicaciones@store');
    Route::post('/aplicaciones/remove', 'Aplicaciones@remove');

    // Indicadores.
    Route::get('indicadores/todos', 'Indicadores@getAll');

    // Sectores.
    Route::get('sectores/todos', 'Sectores@getAll');

    // Regiones.
    Route::get('regiones/todas','Regiones@getAll');

    // Territorios.
    Route::get('territorios/todos','Territorios@getAll');
    
    // Periodos.
    Route::get('/periodos/getForAplicacion','Periodos@getForAplicacion');

    //PersonasSectores
    Route::post('personasSectores/registro','PersonasSectores@store');
});
