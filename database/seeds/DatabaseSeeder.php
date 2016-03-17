<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\Persona;

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
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user) {
            Persona::create($user);
        }

        Model::reguard();
    }
}
