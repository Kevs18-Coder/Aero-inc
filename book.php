<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $shipName = $_POST['shipName'] ?? '';
    $date = $_POST['date'] ?? '';
    $passengers = $_POST['passengers'] ?? '';
    $fullName = $_POST['fullName'] ?? '';
    $payment = $_POST['payment'] ?? '';

    if ($shipName && $date && $passengers && $fullName && $payment) {
        $file = 'bookings.csv';
        $data = [$shipName, $date, $passengers, $fullName, $payment, date("Y-m-d H:i:s")];

        $fp = fopen($file, 'a');
        if ($fp === false) {
            echo json_encode(['status' => 'error', 'message' => 'Cannot open CSV file.']);
            exit;
        }

        fputcsv($fp, $data);
        fclose($fp);

        echo json_encode(['status' => 'success', 'message' => 'Booking saved!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'All fields required!']);
    }
}
?>
