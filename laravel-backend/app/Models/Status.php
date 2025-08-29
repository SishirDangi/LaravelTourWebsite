<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $fillable = ['name'];

    public function messages()
    {
        return $this->hasMany(ContactMessage::class);
    }

    public function tourPackages()
    {
        return $this->hasMany(TourPackage::class);
    }
}