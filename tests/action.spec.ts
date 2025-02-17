import { describe, expect, it } from '@jest/globals';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const actionPath = path.join(__dirname, '..', 'action.yml');
const actionContent = fs.readFileSync(actionPath, 'utf8');

const action = yaml.load(actionContent) as ActionMetadata;

const inputs = [
    'source_repository',
    'source_ref',
    'source_username',
    'source_token',
    'source_host',
    'target_repository',
    'target_username',
    'target_token',
    'target_host',
];

describe('action.yml', () => {
    it('defines all inputs', () => {
        expect.hasAssertions();

        inputs.forEach((input) => {
            expect(action.inputs[input]).toBeDefined();
        });
    });

    it('is a composite action', () => {
        expect.assertions(1);
        expect(action.runs.using).toBe('composite');
    });

    describe('on push', () => {
        it('implements conditional', () => {
            expect.assertions(1);
            expect(action.runs.steps[0].if).toContain("github.event_name == 'push'");
        });

        it('uses safe bash session', () => {
            expect.assertions(1);
            expect(action.runs.steps[0].shell).toContain('bash -eux {0}');
        });

        it('clones source repository at designated reference', async () => {
            expect.assertions(1);
            expect(action.runs.steps[0].run).toContain('git clone --branch');
        });

        it('pushes to target repository with --force switch', async () => {
            expect.assertions(1);
            expect(action.runs.steps[0].run).toContain('git push --force');
        });
    });

    describe('on delete', () => {
        it('implements conditional', () => {
            expect.assertions(1);
            expect(action.runs.steps[1].if).toContain("github.event_name == 'delete'");
        });

        it('uses safe bash session', () => {
            expect.assertions(1);
            expect(action.runs.steps[1].shell).toContain('bash -eux {0}');
        });

        it('clones source repository at default branch', async () => {
            expect.assertions(2);

            expect(action.runs.steps[1].run).toContain('git clone');
            expect(action.runs.steps[1].run).not.toContain('--branch');
        });

        it('deletes object from the target repository with --force', async () => {
            expect.assertions(1);
            expect(action.runs.steps[1].run).toContain('git push --delete');
        });
    });
});
