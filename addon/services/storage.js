import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class StorageService extends Service {
  @service ('local-storage')
  local;

  @service ('session-storage')
  session;
}
