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
                    echo "Node version:"
                    node --version

                    echo "NPM version:"
                    npm --version

                    echo "Configuring npm cache..."
                    export HOME=/tmp
                    export npm_config_cache=/tmp/npm-cache

                    echo "Installing dependencies..."
                    npm ci

                    echo "Building React application..."
                    npm run build

                    echo "Build completed successfully!"
                    ls -l
                '''
            }
        }
    }
}