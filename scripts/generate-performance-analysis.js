const fs = require('fs');

const k6Path = 'reports/k6-summary.json';

if (!fs.existsSync(k6Path)) {
    console.log('⚠️ K6 summary não encontrado');
    process.exit(0);
}

const k6 = JSON.parse(
    fs.readFileSync(k6Path, 'utf8')
);

const avg =
    k6.metrics.http_req_duration.values.avg;

const p95 =
    k6.metrics.http_req_duration.values['p(95)'];

const failRate =
    k6.metrics.http_req_failed.values.rate;

const vus =
    k6.metrics.vus_max?.values?.max || 0;

const analysis = [];

// STATUS GERAL

let status = 'HEALTHY';

if (p95 >= 800 || failRate >= 0.01) {
    status = 'WARNING';
}

if (p95 >= 1200 || failRate >= 0.05) {
    status = 'CRITICAL';
}

// LATÊNCIA

if (p95 < 800) {
    analysis.push(
        `P95 estável (${p95.toFixed(0)}ms) durante execução`
    );
} else if (p95 < 1200) {
    analysis.push(
        `Latência P95 elevada (${p95.toFixed(0)}ms)`
    );
} else {
    analysis.push(
        `Latência crítica detectada (${p95.toFixed(0)}ms)`
    );
}

// TAXA DE ERRO

if (failRate === 0) {
    analysis.push(
        'Nenhuma falha HTTP detectada'
    );
} else if (failRate < 0.05) {
    analysis.push(
        `Taxa de erro moderada (${(failRate * 100).toFixed(2)}%)`
    );
} else {
    analysis.push(
        `Taxa de erro crítica (${(failRate * 100).toFixed(2)}%)`
    );
}

// TEMPO MÉDIO

if (avg < 500) {
    analysis.push(
        `Tempo médio saudável (${avg.toFixed(0)}ms)`
    );
} else {
    analysis.push(
        `Tempo médio acima do esperado (${avg.toFixed(0)}ms)`
    );
}

// CARGA

analysis.push(
    `Teste executado com pico de ${vus} usuários virtuais`
);

// RESULTADO FINAL

const output = {
    generatedAt: new Date().toISOString(),
    status,
    metrics: {
        avg,
        p95,
        failRate,
        vus,
    },
    analysis,
};

fs.writeFileSync(
    'reports/performance-analysis.json',
    JSON.stringify(output, null, 2)
);

console.log(
    '✅ Performance analysis gerado com sucesso'
);