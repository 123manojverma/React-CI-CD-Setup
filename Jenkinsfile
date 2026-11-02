pipeline {
    agent any 
    stages {
        stage ('Build') {
            agent {
                docker {
                    image 'node:24-alpine'
                    reuseNode true // Reuse the node for the next stages
                }
            }

            steps {
                sh '''
                    ls -l
                    node --version
                    npm --version
                    npm install 
                    npm run build
                    ls -l
                '''
            }
        }
    }
}