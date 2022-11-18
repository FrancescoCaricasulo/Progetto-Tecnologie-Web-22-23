<?php include "top.html"; ?>

<fieldset>
    <legend>New User Signup</legend>
    <form action="signup-submit.php" method="POST"> 
        <table>
            <tr><label><td><strong>Name: </strong></td><td><input class="nome" type="text" name="name" width="16" maxlength="16"></td></label></tr>
            
            <tr><label><td><strong>Gender: </strong></td><td><input type="radio" name="gender" value="M"> Male <input type="radio" name="gender" value="F"> Female</td></label></tr>
            
            <tr><label><td><strong>Age: </strong></td><td><input class="age" type="text" name="age" maxlength="6"></td></label></tr>
            
            <tr><label><td><strong>Personality Type: </strong></td><td><input class="pt" type="text" name="pt" maxlength="4"> (<a href="http://www.humanmetrics.com/cgi-win/JTypes2.asp">Don't know your type?</a>) </label></td></label></tr>
            
            <tr><label><td><strong>Favorite OS: </strong></td><td> <select name="OS">
                                                    <option value="Linux"> Linux </option>
                                                    <option value="Mac Os X"> Mac Os X </option>
                                                    <option value="Windows"> Windows </option>
                                                </select></label></td></label></tr>
            
            <tr><label><td><strong>Seeking age: </strong></td><td><input class="age" type="text" name="Sage1" maxlength="6"> to <input class="age" type="text" name="Sage2" maxlength="6">  </label></td></label></tr>
        </table>
        <br>
        <label> <input type ="submit" value ="Sign Up"> </label>
    </form>
</fieldset>
<?php include "bottom.html"; ?>