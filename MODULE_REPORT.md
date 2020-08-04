## Module Report
### Unknown Global

**Global**: `Ember.EmberError`

**Location**: `addon/-private/storage-segment.js` at line 27

```js

  setUnknownProperty (name) {
    if (name === 'length') { throw new Ember.EmberError ('length property is read-only'); }
    return this._super (...arguments);
  },
```
