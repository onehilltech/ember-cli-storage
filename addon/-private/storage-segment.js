import Ember from 'ember';
import Storage from './storage';

let StorageSegment = Storage.extend ({
  /// Length of the storage, set as undefined so it become dynamic.
  length: undefined,

  /// Name of the storage segment.
  name: null,

  /// Regular expression for matching items with the name.
  _regexp: null,

  init () {
    this._super (...arguments);
    this._initRegExp ();
  },

  segment (name) {
    let segmentName = this._computeKey (name);
    let storage = this.get ('storage');

    return StorageSegment.create ({name: segmentName, storage: storage});
  },

  setUnknownProperty (name) {
    if (name === 'length') { throw new Ember.EmberError ('length property is read-only'); }
    this._super (...arguments);
  },

  unknownProperty (name) {
    return name !== 'length' ? this._super (...arguments) : this._computeLength ();
  },

  /**
   * Iterate over each item in storage that belongs to this name.
   *
   * @param f
   * @param context
   */
  forEach (f, context) {
    let storage = this.get ('storage');
    let name = this.get ('name');
    let _regexp = this.get ('_regexp');

    if (Ember.isNone (context)) {
      context = this;
    }

    for (let i = 0, len = storage.length; i < len; ++ i) {
      let key = storage.key (i);

      if (_regexp.test (key)) {
        let value = storage.getItem (key);

        // Remove the name from the key since we assume the caller knows
        // they are iterating over elements in the name storage.
        key = key.slice (name.length + 1);

        f.call (context, value, key);
      }
    }
  },

  _computeKey (name) {
    return `${this.get ('name')}_${name}`;
  },

  _computeLength () {
    let length = 0;

    this.forEach (() => {++ length});

    return length;
  },

  _initRegExp () {
    let name = this.get ('name');
    let parts = name.split ('.');
    let pattern = `^${parts.join ('\\.')}`;

    this.set ('_regexp', new RegExp (pattern));
  }
});

export default StorageSegment;
