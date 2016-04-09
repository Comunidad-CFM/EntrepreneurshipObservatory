<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Persona;
use App\Indicadore;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        DB::table('personas')->delete();

        $users = array(
                ['cedula' => '2-0723-0152', 'nombre' => 'Fauricio', 'apellido1' => 'Rojas', 'apellido2' => 'Hernandez', 'tipo' => 'A', 'email' => 'fauri@gmail.com', 'contrasena' => md5('12345')],
                ['cedula' => '2-0735-0236', 'nombre' => 'Manfred', 'apellido1' => 'Artavia', 'apellido2' => 'Gomez', 'tipo' => 'A', 'email' => 'manfred@gmail.com', 'contrasena' => md5('12345')],
                ['cedula' => '1-1415-0859', 'nombre' => 'Carlos', 'apellido1' => 'Jimenez', 'apellido2' => 'Gonzalez', 'tipo' => 'A', 'email' => 'carlos@gmail.com', 'contrasena' => md5('12345')],
                ['cedula' => '8-8888-8888', 'nombre' => 'Cristian', 'apellido1' => 'Salas', 'apellido2' => 'Salazar', 'tipo' => 'B', 'email' => 'cristian@gmail.com', 'contrasena' => md5('12345')],
                ['cedula' => '9-9999-9999', 'nombre' => 'Kenneth', 'apellido1' => 'Perez', 'apellido2' => 'Alfaro', 'tipo' => 'B', 'email' => 'kenneth@gmail.com', 'contrasena' => md5('12345')]
        );
        
        DB::table('indicadores') -> delete();
        $indicadores = array(
            ['nombre' => 'Monto de negocio','descripcion' => 'Monto de negocio'],
            ['nombre' => 'Empleo','descripcion' => 'Empleo'],
            ['nombre' => 'Inversion','descripcion' => 'Inversion'],            
            ['nombre' => 'Precio','descripcion' => 'Precio'],
            ['nombre' => 'Coste total','descripcion' => 'Coste total']
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user) {
            Persona::create($user);        
        }
        
        foreach ($indicadores as $indicador) {
            Indicadore::create($indicador);        
        }

        Model::reguard();
    }
}
