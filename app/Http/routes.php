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
    Route::post('login', 'Personas@logIn');
    Route::post('personas/registro', 'Personas@store');
    Route::post('personas/ifExist', 'Personas@ifExist');
    Route::post('personas/editarPers', 'Personas@update');
    Route::post('personas/eliminarPers', 'Personas@remove');
    Route::post('preguntas/registro', 'Indicadores@store');
    Route::get('personas/todas', 'Personas@getAll');
    Route::get('personas/empresarios', 'Personas@getBusinessmen');
    Route::post('encuestas/registro', 'Encuestas@store');
    Route::get('encuestas/todas', 'Encuestas@getAll');
    Route::get('indicadores/todos', 'Indicadores@getAll');
    Route::post('preguntas/registro', 'Preguntas@store');
    Route::get('preguntas/todas', 'Preguntas@getAll');
    Route::post('preguntas/editar', 'Preguntas@update');
    Route::post('preguntas/eliminar', 'Preguntas@destroy');
    Route::post('/encuestas/update', 'Encuestas@update');
    Route::post('/encuestas/remove', 'Encuestas@remove');
    Route::post('/encuestas/changeState', 'Encuestas@changeState');
    Route::post('/encuestas/getQuestions', 'Encuestas@getQuestions');
    Route::post('/encuestasPreguntas/store', 'EncuestasPreguntas@store');
    Route::post('/encuestasPreguntas/remove', 'EncuestasPreguntas@remove');

    Route::post('/aplicaciones/getForSurvey', 'Aplicaciones@getForSurvey');

});
