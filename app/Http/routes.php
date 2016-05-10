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
    Route::post('personas/update', 'Personas@update');
    Route::delete('personas/destroy/{id}', 'Personas@destroy');
    Route::get('personas/todas', 'Personas@getAll');
    Route::get('personas/getByType/{type}', 'Personas@getByType');
    Route::get('personas/isPass/{id}/{currentPass}', 'Personas@isPass');
    Route::post('personas/changePass', 'Personas@changePass');

    // Preguntas.
    Route::post('preguntas/registro', 'Preguntas@store');
    Route::get('preguntas/todas', 'Preguntas@getAll');
    Route::post('preguntas/editar', 'Preguntas@update');
    Route::delete('preguntas/destroy/{id}', 'Preguntas@destroy');

    // Encuestas.
    Route::post('encuestas/registro', 'Encuestas@store');
    Route::get('encuestas/todas', 'Encuestas@getAll');    
    Route::post('/encuestas/update', 'Encuestas@update');
    Route::delete('/encuestas/destroy/{id}', 'Encuestas@destroy');
    Route::post('/encuestas/changeState', 'Encuestas@changeState');
    Route::get('/encuestas/getQuestions/{id}', 'Encuestas@getQuestions');

    // EncuestasPreguntas.
    Route::post('/encuestasPreguntas/store', 'EncuestasPreguntas@store');
    Route::delete('/encuestasPreguntas/destroy/{questions}', 'EncuestasPreguntas@destroy');

    // Aplicaciones.
    Route::post('/aplicaciones/getForSurvey', 'Aplicaciones@getForSurvey');
    Route::post('/aplicaciones/store', 'Aplicaciones@store');
    Route::delete('/aplicaciones/destroy/{aplications}', 'Aplicaciones@destroy');

    // Indicadores.
    Route::get('indicadores/todos', 'Indicadores@getAll');

    // Sectores.
    Route::get('sectores/todos', 'Sectores@getAll');
    Route::post('sectores/registro', 'Sectores@store');
    Route::delete('sectores/destroy/{id}', 'Sectores@destroy');
    Route::post('sectores/editar/', 'Sectores@update');

    // Regiones.
    Route::get('regiones/todas','Regiones@getAll');

    // Territorios.
    Route::get('territorios/todos','Territorios@getAll');

    //TerritoriosSectores
    Route::post('territoriosSectores/registro','TerritoriosSectores@store');
    Route::post('territoriosSectores/editar/', 'TerritoriosSectores@update');
    Route::get('territoriosSectores/ifExist/', 'TerritoriosSectores@ifExist');
    Route::post('territoriosSectores/getBySectorId/', 'TerritoriosSectores@getBySectorId');
    
    // Periodos.
    Route::get('/periodos/getForAplicacion','Periodos@getForAplicacion');
    Route::get('/periodos/getAll','Periodos@getAll');

    // PersonasSectores
    Route::post('personasSectores/registro','PersonasSectores@store');
    Route::post('personasSectores/getByPersonId','PersonasSectores@getByPersonId');
    Route::post('personasSectores/update','PersonasSectores@update');
});
