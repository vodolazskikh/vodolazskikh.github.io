const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const password = document.querySelector("#password");
const sex = document.getElementsByName("sex");

const getSex = () => {
  console.log(sex[0].checked);
  if (sex[0].checked) {
    return "мужской";
  }
  if (sex[1].checked) {
    return "женский";
  }
  return "неопределенный";
};
const submit = () => {
  if (!firstName.value || !lastName.value || !password.value) {
    alert("Заполните все поля!");
  } else {
    alert(
      `Пользователь: имя - ${firstName.value}, фамилия - ${
        lastName.value
      }, пол - ${getSex()}, пароль - ${password.value}`
    );
  }
};
