const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const actionPath = path.join(__dirname, '..', 'action.yml');
const actionContent = fs.readFileSync(actionPath, 'utf8');

describe('action.yml', () => {
    it('clones source repository', async () => {
        expect.assertions(1);
        const action = yaml.load(actionContent);
        expect(action.runs.steps[0].run).toContain('git clone');
    });

    it('pushes to target repository', async () => {
        expect.assertions(1);
        const action = yaml.load(actionContent);
        expect(action.runs.steps[0].run).toContain('git push');
    });
});
