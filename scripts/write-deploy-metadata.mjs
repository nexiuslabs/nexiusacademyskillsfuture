import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SHA_PATTERN = /^[0-9a-f]{7,64}$/i;

export const normalizeCommit = (value) => {
  const commit = value?.trim();
  if (!commit || !SHA_PATTERN.test(commit)) {
    throw new Error('Deployment commit must be a 7-64 character hexadecimal Git SHA.');
  }
  return commit.toLowerCase();
};

export const resolveCommit = async ({ env = process.env, root = process.cwd() } = {}) => {
  if (env.COMMIT_REF) return normalizeCommit(env.COMMIT_REF);
  if (env.DEPLOY_COMMIT) return normalizeCommit(env.DEPLOY_COMMIT);

  try {
    return normalizeCommit(await readFile(path.join(root, '_BUILD_COMMIT'), 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  return normalizeCommit(
    execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    }),
  );
};

export const writeDeployMetadata = async ({
  env = process.env,
  root = process.cwd(),
  builtAt = new Date().toISOString(),
} = {}) => {
  const commit = await resolveCommit({ env, root });
  const outputDirectory = path.join(root, 'dist', '.well-known');
  const outputPath = path.join(outputDirectory, 'nexius-deploy.json');
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, `${JSON.stringify({ commit, builtAt })}\n`, 'utf8');
  return { commit, outputPath };
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const result = await writeDeployMetadata();
  console.log(`Wrote deployment metadata for ${result.commit}.`);
}
