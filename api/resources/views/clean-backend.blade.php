@php
    $clearroute = Artisan::call('route:clear');
    echo "<span>&#10003;</span> Route clear<br>";
    
    $cacheroute = Artisan::call('route:cache');
    echo "<span>&#10003;</span> Route cache<br>";
    
    $clearcache = Artisan::call('cache:clear');
    echo "<span>&#10003;</span> Cache cleared<br>";

    $clearview = Artisan::call('view:clear');
    echo "<span>&#10003;</span> View cleared<br>";

    $clearconfig = Artisan::call('config:cache');
    echo "<span>&#10003;</span> Config cleared<br>";

    $storagelink = Artisan::call('storage:link');
    echo "<span>&#10003;</span> Storage link<br>";

    $storagelink = Artisan::call('optimize:clear');
    echo "<span>&#10003;</span> Backend Optimized<br>";
@endphp
