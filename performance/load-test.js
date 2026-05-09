import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { apiConfig } from './config.js';

const successRate = new Rate('success_rate');
const productLatency = new Trend('product_latency');

export const options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 500 }, // requisito
    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
    success_rate: ['rate>0.99'],
  },
};

const baseURL = apiConfig.api.fakeStore;

function randomProductId() {
  return Math.floor(Math.random() * 20) + 1;
}

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const productsRes = http.get(`${baseURL}/products`, params);
  const productsCheck = check(productsRes, {
    'GET /products - 200': (r) => r.status === 200,
    'GET /products - has data': (r) => Array.isArray(r.json()) && r.json().length > 0,
  });

  successRate.add(productsCheck);
  productLatency.add(productsRes.timings.duration);


  const productId = randomProductId();
  const productRes = http.get(`${baseURL}/products/${productId}`, params);
  const productCheck = check(productRes, {
    'GET /product/:id - 200': (r) => r.status === 200,
  });

  successRate.add(productCheck);
  productLatency.add(productRes.timings.duration);

  const payload = JSON.stringify({
    userId: Math.floor(Math.random() * 10),
    products: [
      {
        productId,
        quantity: Math.floor(Math.random() * 3) + 1,
      },
    ],
  });

  const cartRes = http.post(`${baseURL}/carts`, payload, params);

  const cartCheck = check(cartRes, {
    'POST /carts - success': (r) => [200, 201].includes(r.status),
  });

  successRate.add(cartCheck);

  sleep(1);
}