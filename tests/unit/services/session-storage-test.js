import { moduleFor, test } from 'ember-qunit';

moduleFor('service:session-storage', 'Unit | Service | session storage', {
  beforeEach () {
    window.sessionStorage.clear ();
  }
});

// Replace this with your real tests.
test ('it exists', function(assert) {
  let service = this.subject ();
  assert.ok (service);
});

test ('is supported', function (assert) {
  let service = this.subject ();
  assert.equal (service.get ('isSupported'), true);
});

test ('set value', function (assert) {
  let service = this.subject ();
  let value = service.set ('token', 'ssshhh');
  assert.equal (value, 'ssshhh');
  assert.equal (window.sessionStorage.getItem ('token'), '\"ssshhh\"');
});

test ('get value', function (assert) {
  let service = this.subject ();

  service.set ('token', 'ssshhh');
  assert.equal (service.get ('token'), 'ssshhh');

  service.set ('preferences', {key1: 'value1', key2: 3, key3: 67.8});
  assert.deepEqual (service.get ('preferences'), {key1: 'value1', key2: 3, key3: 67.8});
});

test ('set multiple values', function (assert) {
  let service = this.subject ();

  service.setProperties ({key1: 'value1', key2: 3, key3: 67.8});

  assert.equal (window.sessionStorage.getItem ('key1'), '\"value1\"');
  assert.equal (window.sessionStorage.getItem ('key2'), 3);
  assert.equal (window.sessionStorage.getItem ('key3'), 67.8);
});

test ('length', function (assert) {
  let service = this.subject ();

  service.setProperties ({key1: 'value1', key2: 'value2', key3: 'value3'});
  assert.equal (service.get ('length'), 3);
});

test ('remove value', function (assert) {
  let service = this.subject ();
  service.set ('preferences', 'no');

  let value = service.set ('preferences');

  assert.equal (value, undefined);
  assert.equal (service.get ('preferences'), undefined);
});

test ('clear', function (assert) {
  let service = this.subject ();

  service.setProperties ({token: 'ssshhh', preferences: {color: 'red'}});
  assert.equal (service.get ('length'), 2);

  service.clear ();

  assert.equal (undefined, service.get ('token'));
  assert.equal (undefined, service.get ('preferences'));
  assert.equal (0, service.get ('length'));
});


test ('segment: exists', function (assert) {
  let storage = this.subject ().segment ('a');

  assert.ok (storage);
  assert.equal (storage.get ('name'), 'a');
});

test ('segment: set value', function (assert) {
  let storage = this.subject ().segment ('a');
  storage.set ('message', 'hello');

  assert.equal (window.sessionStorage.getItem ('a_message'), '\"hello\"');
  assert.equal (storage.get ('message'), 'hello');
});

test ('segment: length', function (assert) {
  let service = this.subject ();
  let storage = service.segment ('a');

  service.set ('message', 'hello');
  storage.set ('message', 'hello');

  assert.equal (service.get ('length'), 2);
  assert.equal (storage.get ('length'), 1);
});

test ('segment: remove value', function (assert) {
  let storage = this.subject ().segment ('a');
  storage.set ('message', 'hello');
  storage.set ('message');

  assert.equal (storage.get ('message'), undefined);
});

test ('segment: clear', function (assert) {
  let service = this.subject ();
  let storage = service.segment ('a');

  service.set ('message', 'hello');
  storage.set ('message', 'hello');

  storage.clear ();

  assert.equal (service.get ('length'), 1);
  assert.equal (storage.get ('length'), 0);
});

test ('segment: segment: exists', function (assert) {
  let storage = this.subject ().segment ('a').segment ('b');
  assert.ok (storage);
});