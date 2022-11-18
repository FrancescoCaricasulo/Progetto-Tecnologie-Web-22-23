<?php include "top.html"; ?>

<fieldset>
    <legend>New User Signup</legend>
    <form action="matches-submit.php" method="GET"> 
        <table>
            <tr><label><td><strong>Name: </strong></td><td><input class="nome" type="text" name="name" width="16" maxlength="16"></td></label></tr>
        </table>
        <br>
        <label> <input type ="submit" value ="View My Matches"> </label>
    </form>
</fieldset>

<?php include "bottom.html"; ?>