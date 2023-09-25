<?php

$first_name=$_POST['first_name'];
$phone_number=$_POST['phone_number'];
$message=$_POST['message'];
$email=$_POST['email'];

$to = "info@mounh.com";
$subject = "We are Mounh";
$txt = "\r\n Name: ".$first_name."\r\n Phone: ".$phone_number."\r\n Mail: ".$email."\r\n Message: ".$message."";
$headers = "From: webmaster@example.com";

echo mail($to,$subject,$txt,$headers);
?>