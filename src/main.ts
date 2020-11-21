import * as core from '@actions/core';
import * as github from '@actions/github';
import { KubevalResultStatus, KubevalRunner } from './kubeval';
import { CheckReporter } from './reporter';

async function run() {
  try {
    const octokit = github.getOctokit(core.getInput('github_token', { required: true }));
    const kubeval = new KubevalRunner();

    const reporter = new CheckReporter(octokit, github.context);

    const result = await kubeval.run({
      files: core.getInput('files') || '.',
      k8sVersion: core.getInput('k8s_version') || 'master',
      strict: Boolean(core.getInput('strict')),
      ignoreMissingSchemas: Boolean(core.getInput('ignore_missing_schemas')),
      additionalSchemas: core.getInput('additional_schemas') || ''
    });

    core.info('Generaintg report');
    const reportUrl = await reporter.create(result);

    if (result.status === KubevalResultStatus.FAIL) {
      core.setFailed(`Kubeval Failed with errors. See results: ${reportUrl}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
