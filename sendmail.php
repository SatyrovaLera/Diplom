<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpMailer\src\Exception.php';
    require 'phpMailer\src\PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpMailer\language');
    $mail->IsHTML(true);

    // От кого письмо.
    $mail->serFrom('lerasatyrova@gmail.com', 'User');
    // Кому.
    $mail->addAdress('lerasatyrova@gmail.com');
    // Тема письма.
    $mail->Subject='Hi! It is your first php form!';

    // Тело письма.
    $body = '<h1>Message!</h1>';

    $mail->Body = $body;

    // Отправка.
    if(!$mail->send()){
        $message = 'Mistake';
    }else{
        $message = 'Data sent';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>