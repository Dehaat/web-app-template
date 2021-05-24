const shell = require('shelljs')
const chalk = require('chalk')
const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')

const packageJson = require('../../package.json')

const addXMark = () => {
  process.stdout.write(chalk.red(' ✘'))
}

function addCheckMark() {
  process.stdout.write(chalk.green(' ✓'))
}

const reportError = error => {
  if (error) {
    process.stdout.write('\n\n')
    addXMark(() => process.stderr.write(chalk.red(` ${error}\n`)))
    process.exit(1)
  }
}

const editPackageName = () => {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nEnter package name: ')
    process.stdin.resume()
    process.stdin.once('data', name => {
      const answer = name.toString().trim().toLowerCase() || ''
      packageJson['name'] = answer
      resolve()
    })
  })
}

const editPackageDescription = () => {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nEnter description: ')
    process.stdin.resume()
    process.stdin.once('data', desciption => {
      const answer = desciption.toString().trim() || ''
      packageJson['description'] = answer
      resolve()
    })
  })
}

const editPackageAuthor = () => {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nEnter author: ')
    process.stdin.resume()
    process.stdin.once('data', author => {
      const answer = author.toString().trim() || ''
      packageJson['author'] = answer
      resolve()
    })
  })
}

const editPackageJSON = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await editPackageName()
      await editPackageDescription()
      await editPackageAuthor()
      delete packageJson['scripts']['setup']
      delete packageJson['scripts']['presetup']
      fs.writeFileSync('./package.json', JSON.stringify(packageJson))
      shell.exec('npm run prettify -- package.json', { silent: true })
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const cleanCurrentGitRepository = () => {
  return new Promise((resolve, reject) => {
    try {
      shell.rm('-rf', '.git/')
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const initGit = () => {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nInitialising git... ')
    exec('git init', err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const addGitRemote = () => {
  return new Promise((resolve, reject) => {
    process.stdout.write('\nEnter the git remote url: ')
    process.stdin.resume()
    process.stdin.once('data', remoteUrl => {
      const answer = remoteUrl.toString().trim() || ''

      exec(`git remote add origin ${answer}`, err => {
        if (err) {
          reject(new Error(err))
        }
        resolve()
      })
    })
  })
}

const installDependencies = async () => {
  return new Promise((resolve, reject) => {
    process.stdout.write(
      '\nInstalling dependencies... (This might take a while)',
    )
    exec('npm install', (err, stdout) => {
      if (err) {
        reject(err)
      }
      resolve(stdout)
    })
  })
}

const endProcess = () => {
  process.stdout.write(chalk.blue('\n\nDone!\n'))
  process.exit(0)
}

const setUpGitWorkFlow = () => {
  const githubPath = path.join(process.cwd(), '.github')
  const workflowPath = path.join(githubPath, 'workflows')
  const sampleWorkflowPath = path.join(process.cwd(), 'internals/git-workflow')
  shell.mkdir(githubPath)
  shell.mkdir(workflowPath)
  shell.cp('-R', `${sampleWorkflowPath}/*`, workflowPath)
  shell.rm('-rf', sampleWorkflowPath)
}

(async () => {
  process.stdout.write(chalk.blue('\nConfiguring your project...\n'))
  try {
    await cleanCurrentGitRepository()
    await initGit()
    await addGitRemote()
    addCheckMark(process.stdout.write(chalk.green(`\nGit repository setup `)))
    await editPackageJSON()
    addCheckMark(
      process.stdout.write(chalk.green(`\nPackage json initialised `)),
    )
    await installDependencies()
    addCheckMark(process.stdout.write(chalk.green(`\nDependencies installed `)))
    setUpGitWorkFlow()
  } catch (error) {
    reportError(error)
  }
  endProcess()
})()
