import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { session } from '@onehilltech/ember-cli-storage';

module('@session', function(hooks) {
  setupTest (hooks);

  hooks.beforeEach(() => {
    window.sessionStorage.clear ();
  });

  // Replace this with your real tests.
  test ('it exists', function (assert) {
    assert.ok (session);
  });

  test ('it uses the name of the property', function (assert) {
    class TestClass {
      @session name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';

    assert.equal ('John Doe', window.sessionStorage.getItem ('name'), 'The storage check failed');
    assert.equal ('John Doe', testClass.name, 'The property getter failed');
  });

  test ('it clears a value', function (assert) {
    class TestClass {
      @session name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';
    assert.equal ('John Doe', testClass.name, 'The property getter failed');

    testClass.name = null;

    assert.equal (null, testClass.name, 'The property getter failed');
    assert.equal (null, window.sessionStorage.getItem ('name'), 'The storage check failed');
  });

  test ('it uses the name provided to the decorator function', function (assert) {
    class TestClass {
      @session ('custom') name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';

    assert.equal ('John Doe', window.sessionStorage.getItem ('custom'));
    assert.equal ('John Doe', testClass.name);
  });

  test ('it uses the name option', function (assert) {
    class TestClass {
      @session ({ name: 'custom'}) name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';

    assert.equal ('John Doe', testClass.name);
    assert.equal ('John Doe', window.sessionStorage.getItem ('custom'));
  });

  test ('it uses the custom serialize and deserialize functions', function (assert) {
    class TestClass {
      @session ({ serialize: JSON.stringify, deserialize: JSON.parse }) object;
    }

    let testClass = new TestClass ();
    testClass.object = {a: 1, b: 2};

    assert.equal (JSON.stringify({a: 1, b: 2}), window.sessionStorage.getItem ('object'));
    assert.deepEqual ({a: 1, b: 2}, testClass.object);
  });
});
