<?php include "top.html"; ?>

<?php
    $handler = fopen('singles.txt', 'r');
    if(false ==$handler){
        printf('Impossibile aprire il file %s', "singles.txt");
        exit;
    }
    $f=0;
    while(($line1 = fgets($handler)) != 0 && $f!=1){
        $var1 = explode(",",$line1);
        if($var1[0] == $_GET["name"]){
            $f=1;
            ?>
            <h1>Matches for <?=$_GET["name"]?></h1>
            <?php
        }
    }
    fclose($handler);
    $handler = fopen('singles.txt', 'r'); 
    $j=0;
    while(($line2 = fgets($handler)) != 0){
        $var2 = explode(",",$line2);
           
        if($var1[1] != $var2[1] && $var1[4] == $var2[4]){
            for($i=1; $i<=4; $i++){
                if(substr($var1[3], $i, $i) == substr($var2[3], $i, $i)){
                    $j++;
                }
            }
            if(($j>=1) && $var2[2] < $var1[6] && $var2[2] > $var1[5]){
            ?>
                <div> 
                    <p class="match img"> <img src="http://www.cs.washington.edu/education/courses/cse190m/12sp/homework/4/user.jpg" alt="icon"> </p>
                    <p class="match p"><?php echo $var2[0]?> </p>
                    <ul class="match ul">
                        <li><strong>Gender: </strong></td><td> <?php echo $var2[1]?> </li>
                                
                        <li><strong>Age: </strong></td><td> <?php echo $var2[2]?> </li>
                                
                        <li><strong>Personality Type: </strong></td><td> <?php echo $var2[3]?> </li>
                                
                        <li><strong>Favorite OS: </strong></td><td>  <?php echo $var2[4]?> </li>
                    </ul>
                </div>
                <br>
            <?php
            }
            $j=0;
        }
    }
?>

<?php include "bottom.html"; ?>