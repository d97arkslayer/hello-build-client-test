import { toast } from 'react-toastify';

export const post = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    },
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
