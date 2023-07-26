export default {
  save: 'Сохранить',
  selectSingle: 'Выбрать дату',
  selectMultiple: 'Выбрать даты',
  selectRange: 'Выбрать период',
  notAccordingToDateFormat: inputFormat =>
    `Формат даты должен быть ${inputFormat}`,
  mustBeHigherThan: date => `Должно быть позже ${date}`,
  mustBeLowerThan: date => `Должно быть раньше ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Должно быть между ${startDate} - ${endDate}`,
  dateIsDisabled: 'Недопустимая дата',
  previous: 'Предыдущая',
  next: 'Следующая',
  typeInDate: 'Формат даты',
  pickDateFromCalendar: 'Выбрать дату из календаря',
  close: 'Закрыть',
};
