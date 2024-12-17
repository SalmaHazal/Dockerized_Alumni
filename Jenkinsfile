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
                    sh 'docker-compose down --volumes --remove-orphans'
                }
            }
        }

        stage('Remove Previous Docker Images') {
            steps {
                script {
                    // Remove dangling images (if any)
                    sh '''
                    dangling_images=$(docker images -q --filter "dangling=true")
                    if [ ! -z "$dangling_images" ]; then
                        docker rmi $dangling_images
                    else
                        echo "No dangling images to remove."
                    fi
                    '''
                    
                    // Remove all other images (if any)
                    sh '''
                    all_images=$(docker images -q)
                    if [ ! -z "$all_images" ]; then
                        docker rmi $all_images
                    else
                        echo "No images to remove."
                    fi
                    '''
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
