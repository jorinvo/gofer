<?php
/*
if ( !isset($_SERVER['PHP_AUTH_USER']) || $_SERVER['PHP_AUTH_USER'] != 'ariane' || $_SERVER['PHP_AUTH_PW'] != '123' ):
  header('WWW-Authenticate: Basic realm="My Realm"');
  header('HTTP/1.0 401 Unauthorized');
  echo 'Text to send if user hits Cancel button';
  exit;
else:
*/
  if ( $_SERVER['REQUEST_METHOD'] == 'GET' ):

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
        container: '#gofer-container'
      }
    </script>
    <script src="assets/js/require.js" data-main="assets/js/gofer.js"></script>
    <!-- /gofer -->
  </head>

  <body>
    <div id="gofer-container"></div>
  </body>

  </html>

<?php
  elseif ( $_SERVER['REQUEST_METHOD'] == 'POST' ):

  endif;
// endif;

?>