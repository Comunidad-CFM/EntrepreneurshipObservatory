<!DOCTYPE html>
<html ng-app="observatoryApp">
<head>
	<title>Entrepreneurship Observatory</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" href="<?= asset('node_modules/bootstrap/dist/css/bootstrap.min.css') ?>">
	<link rel="stylesheet" href="<?= asset('node_modules/font-awesome/css/font-awesome.min.css') ?>">
	<link rel="stylesheet" href="<?= asset('app/css/styles.css') ?>">
	<link rel="stylesheet" href='<?= asset('app/css/baskerville.css') ?>' type='text/css'>
	<link rel="stylesheet" href='<?= asset('app/css/lato.css') ?>' type='text/css'>
	<link rel="stylesheet" href='<?= asset('app/css/pacifico.css') ?>' type='text/css'>
	<link rel="stylesheet" href='<?= asset('app/css/kaushan.css') ?>' type='text/css'>
</head>
<body>
	<div ng-view></div>

	<!-- Application Dependencies -->
	<script type="text/javascript" src="<?= asset('node_modules/angular/angular.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-route/angular-route.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-cookies/angular-cookies.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/jquery/dist/jquery.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/bootstrap/dist/js/bootstrap.min.js') ?>"></script>

	<!-- Application Scripts -->
	<script type="text/javascript" src="<?= asset('app/js/app.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Login/login.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Admin/admin.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Login/login.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Personas/personas.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Personas/personas.factory.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Encuestas/encuestas.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/Encuestas/encuestas.factory.js') ?>"></script>
</body>
</html>