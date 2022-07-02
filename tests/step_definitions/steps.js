const {I} = inject();
// Add in your custom step files

Given('я нахожусь на странице {string}', (page) => {
  switch (page) {
    case 'Главная':
      return I.amOnPage('/');
    case 'Регистрация':
      return I.amOnPage('/register');
    case 'Логин':
      return I.amOnPage('/login');
    case 'Статистика':
      return I.amOnPage('/statistic');
    case 'Поиск':
      return I.amOnPage('/search');
    case 'Трансляции':
      return I.amOnPage('/live');
    default:
      return I.amOnPage('/');
  }
});
