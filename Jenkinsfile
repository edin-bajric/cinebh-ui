pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = 'ahmedhamdo/cinebh-frontend:latest'
        SERVER_PORT = '81'
        DOCKER_NETWORK = 'cinebh-network'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Cloning frontend repository"
                git branch: 'dev',
                    url: 'https://github.com/edin-bajric/cinebh-ui.git',
                    credentialsId: 'gh-token'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building frontend Docker image"
                sh """
                docker build -t ${FRONTEND_IMAGE} .
                """
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing frontend Docker image to Docker Hub"
                withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                    sh "docker push ${FRONTEND_IMAGE}"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying frontend container on port ${SERVER_PORT}"
                sh """
                docker rm -f cinebh-frontend || true
                docker run -d --name cinebh-frontend \
                    --network ${DOCKER_NETWORK} \
                    -p ${SERVER_PORT}:80 \
                    ${FRONTEND_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo "Frontend build, push, and deployment completed successfully!"
        }
        failure {
            echo "Frontend build or deployment failed. Check the logs for more details."
        }
    }
}


