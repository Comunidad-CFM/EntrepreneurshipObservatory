<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Personas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cedula', 11);
            $table->string('nombre', 20);
            $table->string('apellido1', 50);
            $table->string('apellido2', 50);
            $table->string('tipo', 1);
            $table->string('email', 50);
            $table->string('contrasena', 50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('Personas');
    }
}
