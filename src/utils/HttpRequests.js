import { toast } from 'react-toastify';

export const post = async (url, payload, lang = 'en', token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': lang,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).catch((error) => ({ error: true, ...error }));
  if (response.error) {
    toast('Server Error', { type: 'error' });
    return { error: true };
  }
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  toast(data.error || response.status, { type: 'error' });
  return { error: true, data };
};

export const get = async (url, headers = {}) => {
  const response = await fetch(url, { method: 'GET', headers }).catch((error) => ({ error: true, ...error }));
  if (response.error) {
    toast('Server Error', { type: 'error' });
    return { error: true };
  }
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  toast(data.error || response.status, { type: 'error' });
  return { error: true, data };
};
