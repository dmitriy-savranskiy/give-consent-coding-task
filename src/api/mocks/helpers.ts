const IS_TEST_ENV = process.env.NODE_ENV === 'test';

export function saveToSessionStorage(key: string, value: unknown): void {
  const json = JSON.stringify(value);

  sessionStorage.setItem(key, json);
}

export function getFromSessionStorage<T>(key: string, fallback?: T): T | null {
  if (IS_TEST_ENV) {
    return fallback || null;
  }

  const json = sessionStorage.getItem(key);

  if (!json) {
    return null;
  }

  return JSON.parse(json);
}

export function getUniqueId(): string {
  const sessionStorageKey = 'http-mock-unique-id';
  const lastId = sessionStorage.getItem(sessionStorageKey) || '0';
  const newId = parseInt(lastId) + 1;

  sessionStorage.setItem(sessionStorageKey, String(newId));

  return String(newId);
}

export function delay(delay: number): number {
  return IS_TEST_ENV ? 0 : delay;
}
