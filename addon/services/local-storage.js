import StorageService from '../-private/service';
import Storage from '../-private/storage';

export default StorageService.extend ({
  storage: Storage.create ({ storage: window.localStorage })
});
