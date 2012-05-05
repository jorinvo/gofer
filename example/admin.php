<?php
/*
if ( !isset($_SERVER['PHP_AUTH_USER']) || $_SERVER['PHP_AUTH_USER'] != 'ariane' || $_SERVER['PHP_AUTH_PW'] != '123' ):
  header('WWW-Authenticate: Basic realm="My Realm"');
  header('HTTP/1.0 401 Unauthorized');
  echo 'Text to send if user hits Cancel button';
  exit;
else:
*/


if ( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
  $dir = dirname( __FILE__ );

  $outputFile = fopen( $dir . '/index.php', 'w' );
  fwrite( $outputFile, $_POST['output'] );
  fclose($outputFile);

  $dataFile = fopen( $dir . '/data.json', 'w' );
  fwrite( $dataFile, $_POST['fields'] );
  fclose($dataFile);

  $data = $_POST['fields'];

  $success = 'true';

} else {

  $data = file_get_contents('./data.json', true);

  $success = 'false';

}

?>
<!doctype html>
<html>
<head>
  <meta charset="utf-8">


  <!-- gofer -->
  <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script>
    window.jQuery || document.write('<script src="assets/js/jquery.js"><\/script>');
    window._ || document.write('<script src="assets/js/underscore.js"><\/script>');
    gofer = {
      template: 'assets/template.html',
      container: '#gofer-container',
      success: <?php echo $success; ?>,
      data: '<?php echo $data; ?>'
    };
  </script>
  <!-- <script src="assets/js/gofer.js"></script> -->
  <script src="../libs/require/require.js" data-main="../src/gofer.js"></script>
  <!-- /gofer -->
</head>
<body>
  <div id="gofer-container"></div>
</body>

</html>

<?php
  // endif;
?>