<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class activities extends Model
{
    public $table = 'activities';

    protected $fillable = [
        // El codigo unico de la tabla (es autoincrementable)
        'id',
        // Titulo de la actividad (Encabezado)
        'title',
        // Descripcion de la actividad
        'description', 
    ];
}
