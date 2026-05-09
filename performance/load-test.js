import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import { apiConfig } from './config.js';

const successRate = new Rate('success_rate');
const productsLatency = new Trend('products_latency');
const productDetailsLatency = new Trend('product_details_latency');
const cartsLatency = new Trend('carts_latency');
const baseURL = apiConfig.api.dummy;

export const options = {
  scenarios: {

    products_list: {
      executor: 'constant-vus',
      vus: 300,
      duration: '5m',
      exec: 'getProducts',
    },

    product_details: {
      executor: 'constant-vus',
      vus: 150,
      duration: '5m',
      exec: 'getProductById',
    },

    carts: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
      exec: 'createCart',
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],

    success_rate: ['rate>0.99'],

    products_latency: ['p(95)<700'],
    product_details_latency: ['p(95)<500'],
    carts_latency: ['p(95)<900'],
  },
};

function randomProductId() {
  return Math.floor(Math.random() * 20) + 1;
}

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// =========================
// GET PRODUCTS
// =========================
export function getProducts() {

  const res = http.get(
    `${baseURL}/products`,
    params
  );

  const success = check(res, {
    'GET /products - status 200': (r) => r.status === 200,

    'GET /products - has products': (r) =>
      r.json().products.length > 0,
  });

  successRate.add(success);

  productsLatency.add(
    res.timings.duration
  );

  sleep(1);
}

// =========================
// GET PRODUCT BY ID
// =========================
export function getProductById() {

  const productId = randomProductId();

  const res = http.get(
    `${baseURL}/products/${productId}`,
    params
  );

  const success = check(res, {
    'GET /products/:id - status 200': (r) =>
      r.status === 200,

    'GET /products/:id - valid id': (r) =>
      r.json().id === productId,
  });

  successRate.add(success);

  productDetailsLatency.add(
    res.timings.duration
  );

  sleep(1);
}

// =========================
// CREATE CART
// =========================
export function createCart() {

  const productId = randomProductId();

  const payload = JSON.stringify({
    userId: Math.floor(Math.random() * 10),

    products: [
      {
        productId,
        quantity: Math.floor(Math.random() * 3) + 1,
      },
    ],
  });

  const res = http.post(
    `${baseURL}/carts/add`,
    payload,
    params
  );

  const success = check(res, {
    'POST /carts/add - success': (r) =>
      [200, 201].includes(r.status),
  });

  successRate.add(success);

  cartsLatency.add(
    res.timings.duration
  );

  sleep(1);
}

export function handleSummary(data) {
  return {
    'reports/k6-summary.json': JSON.stringify(data, null, 2),
  };
}