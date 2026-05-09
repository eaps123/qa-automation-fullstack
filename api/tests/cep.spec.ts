import { test, expect } from '@playwright/test';
import { CepService } from '../services/CepService';
import { CepSchema } from '../schemas/cep.schema';

test.describe('CEP API', () => {

    let cepService: CepService;

    test.beforeEach(async () => {
        cepService = new CepService();
    });

    test('GET - deve buscar CEP válido (contract test)', async () => {

        const response = await cepService.getCep('01001000');
        expect(response.status()).toBe(200);
        const body = await response.json();
        const parsed = CepSchema.safeParse(body);
        expect(parsed.success).toBe(true);
        if (!parsed.success) {
            console.log(parsed.error.format());
        }
    });

    test('GET - CEP inválido', async () => {
        const response = await cepService.getCep('000000000');
        expect([400, 404]).toContain(response.status());
    });
});