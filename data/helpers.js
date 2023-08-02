import {database} from './database';

const trackers = database.get('trackers');

export const observeTrackers = () => trackers.query().observe();

export const saveTracker = async (name, date) => {
  await database.write(async () => {
    trackers.create(tracker => {
      tracker.name = name;
      tracker.date = date;
    });
  });
};

export const deleteTracker = async id => {
  await database.write(async () => {
    (await trackers.query().fetch()).map(tracker => {
      if (tracker.id === id) {
        tracker.destroyPermanently();
      }
    });
  });
};
