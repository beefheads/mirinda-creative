# Стартер

## Если не работает команда `gulp` после `npm i`
Проверь, что установлен webp-converter@2.2.3
`npm install webp-converter@2.2.3 --save-dev`

## Папки
1. artefacts — Все что может быть нужно для проекта, но не хочется сохранять в открытый гит. В гитигноре прописа такая папка. Я использую ее для скринов макета, доступов, ссылок на доки, которые прилетают во время проекта, списка требований к сдаче проекта, идей

## Как запустить?

`gulp` — дев сервер.

`gulp convertImages` — оптимизирует картинки и помещает их в папку convert-images
*не лучший плагин, хочу его выпилить, потому что после него картинки весят больше. Лучше добавлю тут гайд про webp, tinypng и sqoosh*

`prod`

`prodCopyImages`

## Функционал сборки

### HTML
- Шаблоны html (`gulp-file-include`), *хочется перейти на нунчаки*
- Решение проблемы кеширования файлов (`gulp-version-number`) *об этом вроде мне не надо знать, можно в коменте самой таски написать*
- Автоматическая замена тегов img на picture для использования webp (`gulp-webp-html-nosvg`)
*надо бы выпилить из сборки, потому что я этим не пользуюсь. Кажется надежнее самому написать разметку*

### CSS
- Препроцессор SASS (`gulp-sass`, `sass`). *Глянуть бы че можно убрать и как законфижить, чтобы префиксы норм были*
- Минимизация CSS (`gulp-clean-css`, `gulp-rename`) *и проверить бы работу этого*
- Автопрефиксы для CSS (`gulp-autoprefixer`)
- Объединение одинаковых медиа-запросов в один (`gulp-group-css-media-queries`) *проверить*
- Возможность использования webp изображений указанных в теге background-img (`gulp-webpcss`) *проверить что это*

### JavaScript
- Синтаксис ES6 для JavaScript (`webpack-stream`, `webpack`) *покопаться бы в доке, чтоб понять как законфижить.Иногда хочтсся стили прям при подключении библиотеки в js из node modules затянуть*

### Медиа
- Оптимизация и сжатие изображений (`gulp-imagemin`) *выпилить*
- Конвертация в webp (`gulp-webp`) *выпилить*

## Что еще можно сделать
- Общие плагины объединить в один файл
- Создание svg-спрайта
