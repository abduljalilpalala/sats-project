@php
    $clearroute = Artisan::call('migrate:fresh');
    echo "<span>&#10003;</span> Database Migrated Fresh<br>";

    $clearroute = Artisan::call('db:seed');
    echo "<span>&#10003;</span> Database Seeded Fresh<br>";
@endphp
