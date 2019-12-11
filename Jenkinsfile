#!/usr/bin/env groovy

pipeline {
  agent {
    node {
      label 'nodejs'
    }
  }
  stages {
    stage('Install Packages') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
        publishHTML (target: [
          allowMissing: false,
          alwaysLinkToLastBuild: false,
          keepAll: true,
          reportDir: 'coverage',
          reportFiles: 'index.html',
          reportName: "Nyc Coverage Report"
        ])
      }
      post {
        always {
          junit "test-results.xml"
        }
      }
    }
  }
}
