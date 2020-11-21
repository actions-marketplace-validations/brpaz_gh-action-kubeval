import { KubevalResult, KubevalResultStatus } from './kubeval';
import { GitHub } from '@actions/github/lib/utils';
import { Context } from '@actions/github/lib/context';
export class CheckReporter {
  private octokit: InstanceType<typeof GitHub>;

  private context: Context;

  constructor(octokit: InstanceType<typeof GitHub>, context: Context) {
    this.octokit = octokit;
    this.context = context;
  }

  async create(kubevalResult: KubevalResult): Promise<string> {
    let conclusion;
    if (kubevalResult.status === KubevalResultStatus.SUCCESS) {
      conclusion = 'success' as const;
    } else {
      conclusion = 'failure' as const;
    }

    const result = await this.octokit.checks.create({
      head_sha: this.context.payload.pull_request?.head.sha ?? this.context.sha,
      owner: this.context.repo.owner,
      repo: this.context.repo.repo,
      name: 'Kubeval',
      status: 'completed',
      conclusion: conclusion,
      output: {
        title: 'Kubeval Report',
        summary:
          kubevalResult.status == KubevalResultStatus.SUCCESS
            ? ':heavy_check_mark: All tests have passed'
            : ':x: Some tests failed',
        text: kubevalResult.output
      }
    });

    return Promise.resolve(result.data.details_url);
  }
}
