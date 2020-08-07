<?php 
if (isset($_POST['_method'],$_POST['id'],$_POST['first_name'],$_POST['last_name'],$_POST['postal_code'],$_POST['street'],$_POST['city'],$_POST['age'])) {
    print_r($_POST);
}