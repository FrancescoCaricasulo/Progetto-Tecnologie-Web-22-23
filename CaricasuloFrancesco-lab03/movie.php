<?php 
	$movie=$_GET["film"]; 
    list($film, $anno, $valu) = file("$movie/info.txt");
	$over = file("$movie/overview.txt");
	$recensioni = glob("$movie/rev*.txt");
	$j = sizeof($recensioni);
	$c = "ROTTEN";
?>

<!DOCTYPE html>

	<head>
		<link rel="icon" href="http://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/rotten.gif">
		<title><?php echo $film ?>- Rancid Tomatoes</title>

		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<?php if($movie > "mortalkombat"){?>
			<link href="movie.css" type="text/css" rel="stylesheet">
		<?php }else{ ?>
			<link href="movie1.css" type="text/css" rel="stylesheet">
		<?php } ?>
	</head>

	<body class="testo">
		
		<header class="centrato">
		    <img src="http://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/banner.png" alt="Banner">
		</header>
		

		<h1 class="centrato"><strong><?php print $film."(".$anno.")" ?></strong></h1>
		
		<nav class="bordo">
			<!--Colonna di Destra-->
			<aside class="colore">
				
			    <?php echo(" <img src=$movie/overview.png") ?>

				<dl>
					<?php foreach ($over as $lines) { 
						$index = strpos($lines, ":");
						$h = substr($lines, 0, $index);
						$txt = substr($lines, $index+1);
					?>
					<dt> <strong> <?= $h.":" ?></strong> </dt>
					<dd> <?= $txt ?> </dd>
					<?php
						}
					?>
				</dl>
			</aside>

			<!--Colonna Sinistra-->
			<section>
				<div class="back"><?php if($valu > 60){ ?>
						<img src="https://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/freshbig.png" alt="Rotten">
                    <?php }else{ ?>
						<img src="https://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/rottenbig.png" alt="Rotten">
					<?php }echo $valu ?>%
				</div>
				<div class="col1">
					<?php 
						for($i = 1; $i<=$j; $i+=2) {
							list($rec, $imm, $autore, $ambito) = file("$movie/review$i.txt");
					?>
					<p class="citazione">
						<?php 
							if ($imm < $c){ ?>
								<img src="https://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/fresh.gif" alt = "Fresh">
						<?php } else { ?>
							 	<img src="https://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/rotten.gif" alt = "Rotten">
						<?php }print $rec ?>
					</p>
					<div class="autore">
						<p class="lato">
							<img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/critic.gif" alt="Critic">
						</p>
						<p>
							<?php echo $autore ?> <br>
							<?php echo $ambito ?>
						</p>
					</div>
                    <?php } ?>
				</div>

				<!--Colonna Destra-->

				<div class="col2">
					<?php 
						for($i = 2; $i<=$j; $i+=2) {
							list($rec, $imm, $autore, $ambito) = file("$movie/review$i.txt");
					?>
					<p class="citazione">
						<?php 
							if ($imm < $c){ ?>
								<img src="https://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/fresh.gif" alt = "Fresh">
						<?php } else { ?>
							 	<img src="https://courses.cs.washington.edu/courses/cse190m/11sp/homework/2/rotten.gif" alt = "Rotten">
						<?php }print $rec ?>
					</p>
					<div class="autore">
						<p class="lato">
							<img src="http://www.cs.washington.edu/education/courses/cse190m/11sp/homework/2/critic.gif" alt="Critic">
						</p>
						<p>
							<?php echo $autore ?> <br>
							<?php echo $ambito ?>
						</p>
					</div>
                    <?php } ?>
				</div>

				<div class="destra">
					(1-<?php echo $j ?>) of <?php echo $j ?>
				</div>
				<div class="sinistra"></div>
            </section>
			
		</nav>
		<div class="so">
			<p>
				<a href="http://validator.w3.org/check/referer"><img width="88" src="https://upload.wikimedia.org/wikipedia/commons/b/bb/W3C_HTML5_certified.png" alt="Valid HTML5!"></a>
				<br>
				<a href="http://jigsaw.w3.org/css-validator/check/referer"><img src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS!"></a>
			<p> 
	    </div>
		
	</body>
</html>
