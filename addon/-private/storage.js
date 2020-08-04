import { isNone } from '@ember/utils';
import EmberObject from '@ember/object';

export default EmberObject.extend ({
  /// The target storage object.
  storage: null,

  /**
   * Clear all items from the storage. If the storage is bound to a namespace, then
   * only items in the namespace are removed from the storage.
   */
  clear () {
    let items = {};
    this.forEach ((value, key) => {items[key] = null; });

    this.setProperties (items);
    this.notifyPropertyChange ('length');
  },

  setUnknownProperty (name, value) {
    let key = this._computeKey (name);
    let storage = this.storage;

    if (isNone (storage)) {
      return value;
    }

    if (isNone (value)) {
      storage.removeItem (key);
    }
    else {
      storage.setItem (key, JSON.stringify (value));
    }

    // Notify the observers that the property has changed, and the length of
    // the storage has changed.
    this.notifyPropertyChange (name);
    this.notifyPropertyChange ('length');

    return value;
  },

  unknownProperty (name) {
    let key = this._computeKey (name);
    let storage = this.storage;

    if (isNone (storage)) {
      return null;
    }

    let value = storage.getItem (key);
    return JSON.parse (value);

  },

  /**
   * Compute the key for the name.
   *
   * @param name
   * @returns {string}
   * @private
   */
  _computeKey (name) {
    return name;
  },

  /**
   * Iterate over each element in the storage.
   *
   * @param f
   * @param target
   */
  forEach (f, target) {
    let storage = this.storage;

    if (isNone (storage)) {
      return;
    }

    if (isNone (target)) {
      target = this;
    }

    for (let i = 0, len = storage.length; i < len; ++ i) {
      let key = storage.key (i);
      let value = storage.getItem (key);

      f.call (target, value, key);
    }
  }
});
