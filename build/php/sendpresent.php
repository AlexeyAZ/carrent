<?php
$sendto = "alex_z@mail.franch5.ru, zvnfranch5@yandex.ru, franchaizing-5@yandex.ru, info@prokat71.ru, danilopa@yandex.ru";
$city = nl2br($_POST['city']);
$age = nl2br($_POST['age']);
$business = nl2br($_POST['business']);
$volume = nl2br($_POST['volume']);
$phone = nl2br($_POST['phone1']);
$name = nl2br($_POST['name1']);
$title = nl2br($_POST['title']);

$content = "Заявка с сайта ";
$content .= $title;

// Формирование заголовка письма
$subject  = $content;
$headers  = "From: no-reply@no-reply.ru" . "\r\n";
$headers .= "Reply-To: Без ответа". "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'5>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Письмо с сайта ";
$msg .= $title;
$msg .= "</h2>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$phone."</p>\r\n";
$msg .= "<p><strong>ФИО:</strong> ".$name."</p>\r\n";
$msg .= "<p><strong>Город:</strong> ".$city."</p>\r\n";
$msg .= "<p><strong>Возраст:</strong> ".$age."</p>\r\n";
$msg .= "<p><strong>Бизнес:</strong> ".$business."</p>\r\n";
$msg .= "<p><strong>Инвестиции:</strong> ".$volume."</p>\r\n";

$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}

?>


