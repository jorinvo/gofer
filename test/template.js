define(function() {
  describe( '.template', function() {
    it('caches single items', function() {
      gofer.template('test1', 'name: <%= name %>');
    });
    it('returns render-functions of single items', function() {
      gofer.template('test1', 'name: <%= name %>');
      gofer.template('test1');
    });

    it('renders single items', function() {
      gofer.template('test1', {name: 'gofer'}).should.equal('name: gofer');
    });
    it('caches a hash of items', function() {
      gofer.template({
        test1: 'name: <%= name %>',
        test2: 'adress: <%= adress %>'
      });
      gofer.template('test2', {adress: 'da hood'}).should.equal('adress: da hood');
    });
    it('renders a hash of items', function() {
      gofer.template({
        test1: 'name: <%= name %>',
        test2: 'adress: <%= adress %>'
      });
      var res = gofer.template({
        test1: { name: 'gofer' },
        test2: { adress: 'da hood' }
      });
      res.test1.should.equal('name: gofer');
      res.test2.should.equal('adress: da hood');
    });
    it('caches and renders a single item with one call', function() {
      gofer.template('test', '<%= word %>', { word: 'cool' }).should.equal('cool');
      gofer.template('test', { word: 'even better' }).should.equal('even better');
    });
  });
});