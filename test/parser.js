define(function() {
  describe('parser', function() {

    var plain = '<p>this is plain html</p>'
      , standaloneIn = { name: 'input', object: new gofer.tags.input({}) }
      , standaloneOut = function() { return '<input type="text" value="" id="'+gofer.id.last()+'" class="gofer">'; }
      , wrapperStart = { name: 'note', object: new gofer.tags.note({}) }
      , wrapped = '<p>some note</p>'
      , wrapperEnd = { name: 'note', isClosingTag: true }
      ;

    it('fires the parser event', function(done) {
      gofer.hook('parser', function() {
        done();
      });
      gofer.parser([], 'edit');
    });

    it('fires the edit event', function(done) {
      gofer.hook('parser', function() {
        done();
      });
      gofer.parser([], 'edit');
    });

    it('fires the view event', function(done) {
      gofer.hook('parser', function() {
        done();
      });
      gofer.parser([], 'view');
    });


    it('supports plain html', function(done) {
      gofer.parser([plain], 'edit').should.equal(plain);
      done();
    });

    it('supports standalone tags', function(done) {
      gofer.parser([standaloneIn], 'edit').should.equal(standaloneOut());
      done();
    });

    it('supports wrapper tags', function(done) {
      gofer.parser([wrapperStart, wrapped, wrapperEnd], 'edit').should.equal(wrapped);
      done();
    });

    it('supports more than one tag', function(done) {
      gofer.parser([plain, standaloneIn, wrapperStart, wrapped, wrapperEnd], 'edit')
        .should.equal(plain + standaloneOut() + wrapped);
      done();
    })

  });
});