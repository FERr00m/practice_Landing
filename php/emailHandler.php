<?php
//Установка заголовков сервера для CORS
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}"); //Здесь можно указать нужные ip например http://127.0.0.1:5501
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
$ips = ['37.46.62.200'];
if (!in_array($_SERVER['REMOTE_ADDR'], $ips)) {
    http_response_code(403); //устанавливаем код ответа сервера
    echo 'Access Denied';
    die();
}
//Получаем body из fetch запроса
$postData = file_get_contents('php://input');
//Декодируем json в ассоциативный массив
$data = json_decode($postData, true);

foreach($data as $key => $value) {
    $data[$key] = htmlspecialchars(trim($value));
}

$data['answerFromServer'] = 'ok';

//Кодируем в json и отправляем
echo json_encode($data);
