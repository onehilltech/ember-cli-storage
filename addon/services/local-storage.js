import StorageService from '../-private/storage-service';
import RootStorage from '../-private/root-storage';

export default StorageService.extend ({
  storage: RootStorage.create ({storage: window.localStorage})
});
