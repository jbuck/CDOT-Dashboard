<?php

$callback = $_REQUEST['callback'];
$service = $_REQUEST['service'];
$data = "{}";
$timestamp = time();

if ( !$callback ) {

  $callback = explode( "?", end( explode( "/", $_SERVER['REQUEST_URI']) ) );
  $callback = $callback[0];

}

if ( $service == "lighthouse" ) {

  exec( "sqlite3 dashboard 'select timestamp from " . $service . ";'", $timestamp );
  $timestamp = implode( '\n', $timestamp );

  if ( ( time() - $timestamp ) > 1800000 ) {

    $contents = str_replace( "\"", "\\\"",
      str_replace( "'", "''",
        file_get_contents(
          "https://webmademovies.lighthouseapp.com/projects/63272-popcornjs/milestones.json?_token=95f4819c1d3e6a90e80ba7a57eeae88f5e730b5a"
        )
      )
    );

    exec( 'sqlite3 dashboard "update lighthouse set timestamp=\'' . time() . '\', data=\'' . $contents . '\';"' );
  }

  exec( "sqlite3 dashboard 'select data from " . $service . ";'", $data );
  $data = implode( '\n', $data );
}

echo $callback . '(' . $data . ');';

?>
