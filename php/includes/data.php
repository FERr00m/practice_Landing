<?php
$fields = [
    'email' => [
        'field_name' => 'Email',
        'required' => true,
    ]
];
/*
$fields = [
    'name' => [
        'field_name' => 'Имя',
        'required' => true,
    ],
    'email' => [
        'field_name' => 'Email',
        'required' => true,
    ],
    'address' => [
        'field_name' => 'Адрес',
        'required' => false,
    ],
    'phone' => [
        'field_name' => 'Телефон',
        'required' => true,
    ],
    'comment' => [
        'field_name' => 'Комментарий',
        'required' => false,
    ],
    'checkbox' => [
        'field_name' => 'Согласие на обработку данных',
        'required' => true,
        'mailable' => false, //Ключ указывает надо ли поле отправлять в письме
    ],
    'captcha' => [
        'field_name' => 'Captcha',
        'required' => true,
        'mailable' => false,
    ],
];
*/

//Данные из mailtrap.io для тестов
$mail_settings = [
  'host' => 'smtp.mail.ru',
  'smtp_auth' => true,
  'username' => 'testdev@internet.ru',
  'password' => '',
  'smtp_secure' => 'ssl', //ssl (нужно установить, когда реальная почта)
  'port' => 465,
  'from_email' => 'testdev@internet.ru',
  'from_name' => 'My Site, EmailHandler',
  'to_email' => 'user@mail.com',
];
