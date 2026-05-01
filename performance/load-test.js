import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const res = http.get('https://fakestoreapi.com/products');

  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  console.log(`
    ✔ p95: ${data.metrics.http_req_duration.p(95)}
    ✔ errors: ${data.metrics.http_req_failed.rate}
    `);

  sleep(1);
}