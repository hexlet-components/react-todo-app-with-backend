import { describe, expect, it } from "vitest";

import validateName from "./validateName.js";

// Правила переехали с yup на свою функцию, и тексты сообщений видит
// пользователь. Проверка нужна на каждую границу: молча разъехавшееся
// сообщение снаружи выглядит как обычная валидация.
describe("validateName", () => {
  it.each([
    ["", "Required!"],
    ["   ", "Required!"],
    ["ab", "Too small! Min 3 symbols"],
    ["a".repeat(21), "Too long! Max 20 symbols"],
  ])("отклоняет %j", (value, message) => {
    expect(validateName(value, [])).toBe(message);
  });

  it("принимает границы 3 и 20", () => {
    expect(validateName("abc", [])).toBeNull();
    expect(validateName("a".repeat(20), [])).toBeNull();
  });

  it("отклоняет уже существующее имя по обрезанному значению", () => {
    expect(validateName("  primary  ", ["primary"])).toBe("primary already exists");
  });
});
