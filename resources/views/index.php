<!DOCTYPE html>
<html ng-app="observatoryApp">
<head>
	<title>Entrepreneurship Observatory</title>
	<link rel="stylesheet" href="<?= asset('node_modules/bootstrap/dist/css/bootstrap.min.css') ?>">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
</head>
<body>

	<div class="container">
		<div ui-view></div>
	</div>

	<!-- Application Dependencies -->
	<script type="text/javascript" src="<?= asset('node_modules/angular/angular.min.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/angular-ui-router/release/angular-ui-router.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/satellizer/satellizer.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('node_modules/jquery/dist/jquery.min.js') ?>"></script>

	<!-- Application Scripts -->
	<script type="text/javascript" src="<?= asset('app/js/app.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/js/auth.controller.js') ?>"></script>
	<script type="text/javascript" src="<?= asset('app/js/user.controller.js') ?>"></script>
</body>
</html>