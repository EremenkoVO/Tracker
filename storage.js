import SQLite from 'react-native-sqlite-storage';

function errorCB(err) {
  console.log('SQL Error: ' + err);
}

function successCB() {
  console.log('SQL executed fine');
}

function openCB() {
  console.log('Database OPENED');
}

const db = SQLite.openDatabase(
  'Tracker.db',
  '1.0',
  'Tracker Database',
  200000,
  openCB,
  errorCB,
);
let globalSetTrackers = null;

/**
 * Создание таблицы
 */
export async function createTable() {
  await db.transaction(tx => {
    tx.executeSql(
      'create table if not exists trackers (id integer primary key autoincrement, name text, date text);',
      null,
    );
  });
}

/**
 * Получение всех данных
 * @param {function} setTrackers - callback
 */
export async function getTrackers(setTrackers) {
  await db.transaction(async tx => {
    await tx.executeSql(
      'select * from trackers',
      null,
      async (_, result) => {
        console.log(`Таблица данных: ${JSON.stringify(result.rows.raw())}`);
        globalSetTrackers = setTrackers;
        await setTrackers(result.rows.raw());
      },
      async (_, error) => {
        await console.log(`Somebody error: ${JSON.stringify(error)}`);
      },
    );
  });
}

/**
 * Создание трекера
 * @param {string} name
 * @param {string} date
 */
export async function createTracker(name, date) {
  await db.transaction(async tx => {
    await tx.executeSql('insert into trackers (name, date) values (?,?)', [
      name.toString(),
      date.toString(),
    ]);
    if (globalSetTrackers !== null) await getTrackers(globalSetTrackers);
  });
}

/**
 * Удаление трекера
 * @param {number} id
 */
export async function deleteTracker(id, setTrackers) {
  await db.transaction(tx => {
    tx.executeSql('delete from trackers where id = ?', [id]);
    getTrackers(setTrackers);
  });
}
