// @ts-check

// `output` вместо `<div role="status">`: семантический тег несёт ту же роль
// для скринридеров, и правило jsx-a11y(prefer-tag-over-role) просит именно его.
// Классы Bootstrap на отображение не влияют, spinner-border работает на любом
// блочном элементе.
const Loader = () => (
  <output className="spinner-border text-success d-block">
    <span className="visually-hidden">Loading...</span>
  </output>
);

export default Loader;
