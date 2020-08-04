import Route from '@ember/routing/route';
import { local } from '@onehilltech/ember-cli-storage';

export default class IndexRoute extends Route {
  @local
  name;

  @local('primary-color')
  color;

  @local({name: 'access_token', serialize: JSON.stringify, deserialize: JSON.parse})
  accessToken;

  setupController () {
    super.setupController (...arguments);

    this.name = 'Barack Obama';
    this.color = 'red';
    this.accessToken = { access_token: 1, refresh_token: 2};
  }
}
