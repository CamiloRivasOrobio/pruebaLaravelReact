<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dates extends Model
{
    public $table = 'dates';

    protected $fillable = [
        // El codigo unico de la tabla (es autoincrementable)
        'id', 
        // Fecha de la actividad
        'date', 
        // Horas de la actividad
        'hours', 
        // Id de al actividad (Relaciona las tablas)
        'activity_id',
    ];
}
