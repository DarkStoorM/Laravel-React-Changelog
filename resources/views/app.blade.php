<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1"
          name="viewport">
    <title>{{ config('app.name') }}</title>
    <meta content="{{ csrf_token() }}"
          name="csrf-token">
    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.tsx'])
</head>

<body>
    <div id="app"></div>
</body>

</html>
