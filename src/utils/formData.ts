//Функция для формирования данных из формы заказа
export default function formData(e: React.FormEvent<HTMLFormElement>) {
  const form = e.currentTarget;
  const formData = new FormData(form);

  return {
    phone: formData.get('phone') as string,
    address: formData.get('address') as string,
  };
}
