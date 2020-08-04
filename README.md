# ember-cli-storage

A simple and easy way to interact with local and session storage.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install @onehilltech/ember-cli-storage
```


Usage
------------------------------------------------------------------------------

The add-on uses decorators to set/get items to/from local or session storage. For 
local storage, use `@local`. For session storage, use `@session`. The parameters
for either decorator is the same.

```javascript
class MyClass {
  @session
  mySessionProperty;
  
  @local
  myLocalProperty;
 
  /////////
  // advanced usage
  /////////

  // store the value under 'aDifferentName'
  @local ('aDifferentName') name;
  @local ({name: 'aDifferentName'}) anotherName;

  // use the serialize/deserialize method to customize storing/retrieving
  @local ({serialize: JSON.stringify, deserialize: JSON.parse}) object;
}
```

Happy Coding!

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [Apache 2.0](LICENSE.md).
