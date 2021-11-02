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

//Получаем body из fetch запроса
$postData = file_get_contents('php://input');
//Декодируем json в ассоциативный массив
$data = json_decode($postData, true);

$data['answerFromServer'] = 'ok';

//Кодируем в json и отправляем
echo json_encode($data);
