<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TourType extends Model
{
    protected $fillable = ['name'];

    public function tourPackages()
    {
        return $this->hasMany(TourPackage::class);
    }
}