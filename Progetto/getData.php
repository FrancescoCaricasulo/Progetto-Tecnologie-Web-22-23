<?php 
	
	//Avvio la sessione
	session_start();

	//Setto il limite Temporale a 10 min
	$expireAfter = 250;

	// Controllo se la sessione è ancora attiva
	if(isset($_SESSION['last_time']) && (time() - $_SESSION['last_time'] > $expireAfter)) {
		session_unset();
		session_destroy();
	}

// Aggiorna il tempo dall'ultima attività
$_SESSION['last_time'] = time();

	if(array_key_exists('ric', $_GET)){
		if(isset($_SESSION['log']) && $_SESSION['log'] == 1){
			$result = array(
				"sol" => array(
					array(
						"Username" => $_SESSION['Username'],
						"Gestore" => $_SESSION['Gestore']
					)
				)
			);
		}else { 
			$orderUrl = "/getData.php?PHPSESSID=" . session_id();
			$_SESSION['log'] = 0;
			$_SESSION['Username'] = null;
			$_SESSION['Gestore'] = null;

			$result = array(); 
		}

		echo json_encode($result);
		exit;
	}
	

	try{
		$db = new PDO("mysql:dbname = trekkdb; host: localhost:3306;", "FCaricasulo", "Password", array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	}catch(PDOException $exception){
		$output =$exception -> getMessage();
		print json_encode($output);
		exit;
	}
	
	//Azione login
	if(isset($_POST['user1']) && isset($_POST['pass1'])){
		$name = $_POST['user1'];
		$pass = md5($_POST['pass1']);

		//Analizzare sql injections
		$stmt = $db->prepare("SELECT utente.Username, utente.Gestore 
							  FROM trekkdb.utente 
							  WHERE utente.Username = :username AND utente.Password = :pass");
		$stmt->bindParam(':username', $name);
		$stmt->bindParam(':pass', $pass);
		$stmt->execute();

		if($stmt->rowCount() == 1){

			foreach($stmt as $user){
				//Gestisco Dati Sessione
				$_SESSION['Username'] = $user["Username"];
				$_SESSION['Gestore'] = $user["Gestore"];
				$_SESSION['log'] = 1;

				$result = array(
					"sol" => array(
						array(
							"Username" => $user["Username"],
							"Gestore" =>  $user["Gestore"],
						)
					)
				);
			}
		}else{
			$result = array();
		}

		//Creo file json
		echo json_encode($result);
		exit;
	}

	//Azione Registrazione Utente
	if(array_key_exists('nome', $_POST)){

		$nome = $_POST['nome'];
		$cognome = $_POST['cognome'];
		$user2 = $_POST['user2'];
		$pass2 = md5($_POST['pass2']);
		$gest = $_POST['gest'];

		//Controllo che nel database non ci sia l'utente che si sta registrando
		$stmt = $db->prepare("SELECT utente.Username 
							FROM trekkdb.utente 
							WHERE utente.Username = :username");
		$stmt->bindParam(':username', $user2);
		$stmt->execute();

		//utente già presente
		if($stmt->rowCount() != 0){
			$result = array();
		}else{
			
			//Utente non presente nel db, inserisco i dati
			$stmt = $db->prepare("INSERT INTO trekkdb.utente (utente.Nome, utente.Cognome, utente.Username, utente.Password, utente.Gestore) 
								VALUES (:nome, :cognome, :user, :pass, :gest)");
			$stmt->bindParam(':nome', $nome);
			$stmt->bindParam(':cognome', $cognome);
			$stmt->bindParam(':user', $user2);
			$stmt->bindParam(':pass', $pass2);
			$stmt->bindParam(':gest', $gest);
			$stmt->execute();

			$result = array(
				"sol" => array(
					array(
						"Username" => "Successo1",
					)
				)
			);
		}
			//Creo file json
			echo json_encode($result);
			exit;
	}

	//Azione Registrazione nuovo percorso
	if(isset($_GET['region'])){

		$regione= $_GET['region'] ;
		$provincia= $_GET['prov'] ;
		$inizio= $_GET['start'] ;
		$arrivo= $_GET['arrive'] ;
		$lunghezza= $_GET['leng'] ;
		$difficoltà = $_GET['diff'];

		//Controllo che nel database non ci sia il percorso che si sta registrando
		$test1 = $db->prepare("SELECT percorso.Id
							    FROM trekkdb.percorso
							    WHERE percorso.Partenza = :inizio AND percorso.Arrivo = :arrivo AND percorso.Provincia = :provincia");
		$test1->bindParam(':inizio', $inizio);
		$test1->bindParam(':arrivo', $arrivo);
		$test1->bindParam(':provincia', $provincia);
		$test1->execute();

		//Percorso già presente
		if($test1->rowCount() != 0){
			$result = array();
		}
		else{

			//Percorso non presente nel db, inserisco i dati
			$lik = 0;

			$stmt = $db->prepare("INSERT INTO trekkdb.percorso (percorso.Regione, percorso.Provincia, percorso.Partenza, percorso.Arrivo, percorso.Lunghezza, percorso.Difficoltà, percorso.NumLikes) 
								  VALUES (:regione, :provincia, :inizio, :arrivo, :lunghezza, :diff, :lik)");
			$stmt->bindParam(':regione', $regione);
			$stmt->bindParam(':provincia', $provincia);
			$stmt->bindParam(':inizio', $inizio);
			$stmt->bindParam(':arrivo', $arrivo);
			$stmt->bindParam(':lunghezza', $lunghezza);
			$stmt->bindParam(':diff', $difficoltà);
			$stmt->bindParam(':lik', $lik);
			$stmt->execute();

			$result = array(
				"sol" => array(
					array(
						"Username" => "Successo2",
					)
				)
			);

		}

		echo json_encode($result);
		exit;
	} 

	//Azione Ricerca Percorso
	if(array_key_exists('find', $_GET)){

		$find = $_GET['find'];
		$find .= "%";

		//Controllo che nel database ci sia il percorso ricercato
		$stmt = $db->prepare("SELECT percorso.Regione, percorso.Provincia, percorso.Partenza, percorso.Arrivo, percorso.Lunghezza, percorso.Difficoltà, percorso.NumLikes
							  FROM trekkdb.percorso
							  WHERE percorso.Regione LIKE :reg OR percorso.Provincia LIKE :prov ");
		$stmt->bindParam(':reg', $find);
		$stmt->bindParam(':prov', $find);
		$stmt->execute();

		//percorso non presente
		if($stmt->rowCount() == 0){
			$result = array();
		}else{
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

			// Creo un array associativo con i dati
			$result = array(
				'rows' => $rows,
			);
		}

		echo json_encode($result);
		exit;
	}

	//Aggiungo/Rimuovo like al percorso
	if(array_key_exists('type', $_GET)){
		$type = $_GET['type'];
		$part= $_GET['part'];
		$arr = $_GET['arr'];
		$lung = $_GET['lung'];
		$name = $_GET['user'];

		$stmt = $db->prepare("SELECT percorso.Id, percorso.NumLikes
							  FROM trekkdb.percorso
							  WHERE percorso.Partenza = :part AND percorso.Arrivo = :arr AND percorso.Lunghezza = :lung");
		$stmt->bindParam(':part', $part);
		$stmt->bindParam(':arr', $arr);
		$stmt->bindParam(':lung', $lung);
		$stmt->execute();
		$righe = $stmt->rowCount();

		if($stmt->rowCount() == 1){
			foreach($stmt as $user){
				$id = $user["Id"];
				$num = $user["NumLikes"];
			}

			//Aggiungo il like
			if($type == "like"){
				$stmt = $db->prepare("INSERT INTO trekkdb.likeutentepercorso (likeutentepercorso.Username, likeutentepercorso.Id_Percorso) 
									VALUES (:user, :id)");
				$stmt->bindParam(':user', $name);
				$stmt->bindParam(':id', $id);
				$stmt->execute();

				$num = $num+1;
				$stmt = $db->prepare("UPDATE trekkdb.percorso
									SET percorso.NumLikes = :num
									WHERE percorso.Id = :id");
				$stmt->bindParam(':num', $num);
				$stmt->bindParam(':id', $id);
				$stmt->execute();

			}

			//Rimuovo il like
			else if($type == "dislike"){
				$stmt = $db->prepare("DELETE FROM trekkdb.likeutentepercorso
									  WHERE likeutentepercorso.Username = :user AND likeutentepercorso.Id_Percorso = :id");
				$stmt->bindParam(':user', $name);
				$stmt->bindParam(':id', $id);
				$stmt->execute();

				$num = $num-1;
				$stmt = $db->prepare("UPDATE trekkdb.percorso
									SET percorso.NumLikes = :num
									WHERE percorso.Id = :id");
				$stmt->bindParam(':num', $num);
				$stmt->bindParam(':id', $id);
				$stmt->execute();
			}

			//Informazioni per il tipo di pulsante
			else{
				$stmt = $db->prepare("SELECT likeutentepercorso.Id_Percorso
							  		  FROM trekkdb.likeutentepercorso
							          WHERE likeutentepercorso.Username = :user AND likeutentepercorso.Id_Percorso = :id");
				$stmt->bindParam(':user', $name);
				$stmt->bindParam(':id', $id);
				$stmt->execute();

				if($stmt->rowCount() == 0){
					$result = array(
						"sol" => array(
							array(
								"Username" => "false",
							)
						)
					);
				}else{
					$result = array(
						"sol" => array(
							array(
								"Username" => "true",
							)
						)
					);
				}
				echo json_encode($result);
				exit;
			}
		}

		$result = array(
			"sol" => array(
				array(
					"Username" => $num,
				)
			)
		);

		echo json_encode($result);
		exit;
	}

	//Ricerca Percorsi a cui l'utente ha messo Like
	if(isset($_GET["lkd"])){
		$user = $_GET["user"];

		$stmt = $db->prepare("SELECT likeutentepercorso.Id_Percorso
							  FROM trekkdb.likeutentepercorso
							  WHERE likeutentepercorso.Username = :user");
		$stmt->bindParam(':user', $user);
		$stmt->execute();
		

		if($stmt->rowCount() == 0){
			$result = array();
		}else{
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

			// Creo un array associativo con i dati
			$result = array(
				'rows' => $rows,
			);
		}

		echo json_encode($result);
		exit;
	}
	if(array_key_exists('id', $_GET)){
		$id = $_GET["id"];
		$stmt = $db->prepare("SELECT percorso.Regione, percorso.Provincia, percorso.Partenza, percorso.Arrivo, percorso.Lunghezza, percorso.Difficoltà, percorso.NumLikes
							  FROM trekkdb.percorso
							  WHERE percorso.Id = :id ");
		$stmt->bindParam(':id', $id);
		$stmt->execute();

		//percorso non presente
		if($stmt->rowCount() == 0){
			$result = array();
		}else{
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

			// Creo un array associativo con i dati
			$result = array(
				'rows' => $rows,
			);
		}

		echo json_encode($result);
		exit;
	}

	//Chiudo sessione
	if(array_key_exists('tipo', $_GET)){
		session_unset();
		session_destroy();
		exit;
	}

	?>
