import Service from '@ember/service';

export default Service.extend ({
  storage: null,

  clear () {
    return this.storage.clear ();
  },

  setUnknownProperty (name, value) {
    let ret = this.storage.setUnknownProperty (name, value);

    this.notifyPropertyChange (name);
    this.notifyPropertyChange ('length');

    return ret;
  },

  unknownProperty (name) {
    return this.storage.unknownProperty (name);
  },

  forEach (f, target) {
    return this.storage.forEach (f, target);
  }
});