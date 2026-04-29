import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 500,
  duration: '5m',
};

export default function () {
  const res = http.get('https://fakestoreapi.com/products');

  check(res, {
    'status é 200': (r) => r.status === 200,
    'tempo < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}