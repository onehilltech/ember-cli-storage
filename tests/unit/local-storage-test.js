import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { local } from '@onehilltech/ember-cli-storage';

module('@local', function(hooks) {
  setupTest (hooks);

  hooks.beforeEach(() => {
    window.localStorage.clear ();
  });

  // Replace this with your real tests.
  test ('it exists', function (assert) {
    assert.ok (local);
  });

  test ('it uses the name of the property', function (assert) {
    class TestClass {
      @local name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';

    assert.equal ('John Doe', window.localStorage.getItem ('name'));
    assert.equal ('John Doe', testClass.name);
  });

  test ('it uses the name provided to the decorator function', function (assert) {
    class TestClass {
      @local ('custom') name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';

    assert.equal ('John Doe', window.localStorage.getItem ('custom'));
    assert.equal ('John Doe', testClass.name);
  });

  test ('it uses the name option', function (assert) {
    class TestClass {
      @local ({ name: 'custom'}) name;
    }

    let testClass = new TestClass ();
    testClass.name = 'John Doe';

    assert.equal ('John Doe', window.localStorage.getItem ('custom'));
    assert.equal ('John Doe', testClass.name);
  });

  test ('it uses the custom serialize and deserialize functions', function (assert) {
    class TestClass {
      @local ({ serialize: JSON.stringify, deserialize: JSON.parse }) object;
    }

    let testClass = new TestClass ();
    testClass.object = {a: 1, b: 2};

    assert.equal (JSON.stringify({a: 1, b: 2}), window.localStorage.getItem ('object'));
    assert.deepEqual ({a: 1, b: 2}, testClass.object);
  });
});
