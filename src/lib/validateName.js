// @ts-check

// Правило одно для списков и для задач, а тексты сообщений те же, что задавал
// setLocale у yup: они видны пользователю и менять их вместе с библиотекой
// валидации незачем.
const validateName = (value, existing) => {
  const name = value.trim();

  if (name.length === 0) {
    return "Required!";
  }
  if (name.length < 3) {
    return "Too small! Min 3 symbols";
  }
  if (name.length > 20) {
    return "Too long! Max 20 symbols";
  }

  return existing.includes(name) ? `${name} already exists` : null;
};

export default validateName;
