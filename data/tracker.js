import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';

export default class Tracker extends Model {
  static table = 'trackers';

  @field('name') name;
  @field('date') date;
  @field('type') type;
}
