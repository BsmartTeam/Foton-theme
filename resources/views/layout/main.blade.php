<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="css/main.css">
        <title>SaaS Home &#8211; Foton</title>
    </head>
<body>
    @include('sections.hero')
    @include('help')    
    @include('sales_report')
    @include('sections.factoids')
    @include('sections.skills')
    @include('sections.teaser')
    @include('keep_track')
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/levitate.js"></script>
    <script src="js/bst-carousel-slider.js"></script>
    <script src="js/bst-piechart.js"></script>

</body>
</html>