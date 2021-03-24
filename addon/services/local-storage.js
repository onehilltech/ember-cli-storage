import StorageService from '../-private/service';

export default StorageService.extend ({
  storage: window.localStorage
});
