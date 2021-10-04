<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::get('/test', function (Request $request) {
//     return "Hello";
// });
Route::get('documents', 'DocumentController@index');

Route::post('documents/create', 'DocumentController@create');

Route::get('document/{id}', 'DocumentConfigurationController@getDocument');