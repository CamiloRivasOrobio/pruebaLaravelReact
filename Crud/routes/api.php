<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
//Rutas actividades
Route::get('/getActivities', 'App\Http\Controllers\ActivityController@getActivities')->name('getActivities');
Route::post('/createActivities', 'App\Http\Controllers\ActivityController@createActivities')->name('createActivities');
Route::put('/updateActivities', 'App\Http\Controllers\ActivityController@updateActivities')->name('updateActivities');
Route::delete('/deleteActivities/{id}', 'App\Http\Controllers\ActivityController@deleteActivities')->name('deleteActivities');
//Rutas fechas
Route::get('/getDateId', 'App\Http\Controllers\DatesController@getDateId')->name('getDateId');
Route::get('/getDateId/{id}', 'App\Http\Controllers\DatesController@getDateId')->name('getDateId');
Route::post('/createDates', 'App\Http\Controllers\DatesController@createDates')->name('createDates');
Route::put('/updateDates', 'App\Http\Controllers\DatesController@updateDates')->name('updateDates');
Route::delete('/deleteDates/{id}', 'App\Http\Controllers\DatesController@deleteDates')->name('deleteDates');