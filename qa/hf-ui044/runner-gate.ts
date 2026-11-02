/**
 * Exact authorization fence for the synthetic UI06-B FullStack fixture.
 * Repo, Windows hosted runner, first attempt and branch must all match.
 * This is not permission to dispatch Actions or deploy Vercel.
 */
export type FreshRunnerEnvironment = {
  [name: string]: string | undefined;
  GITHUB_ACTIONS?: string;
  GITHUB_REPOSITORY?: string;
  RUNNER_OS?: string;
  GITHUB_RUN_ATTEMPT?: string;
  GITHUB_REF?: string;
  GITHUB_EVENT_NAME?: string;
  RUNNER_ENVIRONMENT?: string;
  HF_UI044_PUSH_GUARD?: string;
};

export const FULLSTACK_REPOSITORY = 'HidroFlorestaStartup/HidroFlorestas-FullStack';
export const UI06_B_SYNTHETIC_REFS = Object.freeze([
  'refs/heads/codex/hf-ui044-close-20261101',
  'refs/heads/fix/hf-ui044-ui06-b-residual-20261101',
] as const);

export function isApprovedFreshWindowsRunner(env: FreshRunnerEnvironment): boolean {
  return env.GITHUB_ACTIONS === 'true' &&
    env.GITHUB_REPOSITORY === FULLSTACK_REPOSITORY &&
    env.RUNNER_OS === 'Windows' &&
    env.GITHUB_RUN_ATTEMPT === '1' &&
    env.GITHUB_EVENT_NAME === 'push' &&
    env.RUNNER_ENVIRONMENT === 'github-hosted' &&
    env.HF_UI044_PUSH_GUARD === 'PASS' &&
    UI06_B_SYNTHETIC_REFS.some(ref => ref === env.GITHUB_REF);
}
