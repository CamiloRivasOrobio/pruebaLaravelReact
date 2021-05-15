<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dates;
use App\Models\Activity;
use Illuminate\Support\Facades\Log;
use DB;

class DatesController extends Controller
{
    /**
     * Este metodo lista las fechas de cada actividad
     * 
     * @return json lista de fechas
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function getDate()
    {
        try {
            $dates = DB::table('activities')->select('dates.*')
                ->join('dates', 'dates.activity_id', '=', 'activities.id')
                ->orderby('created_at', 'ASC')
                ->get();
            return response()->json($dates);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo lista las fechas de cada actividad por la id de la actividad
     * 
     * @param id id de la actividad
     * @return json lista de fechas
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function getDateId($id)
    {
        try {
            $dates = DB::table('activities')->select('dates.*')
                ->join('dates', 'dates.activity_id', '=', 'activities.id')
                ->where('activities.id', '=', $id)
                ->orderby('created_at', 'ASC')
                ->get();
            return response()->json($dates);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo almacena una fecha
     * 
     * @param request es un objeto con los parámetros del modelo Dates
     * @return json respuesta cambiante
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function createDates(Request $dates)
    {
        try {
            $sum = $dates->get('hours');
            $hours = DB::table('activities')->select('dates.hours')
                ->join('dates', 'dates.activity_id', '=', 'activities.id')
                ->where('activities.id', '=', $dates->get('activity_id'))
                ->get();
            foreach ($hours as $hours) {
                $sum = $sum + $hours->hours;
            }
            if (8 >= $sum) {
                Dates::create([
                    'date' => $dates->get('date'),
                    'hours' => $dates->get('hours'),
                    'activity_id' => $dates->get('activity_id')
                ]);
                return "Se ha registrado con exito!";
            } else {
                return redirect()->route('dates')
                    ->with("mensaje", 'invalid');
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo actualiza una fecha
     * 
     * @param request es un objeto con los parámetros del modelo Dates
     * @return json respuesta cambiante
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function updateDates(Request $dates)
    {
        try {
            $sum = $dates->get('hours');
            $hours = DB::table('activities')->select('dates.hours')
                ->join('dates', 'dates.activity_id', '=', 'activities.id')
                ->where('activities.id', '=', $dates->get('activity_id'))
                ->get();
            foreach ($hours as $hours) {
                $sum = $sum + $hours->hours;
            }
            if (8 >= $sum) {
                DB::table('dates')
                ->where('id', $dates->get('id'))
                ->update([
                    'date' => $dates->get('date'),
                    'hours' => $dates->get('hours'),
                    'activity_id' => $dates->get('activity_id')
                ]);
                return "Se ha actualizado con exito!";
            } else {
                return redirect()->route('dates')
                    ->with("mensaje", 'invalid');
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo elimina una fecha
     * 
     * @param request es un objeto con los parámetros del modelo Dates
     * @return json respuesta cambiante
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function deleteDates($id)
    {
        try {
            DB::table('dates')
                ->where('id', $id)
                ->delete();
            return "Se ha eliminado el registro con exito!!";
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
