pipeline {
    agent any 
    options {
        skipDefaultCheckout(true)
    }

    environment {
        MY_VAR = 'my value'
        VERCEL_TOKEN=credentials('VERCEL_TOKEN')
    }

    stages {

        stage('Clean up code') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout using SCM') {
            steps {
                checkout scm // Checkout the code
            }
        }

        stage ('Build') {
            agent {
                docker {
                    image 'node:24-alpine'
                    // args '-u root'
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

        stage('Test') {
            agent {
                docker {
                    image 'node:24-alpine'
                    reuseNode true
                }
            }
            
            steps {
                sh '''
                    npm run test
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:24-alpine'
                    args '-u root'
                    reuseNode true
                }
            }

            steps {
                sh '''
                    export HOME=/tmp
                    export npm_config_cache=/tmp/npm-cache

                    npm install -g vercel
                    echo $MY_VAR
                    vercel --prod --token=$VERCEL_TOKEN --confirm --name=cicdproject
                '''
            }
        }
    }
}