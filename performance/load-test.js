import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,          // reduzido para CI (500 em local é ok, mas CI vai sofrer)
  duration: '1m',

  thresholds: {
    http_req_failed: ['rate<0.01'],        // menos de 1% de erro
    http_req_duration: ['p(95)<500'],      // 95% abaixo de 500ms
  },
};

export default function () {
  const res = http.get('https://fakestoreapi.com/products');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  sleep(1);
}