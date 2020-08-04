const identity = (x) => x;

/**
 * Create the descriptor that sets the value to storage, and gets the
 * value from storage.
 *
 * @param storage               Target window storage
 * @param name                  Name of item in storage
 * @param serializer            Function to serialize value, defaults to (x) => x
 * @param deserializer          Function to deserialize value, defaults to (x) => x
 */
function createDescriptor (storage, name, serializer = identity, deserializer = identity) {
  return {
    get () {
      return deserializer (storage.getItem (name));
    },

    set (value) {
      if (value === null || value === undefined) {
        storage.removeItem (name);
      }
      else {
        storage.setItem (name, serializer (value));
      }

      return value;
    }
  }
}

/**
 * Factory method for create the decorator that targets a specific storage.
 *
 * @param storage           Target window storage.
 * @returns                 A decorator function.
 */
export default function createDecoratorFor (storage) {
  return function (options, name, descriptor) {
    if (descriptor) {
      return createDescriptor (storage, name);
    }
    else {
      return function (target, name) {
        let isStringOption = (typeof options === 'string');

        if (isStringOption) {
          return createDescriptor (storage, options);
        }
        else {
          const { name: targetName, serialize, deserialize } = options;
          return createDescriptor (storage, targetName || name, serialize, deserialize);
        }
      }
    }
  }
}
