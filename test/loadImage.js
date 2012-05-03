define(['loadImage'], function(loadImage) {
  describe('loadImage(file, callback)', function() {

  var b64Data =
    'R0lGODdhUAA8AIABAAAAAP///ywAAAAAUAA8AAACS4SPqcvtD6' +
    'OctNqLs968+w+G4kiW5omm6sq27gvH8kzX9o3n+s73/g8MCofE' +
    'ovGITCqXzKbzCY1Kp9Sq9YrNarfcrvcLDovH5PKsAAA7'
    , imageUrl = 'data:image/gif;base64,' + b64Data
    ;

    it('returns the img element to allow aborting the image load', function() {
      var img = loadImage(imageUrl, function() {});
      img.should.be.instanceOf(Object);
      img.should.respondTo('onload');
      img.should.respondTo('onerror');
      img.nodeName.toLowerCase().should.equal('img');
    });

    it('loads image url', function(done) {
      loadImage(imageUrl, function(img) {
        done();
        img.width.should.equal(80);
        img.height.should.equal(60);
      }).should.be.ok;
    });

    it('returns image loading error to callback', function(done) {
      loadImage('404', function(img) {
        done();
        img.should.be.instanceOf(window.Event);
        img.type.should.equal('error');
      }).should.be.ok;
    });

  });
});