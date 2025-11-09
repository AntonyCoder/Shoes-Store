import { apiUrl } from './apiConfig';

//Тип опций запроса
export interface IApiOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

//Функция для выполнения запросов к API
async function apiClient<T>(endpoint: string, options: IApiOptions = {}): Promise<T> {
  const url = `${apiUrl}/${endpoint}`;

  try {
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data: T = await response.json();
      return data;
    }

    return {} as T;
  } catch (error) {
    console.error('Ошибка при запросе:', error);
    throw error;
  }
}

export default apiClient;
