<?php
	header( 'Access-Control-Allow-Origin: *' ); // Sta aanvragen van elk domein toe (voor ontwikkeling)
	header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS' ); // Sta POST, GET en OPTIONS methoden toerequire_once 'ini.inc';
	header( 'Access-Control-Allow-Headers: Content-Type' ); // Sta Content-Type header toe
	header( 'Content-Type: application/json' );// Check if the registration form has been submitted
	
	require( 'ini.inc' );
	
	if ( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
		if ( isset( $_POST['username'] ) && isset( $_POST['password'] ) ) {
			$username = $_POST['username'];
			$password = $_POST['password'];
			
			// Perform validation on the form data
			if ( empty( $username ) || empty( $password ) ) {
				// Handle validation errors
				$errorMessage = 'Please fill in all fields.';
			}
		}
		
		// Insert the user into the database
		if ( ! isset( $errorMessage ) ) {
			$sql  = "INSERT INTO users (username, password) VALUES (?, ?)";
			$stmt = mysqli_prepare( $conn, $sql );
			mysqli_stmt_bind_param( $stmt, 'ss', $username, $password );
			mysqli_stmt_execute( $stmt );
			
			$response = array();
			
			// Check if the insertion was successful
			if ( mysqli_stmt_affected_rows( $stmt ) === 1 ) {
				// Registration successful
				$response['status']  = 'success';
				$response['message'] = 'Registration complete';
			} else {
				// Registration failed
				$response['status']  = 'error';
				$response['message'] = 'Registration failed.';
			}
		}
		
		// Close the database connection
		$stmt->close();
		$conn->close();
	}
	
	echo json_encode( $response );
	


                                            