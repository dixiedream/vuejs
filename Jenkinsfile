pipeline {
  agent any
  options {
    buildDiscarder(logRotator(numToKeepStr: '5'))
  }
  parameters {
    string(name: 'IMAGE_REPO_NAME', defaultValue: '', description: 'The base image name')
    string(name: 'LATEST_BUILD_TAG', defaultValue: 'latest', description: 'The tag for the latest version')
    booleanParam(name: 'PUSH_DOCKER_IMAGES', defaultValue: true, description: 'Set to false to disable image pushes')
    string(name: 'VITE_API_URL', defaultValue: '/api/v1', description: 'The api base path')
  }
  environment {
    REGISTRY_CREDS = credentials('')
    BRANCH_NAME = sh(returnStdout: true, script: 'git rev-parse --abbrev-ref HEAD').trim()
    COMMIT_TAG = sh(returnStdout: true, script: 'git rev-parse HEAD').trim().take(7)
    BUILD_IMAGE_REPO_TAG = "${params.IMAGE_REPO_NAME}:${env.BUILD_TAG}"
    PKG_VERSION = "${readJSON(file: 'package.json').version}"
  }
  stages {
    stage ('Start') {
      steps {
        slackSend (color: 'warning', message: "Job started ${env.JOB_NAME} $PKG_VERSION (<${env.BUILD_URL}|Open>)")
      }
    }

    stage('Build production image') {
      steps {
        sh '''docker build \
          --build-arg VITE_API_URL=$VITE_API_URL \
          -t $BUILD_IMAGE_REPO_TAG .
          '''
        sh "docker tag $BUILD_IMAGE_REPO_TAG ${IMAGE_REPO_NAME}:$COMMIT_TAG"
        sh "docker tag $BUILD_IMAGE_REPO_TAG ${IMAGE_REPO_NAME}:$PKG_VERSION"
        sh "docker tag $BUILD_IMAGE_REPO_TAG ${IMAGE_REPO_NAME}:${LATEST_BUILD_TAG}"
        sh "docker tag $BUILD_IMAGE_REPO_TAG ${IMAGE_REPO_NAME}:$BRANCH_NAME-latest"
      }
      post{
          success{
              echo "====++++Built++++===="
          }
      }
    }

    stage('Push') {
      environment {
        REGISTRY_NAME = ''
      }
      when {
        expression {
          return params.PUSH_DOCKER_IMAGES
        }
      }
      steps {
        sh "echo $REGISTRY_CREDS_PSW | docker login -u $REGISTRY_CREDS_USR --password-stdin $REGISTRY_NAME"
        sh "docker push $BUILD_IMAGE_REPO_TAG"
        sh "docker push ${IMAGE_REPO_NAME}:$COMMIT_TAG"
        sh "docker push ${IMAGE_REPO_NAME}:$PKG_VERSION"
        sh "docker push ${IMAGE_REPO_NAME}:${LATEST_BUILD_TAG}"
        sh "docker push ${IMAGE_REPO_NAME}:$BRANCH_NAME-latest"
      }
      post{
          always {
            sh "docker logout REGISTRY_NAME"
          }
          success{
              echo "====++++Pushed++++===="
          }
      }
    }
  }
  post{
      always{
          echo "====++++Job done++++===="
      }
      success{
        slackSend (color: 'good', message: "Job done ${env.JOB_NAME} $PKG_VERSION (<${env.BUILD_URL}|Open>)")
      }
      failure{
        slackSend (color: 'danger', message: "Job failed ${env.JOB_NAME} $PKG_VERSION (<${env.BUILD_URL}|Open>)")
      }
  }
}