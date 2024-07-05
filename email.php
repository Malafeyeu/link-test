<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (isset($_POST['send'])) {
  $name = htmlentities($_POST['name']);
  $phone = htmlentities($_POST['phone']);
  
  $mail = new PHPMailer(true);
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'akts.nagato@gmail.com';
  $mail->Password = 'swfz dgup opoq fgze';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  
  $mail->Port = 465;
  $mail->isHTML(true);
  $mail->setFrom('akts.nagato@gmail.com', $name);
  $mail->addAddress('akts.nagato@gmail.com');
  $mail->Subject = 'Contact Form';
  $mail->Body = '<h3>Hi there! You got a new enquiry</h3>
    <h4>Name: '.$name.'</h4>
    <h4>Phone: '.$phone.'</h4>
  ';
  $mail->send();

  header('Location: response.html');
}
?>