import * as styles from './space folder/render.module.css';

export function render() {
  const el = document.createElement('div');
  el.className = styles.text;
  document.getElementsByTagName('body')[0].appendChild(el);
  el.innerHTML = 'hello, world';
}
