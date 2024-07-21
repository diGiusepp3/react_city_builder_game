<?php
	header( 'Access-Control-Allow-Origin: *' );
	header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS' );
	header( 'Access-Control-Allow-Headers: Content-Type' );
	header( 'Content-Type: application/json' );
	
	if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
		exit;
	}
	
	error_reporting( E_ALL );
	ini_set( 'display_errors', 1 );
	
	$servername = "localhost";
	$username   = "webcraftersbe";
	$password   = "DigiuSeppe2018___";
	$dbname     = "webcraftersbe-db";
	
	$conn = new mysqli( $servername, $username, $password, $dbname );
	
	if ( $conn->connect_error ) {
		echo json_encode( [ 'status' => 'error', 'message' => 'Database connection failed: ' . $conn->connect_error ] );
		exit;
	}
	
	$data = json_decode( file_get_contents( "php://input" ), true );
	if ( ! $data || ! isset( $data['username'] ) ) {
		echo json_encode( [ 'status' => 'error', 'message' => 'Username is required.' ] );
		exit;
	}
	
	$user = $data['username'];
	
	$stmt = $conn->prepare( "SELECT * FROM savegames WHERE username=?" );
	$stmt->bind_param( "s", $user );
	$stmt->execute();
	$result = $stmt->get_result();
	
	$response = array();
	if ( $result->num_rows > 0 ) {
		$response['status']   = 'success';
		$response['gamesave'] = $result->fetch_assoc();
	} else {
		$response['status']  = 'error';
		$response['message'] = 'No game save found.';
	}
	
	$stmt->close();
	$conn->close();
	
	echo json_encode( $response );
