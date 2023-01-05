<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/cleareverything', function () {
    
    $clearroute = Artisan::call('route:clear');
    echo "Route clear<br>";
    
    $cacheroute = Artisan::call('route:cache');
    echo "Route cache<br>";
    
    $clearcache = Artisan::call('cache:clear');
    echo "Cache cleared<br>";

    $clearview = Artisan::call('view:clear');
    echo "View cleared<br>";

    $clearconfig = Artisan::call('config:cache');
    echo "Config cleared<br>";

    $storagelink = Artisan::call('storage:link');
    echo "Storage link<br>";

});
