<!DOCTYPE html>
<html ng-app="observatoryApp">
<head>
	<title>Entrepreneurship Observatory</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<link rel="stylesheet" href="<?= asset('node_modules/bootstrap/dist/css/bootstrap.min.css') ?>">
	<link rel="stylesheet" href="<?= asset('app/css/styles.css') ?>">
	<link href='https://fonts.googleapis.com/css?family=Roboto:500' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
</head>
<body>

	<div class="container">
		<div ng-view></div>
	</div>

	<!-- Application Dependencies -->
	<script type="text/javascript" src="<?= asset('node_modules/angular/angular.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-route/angular-route.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-cookies/angular-cookies.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/satellizer/satellizer.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/jquery/dist/jquery.min.js') ?>"></script>

	<!-- Application Scripts -->
	<script type="text/javascript" src="<?= asset('app/js/app.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/js/auth.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/js/user.controller.js') ?>"></script>
</body>
</html>