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

  if ( ( time() - $timestamp ) > 1800 ) {

    $contents = str_replace( "\"", "\\\"",
      str_replace( "'", "''",
        file_get_contents(
          "https://webmademovies.lighthouseapp.com/projects/63272-popcornjs/milestones.json?_token=5daf50297d277033bcd304f5f526ed64570f5487"
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
