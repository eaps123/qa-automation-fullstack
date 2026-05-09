import dev from './dev';
import qa from './qa';
import prd from './prd';

const environment = process.env.ENV || 'dev';

const environments = {
  dev,
  qa,
  prd,
};

export default environments[environment as keyof typeof environments];