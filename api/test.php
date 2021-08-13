<?php 
$date1 = "2021-08-09";
$date2 = "2021-08-13";
$date2 = date("Y-m-d", strtotime("-1 days", strtotime($date2)));
while($date1 != $date2) {
$date1 = date("Y-m-d", strtotime("+1 days", strtotime($date1)));
echo $date1."<br>";
}
?>