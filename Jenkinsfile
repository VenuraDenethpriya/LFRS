pipeline{
    agent any

    environment {
        PORT = credentials("PORT")
        FRONTEND_URI = credentials("FRONTEND_URI")
        MONGODB_URI = credentials("MONGODB_URI")
        VITE_CLERK_PUBLISHABLE_KEY = credentials("VITE_CLERK_PUBLISHABLE_KEY")
        CLERK_SECRET_KEY = credentials("CLERK_SECRET_KEY")
        RESEND_API_KEY = credentials("RESEND_API_KEY")
        VONAGE_API_KEY = credentials("VONAGE_API_KEY")
        VONAGE_API_SECRET = credentials("VONAGE_API_SECRET")
        VITE_BASE_URL = credentials("VITE_BASE_URL")
        VITE_CLOUDINARY_URL = credentials("VITE_CLOUDINARY_URL")
    }

    stages{
        stage("Checkout"){
            steps{
                checkout scm
            }
        }
        stage("Build Images"){
            steps{
                sh 'docker compose build'
            }
        }
        stage('Security Scan') {
            steps {
                sh 'trivy image lfrs-pipeline-backend:latest'
                sh 'trivy image lfrs-pipeline-frontend:latest'
            }
        }
        stage('Deploy on EC2') {
            steps {
                withCredentials([
                    string(credentialsId: 'PORT', variable: 'PORT'),
                    string(credentialsId: 'FRONTEND_URI', variable: 'FRONTEND_URI'),
                    string(credentialsId: 'MONGODB_URI', variable: 'MONGODB_URI'),
                    string(credentialsId: 'VITE_CLERK_PUBLISHABLE_KEY', variable: 'VITE_CLERK_PUBLISHABLE_KEY'),
                    string(credentialsId: 'CLERK_SECRET_KEY', variable: 'CLERK_SECRET_KEY'),
                    string(credentialsId: 'RESEND_API_KEY', variable: 'RESEND_API_KEY'),
                    string(credentialsId: 'VONAGE_API_KEY', variable: 'VONAGE_API_KEY'),
                    string(credentialsId: 'VONAGE_API_SECRET', variable: 'VONAGE_API_SECRET'),
                    string(credentialsId: 'VITE_BASE_URL', variable: 'VITE_BASE_URL'),
                    string(credentialsId: 'VITE_CLOUDINARY_URL', variable: 'VITE_CLOUDINARY_URL')
                ]) {
                    sh 'docker compose up -d'
                }
            }
        }
    }
}