<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'fullname' => 'Sishir Dangi',
                'gender' => 'male',
                'phone_number' => '9841185811',
                'email' => 'ccrdangi01@gmail.com',
                'password' => Hash::make('1234567890'),
                'role_id' => 1,
            ],
          
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}