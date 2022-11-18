<?php include "top.html"; ?>
<?php 
    //unisco i dati ricevuti in una singola variabile
    $var = implode($separator =",", $_POST); 

    //apro il file di testo e ci scrivo
    $handler = fopen('singles.txt', 'a');
    if(false ===$handler){
        printf('Impossibile aprire il file %s', "singles.txt");
        exit;
    }

    fwrite($handler, $var);
    fwrite($handler, "\n");
    fclose($handler);
?>
<h1> Thank you! </h1>
<div> Welcome to NerdLuv, <?php echo $_POST["name"]?>!</div><br>
<div> Now <a href="matches.php"> log in to see your matches!</a></div>
<?php include "bottom.html"; ?>