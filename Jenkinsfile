pipeline {
    agent any

    stages {
        stage('Checkout') {

            steps {
                git(
                    url: 'https://github.com/SalmaHazal/Dockerized_Alumni.git',
                    branch: 'main',
                    credentialsId: 'github_credentials'
                )
            }
        }

        stage('Stop and Remove Previous Containers') {
            steps {
                script {
                    sh 'docker-compose down --remove-orphans'
                }
            }
        }
        
        stage('Build New Images') {
            steps {
                script {
                    sh 'docker-compose build'
                }
            }
        }

        stage('Start Containers') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Optional: Clean up unused Docker images, networks, volumes after the build
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment succeeded!'
        }

        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
