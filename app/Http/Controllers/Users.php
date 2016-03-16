<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\USer;

class Users extends Controller
{
    /**
     * Return a specific user by email.
     *
     * @return Response
     */
    public function getUserByEmail(Request $request) {
        return User::where('email', $request->input('email'))
            ->select('id', 'name')
            ->get();
    }
}
