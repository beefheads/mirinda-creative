<?php

/**
 * EMAIL
 */

$message = '<html><body>';
foreach ($_POST as $key => $value) {
    if ($key == 'user_file') continue;
    if (empty($value)) continue;
    $message .= '<p><strong>' . $key . ':</strong> ' . $value . '</p>';
}
$message .= '</body></html>';

// $email_to = 'boffeechane@gmail.com';
$email_to = 'admin@maddog.by';
$email_from = 'info@maddog.by';
$email_subject = "maddog.by — заявка";

$from_name = "info";
$headers = array(
    'From: ' . $from_name . ' <' . $email_from . '>',
    'Reply-To: ' . 'noreply@maddog.by',
    'Content-Type: text/html; charset=UTF-8',
);
$headers = implode("\r\n", $headers);

// заголовок письма

var_dump(array(
    'to' => $email_to,
    'subj' => $email_subject,
    'message' => $message,
    'headers' => $headers,
));
// отправляем письмо
$mail = mail($email_to, $email_subject, $message, $headers);
// echo json_encode(array(
//     'status' => $mail,
// ));

die;