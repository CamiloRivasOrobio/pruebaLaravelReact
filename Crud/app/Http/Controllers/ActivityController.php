<?php

namespace App\Http\Controllers;

use App\Models\activities;
use Illuminate\Http\Request;
use App\Models\Dates;
use App\Models\Activity;
use DB, Auth;

class ActivityController extends Controller
{
    /**
     * Este metodo lista todas las actividades
     * 
     * @return json lista de actividades
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function getActivities()
    {
        try {
            $activities = DB::table('activities')->select('*')
                ->orderby('created_at', 'ASC')
                ->get();
            return response()->json($activities);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo almacena una actividad
     * 
     * @param request es un objeto con los parámetros del modelo Activity
     * @return json respuesta cambiante
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function createActivities(Request $activity)
    {
        try {
            activities::create([
                'title' => $activity->get('title'),
                'description' => $activity->get('description'),
            ]);
            return "Se ha registrado con exito!!";
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo modifica una actividad
     * 
     * @param request es un objeto con los parámetros del modelo Activity
     * @return json lista de actividades
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function updateActivities(Request $activity)
    {
        try {
            DB::table('activities')
                ->where('id', $activity->get('id'))
                ->update([
                    'title' => $activity->get('title'),
                    'description' => $activity->get('description'),
                ]);
            return "Se ha actualizado con exito!!";
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    /**
     * Este metodo elimina una actividad
     * 
     * @param id de la actividad
     * @return json lista de actividades
     * @author  Camilo Rivas
     * @version 
     * @since   2021-05-14
     */
    public function deleteActivities($id)
    {
        try {
            DB::table('activities')
                ->where('id', $id)
                ->delete();
            return "Se ha eliminado el registro con exito!!";
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}