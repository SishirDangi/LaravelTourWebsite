<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = ['name'];

    public function tourPackages()
    {
        return $this->hasMany(TourPackage::class);
    }
}