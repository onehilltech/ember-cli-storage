import Ember from 'ember';
import Storage from './storage';

let NamespaceStorage = Storage.extend ({
  /// Length of the storage, set as undefined so it become dynamic.
  length: undefined,

  /// The namespace for the storage.
  namespace: null,

  /// Regular expression for matching items with the namespace.
  _regexp: null,

  init () {
    this._super (...arguments);
    this._initRegExp ();
  },

  bindTo (name) {
    let namespace = this._computeKey (name);
    let storage = this.get ('storage');

    return NamespaceStorage.create ({namespace: namespace, storage: storage});
  },

  setUnknownProperty (name) {
    if (name === 'length') { throw new Ember.EmberError ('length property is read-only'); }
    this._super (...arguments);
  },

  unknownProperty (name) {
    return name !== 'length' ? this._super (...arguments) : this._computeLength ();
  },

  /**
   * Iterate over each item in storage that belongs to this namespace.
   *
   * @param f
   * @param context
   */
  forEach (f, context) {
    let storage = this.get ('storage');
    let namespace = this.get ('namespace');
    let _regexp = this.get ('_regexp');

    if (Ember.isNone (context)) {
      context = this;
    }

    for (let i = 0, len = storage.length; i < len; ++ i) {
      let key = storage.key (i);

      if (_regexp.test (key)) {
        let value = storage.getItem (key);

        // Remove the namespace from the key since we assume the caller knows
        // they are iterating over elements in the namespace storage.
        key = key.slice (namespace.length + 1);

        f.call (context, value, key);
      }
    }
  },

  _computeKey (name) {
    return `${this.get ('namespace')}_${name}`;
  },

  _computeLength () {
    let length = 0;

    this.forEach (() => {++ length});

    return length;
  },

  _initRegExp () {
    let namespace = this.get ('namespace');
    let parts = namespace.split ('.');
    let pattern = `^${parts.join ('\\.')}`;

    this.set ('_regexp', new RegExp (pattern));
  }
});

export default NamespaceStorage;
