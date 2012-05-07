define([], function() {
  describe('.settings()', function() {
    it('returns settingsHash', function() {
      gofer.settings().should.have.keys([
        'container',
        'mode',
        'postUrl',
        'template',
        'uploadDir',
        'data',
        'success'
      ]);
    });
  });
});