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
        VITE_CLERK_PUBLISHABLE_KEY = credentials("VITE_CLERK_PUBLISHABLE_KEY")
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
        stage("Security Scan"){
            steps{
                sh 'trivy image backend:latest'
                sh 'trivy image frontend:latet'
            }
        }
        stage("Deploy on EC2"){
            steps{
                sh 'docker compose up -d'
            }
        }
    }
}