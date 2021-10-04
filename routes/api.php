<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('documents', 'DocumentController@index');

Route::post('documents/create', 'DocumentController@create');

Route::get('document/{id}', 'DocumentConfigurationController@getDocument');