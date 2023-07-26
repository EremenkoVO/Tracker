import morph from './morph';

const calculateDaysPassed = dateString => {
  if (!dateString) return NaN;
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const inputDate = new Date(year, month, day);
  const currentDate = new Date();

  if (inputDate > currentDate)
    return `Трекер начнется ${dayjs(inputDate).format('DD.MM.YYYY')}`;

  const timeDiff = Math.abs(currentDate.getTime() - inputDate.getTime());
  const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24) - 1);

  return `${morph(daysPassed, [
    'Прошел',
    'Прошли',
    'Прошло',
  ])} ${daysPassed} ${morph(daysPassed, ['день', 'дня', 'дней'])}`;
};

export default calculateDaysPassed;
