import Ember from 'ember';

export default Ember.Service.extend ({
  storage: null,

  /// The storage service is not supported.
  isNotSupported: Ember.computed.none ('storage'),

  /// The storage service is supported.
  isSupported: Ember.computed.not ('isNotSupported'),

  /// Get the length of the storage.
  length: Ember.computed.alias ('storage.length'),

  /**
   * Clear the storage.
   */
  clear () {
    this.get ('storage').clear ();
  },

  setUnknownProperty (name, value) {
    let ret = this.get ('storage').set (name, value);

    this.notifyPropertyChange (name);
    this.notifyPropertyChange ('length');

    return ret;
  },

  unknownProperty (name) {
    return this.get ('storage').get (name);
  },

  segment (name) {
    return this.get ('storage').segment (name);
  }
});
