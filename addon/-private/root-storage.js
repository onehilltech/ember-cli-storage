import Ember from 'ember';
import Storage from './storage';
import StorageSegment from './storage-segment';

export default Storage.extend ({
  length: Ember.computed.alias ('storage.length'),

  segment (name) {
    return StorageSegment.create ({name: name, storage: this.get ('storage')});
  },

  _computeKey (name) {
    return name;
  }
});
