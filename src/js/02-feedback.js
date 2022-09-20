import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/feedback-form.css';

const STORAGE_KEY = 'feedback-msg';

const refs = {
  form: document.querySelector('.js-feedback-form'),
  textarea: document.querySelector('.js-feedback-form  textarea'),
  input: document.querySelector('.js-feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 200));

populateTextarea();

/*
 * - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму
 */
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log('Отправляем форму');
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

/*
 * - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle
 */
function onTextareaInput(evt) {
  const message = evt.target.value;

  localStorage.setItem(STORAGE_KEY, message);
}

/*
 * - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM
 */
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    refs.textarea.value = savedMessage;
  }
}

// Домой
// сделать так чтобы сохраняло не только сообщение но и имя, и все в одном обьекте

// populateTextarea();

// const formData = {};

// refs.form.addEventListener('input', e => {
//   formData[e.target.name] = e.target.value;
//   localStorage.setItem('formData', JSON.stringify(formData));

//   console.log('formData', formData);
// });

// refs.form.addEventListener('submit', e => {
//   e.preventDefault();
//   e.currentTarget.reset();
//   localStorage.removeItem('formData');
// });

// function populateTextarea() {
//   const savedData = JSON.parse(localStorage.getItem('formData'));

//   if (savedData) {
//     refs.textarea.value = savedData.message;
//     refs.input.value = savedData.name;
//   }
// }
