import { exec } from '@actions/exec';

export interface KubevalArgs {
  files: string;
  k8sVersion: string;
  strict?: boolean;
  ignoreMissingSchemas?: boolean;
  additionalSchemas?: string;
}

export enum KubevalResultStatus {
  SUCCESS = 1,
  FAIL = 2
}

export interface KubevalResult {
  status: KubevalResultStatus;
  output: string;
}

export class KubevalRunner {
  // runs Kubeval and creates checks based on result.
  async run(cmdArgs: KubevalArgs): Promise<KubevalResult> {
    let output = '';
    const args: string[] = ['--kubernetes-version', `${cmdArgs.k8sVersion}`, '-d', `${cmdArgs.files}`];

    if (cmdArgs.strict) {
      args.push('--strict');
    }

    if (cmdArgs.ignoreMissingSchemas) {
      args.push('--ignore-missing-schemas');
    }

    let status = KubevalResultStatus.SUCCESS;
    try {
      await exec('kubeval', args, {
        listeners: {
          stdout: (data: Buffer) => {
            output += data.toString();
          }
        }
      });
    } catch (error) {
      status = KubevalResultStatus.FAIL;
    }

    return {
      status,
      output
    };
  }
}
