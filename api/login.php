<?php
header('Access-Control-Allow-Origin: *'); // Sta aanvragen van elk domein toe (voor ontwikkeling)
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); // Sta POST, GET en OPTIONS methoden toe
header('Access-Control-Allow-Headers: Content-Type'); // Sta Content-Type header toe
header('Content-Type: application/json');



error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username   = "webcraftersbe";
$password   = "DigiuSeppe2018___";
$dbname     = "webcraftersbe-db";

// Maak een nieuwe verbinding met de database
$conn = new mysqli($servername, $username, $password, $dbname);

// Controleer de verbinding
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Controleer of de gegevens aanwezig zijn
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Username and password are required.']);
    exit;
}

$user = $data['username'];
$pass = $data['password'];

// Gebruik prepared statements om SQL-injecties te voorkomen
$stmt = $conn->prepare("SELECT * FROM users WHERE gebruikersnaam=? AND wachtwoord=?");
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Prepare statement failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ss", $user, $pass);
$stmt->execute();
$result = $stmt->get_result();

$response = array();
if ($result->num_rows > 0) {
    $response['status'] = 'success';
    $response['message'] = 'Login successful!';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid username or password.';
}

// Sluit de verbinding
$stmt->close();
$conn->close();

// Stuur de JSON-response
echo json_encode($response);
