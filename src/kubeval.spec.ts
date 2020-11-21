import * as exec from '@actions/exec';

import { KubevalResultStatus, KubevalRunner } from './kubeval';

describe('Kubeval Runner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('It calls Kubeval with correct arguments', async () => {
    const spy = jest.spyOn(exec, 'exec').mockImplementation(() => Promise.resolve(0));

    const kubeval = new KubevalRunner();

    const result = await kubeval.run({
      files: './manifests',
      k8sVersion: 'master',
      strict: true,
      ignoreMissingSchemas: true
    });

    expect(result.status).toBe(KubevalResultStatus.SUCCESS);
    expect(spy).toHaveBeenLastCalledWith(
      'kubeval',
      ['--kubernetes-version', 'master', '-d', './manifests', '--strict', '--ignore-missing-schemas'],
      expect.any(Object)
    );
  });

  it('It handles Kubeval errors', async () => {
    const spy = jest.spyOn(exec, 'exec').mockImplementation(() => Promise.reject(-1));

    const kubeval = new KubevalRunner();

    const result = await kubeval.run({
      files: './manifests',
      k8sVersion: 'master'
    });

    expect(result.status).toBe(KubevalResultStatus.FAIL);
  });
});
