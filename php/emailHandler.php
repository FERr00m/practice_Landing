<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/includes/data.php';
require_once __DIR__ . '/includes/functions.php';


//$template = file_get_contents(__DIR__ . '/html/letter.php', true);
//Установка заголовков сервера для CORS
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
//Устанавливаем ip адреса допустимые для предоставления ответа
/*$ips = ['37.46.62.200'];
if (!in_array($_SERVER['REMOTE_ADDR'], $ips)) {
    http_response_code(403); //устанавливаем код ответа сервера
    echo 'Access Denied. Your IP-adress is not right.';
    die();
}*/

//Получаем body из fetch запроса
$postData = file_get_contents('php://input');
//Декодируем json в ассоциативный массив
$data = json_decode($postData, true);

foreach($data as $key => $value) {
    $data[$key] = htmlspecialchars(trim($value));
}

if ($data['sendMail'] && $data['agree']) {
    $mail_settings['to_email'] = $data['email'];

    //кусок кода, который исполняет файл php и записывает его в переменную, как body вёрстку для phpMailer
    ob_start();
    include(__DIR__ . '/html/letter.php');
    $template = ob_get_clean();
    ob_end_clean();

    if (!send_mail($data, $mail_settings, $template)) {
        $data['msgSendError'] = true;
    } else {
        $data['msgSendError'] = false;
    }
} else {
    die();
}
//$data['answerFromServer'] = "https://{$_SERVER['SERVER_NAME']}/handlers/html/logo.png";


//Кодируем в json и отправляем
echo json_encode($data);
