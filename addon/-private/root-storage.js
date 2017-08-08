import Ember from 'ember';
import Storage from './storage';
import NamespaceStorage from './namespace-storage';

export default Storage.extend ({
  length: Ember.computed.alias ('storage.length'),

  bindTo (namespace) {
    return NamespaceStorage.create ({namespace: namespace, storage: this.get ('storage')});
  },

  _computeKey (name) {
    return name;
  }
});
