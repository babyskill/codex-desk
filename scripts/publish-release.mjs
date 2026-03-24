import { spawn } from 'node:child_process'

const args = process.argv.slice(2)

function fail(message) {
  console.error(message)
  process.exit(1)
}

function readEnv(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    fail(`Missing required env ${name}.`)
  }

  return value
}

if (args.length === 0) {
  fail('Usage: node scripts/publish-release.mjs --mac dmg zip')
}

const owner = readEnv('GH_OWNER')
const repo = readEnv('GH_REPO')
readEnv('GH_TOKEN')

const electronBuilderArgs = [
  'electron-builder',
  ...args,
  '--publish',
  'always',
  '-c.publish.provider=github',
  `-c.publish.owner=${owner}`,
  `-c.publish.repo=${repo}`,
]

const child = spawn('npx', electronBuilderArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})

