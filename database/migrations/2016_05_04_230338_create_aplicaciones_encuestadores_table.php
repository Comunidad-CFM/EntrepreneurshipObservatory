<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAplicacionesEncuestadoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aplicaciones_encuestadores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('aplicacion_id')->unsigned();
            $table->integer('encuestador_id')->unsigned();
            $table->timestamps();
            
        });
        Schema::table('aplicaciones_encuestadores', function (Blueprint $table) {
            $table->foreign('aplicacion_id')->references('id')->on('personas')->onDelete('cascade');
            $table->foreign('encuestador_id')->references('id')->on('aplicaciones')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('aplicaciones_encuestadores');
    }
}
