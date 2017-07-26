<?php
$sendto = nl2br($_POST['email']);
$sendname = nl2br($_POST['name']);

$content = "Заявка с сайта ";
// Формирование заголовка письма
$subject  = $content;
$headers  = "From: no-reply@no-reply.ru" . "\r\n";
$headers .= "Reply-To: Без ответа". "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
/*$msg  = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title></title>
        <style></style>
    </head>
    <body>
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top">
                    <table border="0" cellpadding="20" cellspacing="0" width="100%" id="emailContainer">
                        <tr>
                            <td align="center" valign="top" style="font-size:0;padding-bottom:0;">
                                <span style="color:black; font: 24px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; display: block;text-align:center;">Добрый день, ';
$msg .= $sendname;
$msg .= '</span>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top" style="font-size:0;">
                                <img src="http://savepic.ru/13703338.jpg" alt="" alt="" border="0" width="100%" style="display:block;margin:0;padding:0;">
                                <a href="http://xn----btbbmclce4bg3bgg.xn--p1ai/" style="color: #333333; font: 0 Arial, sans-serif; -webkit-text-size-adjust:none; display: block;margin:0;padding:0;" target="_blank">
                                    <img alt="" border="0" width="100%" style="display:block;margin:0;padding:0;" src="http://savepic.ru/13692215.jpg" alt="">
                                </a>
                                <a href="http://dn78.ru/" style="color: #333333; font: 0 Arial, sans-serif; -webkit-text-size-adjust:none; display: block;margin:0;padding:0;" target="_blank">
                                    <img alt="" border="0" width="100%" style="display:block;margin:0;padding:0;" src="http://savepic.ru/13689143.jpg" alt="">
                                </a>
                                <img src="http://savepic.ru/13693239.jpg" alt="" alt="" border="0" width="100%" style="display:block;margin:0;padding:0;">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>';*/

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
	echo "true";
} else {
	echo "false";
}

?>



