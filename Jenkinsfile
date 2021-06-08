pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Cloning Git') {
            steps {
                git 'https://github.com/L3g3Nd4Ry-iwnl/Exam_alteration_helper.git'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Create .env') {
            steps {
                sh '''touch .env
                    printf "PORT = 3000\\\\nMYSQL_URL = \\\'localhost\\\'\\\\nMYSQL_USERNAME = \\\'root\\\'\\\\nMYSQL_PASSWORD = \\\'hello_mysql\\\'\\\\nMYSQL_DATABASE_ACC = \\\'faculty_db\\\'\\\\nADMIN_USP = \\\'admin_amrita\\\'\\\\nADMIN_HASH = \\\'\\x242b\\x2410\\x24XSGNYxtoh1G5uyw.NQlHruV/6N6p73TF6jsKn329U1uOoWGTIQ10y\\\'\\\\nDEAN_USP = \\\'dean_amrita\\\'\\\\nDEAN_HASH =  \\\'\\x242b\\x2410\\x24mLmAQ5KW/nLwFkA0dYVExe3weriG/WLwvWmAnnSA6gysljYuP00lG\\\'\\\\nNODE_ENV = \\\'development\\\'\\\\nSESS_NAME = \\\'sid\\\'\\\\nSESS_LIFETIME = 1000 * 60 * 60 * 1\\\\nSESS_SECRET = \\\'LlK5_Z5_W3VjIv\\\'\\\\nQUOTE_OTD = \\\'The greatest glory in living lies not in never falling, but in rising every time we fall.\\\'\\\\nRESET_PASSWORD_JWT = \\\'R3s3Tp455W0rD\\\'\\\\nGMAIL_ID = \\\'examalterationhelper@gmail.com\\\'\\\\nGMAIL_PASSWORD = \\\'exam_1234!!\\\'\\\\nGMAIL_HOST = \\\'smtp.gmail.com\\\'\\\\nGMAIL_PORT = 465" > .env'''
                echo "Done creating .env"
            }
        }
        stage('Test running the software') {
            steps {
                sh 'npm run dev'
            }
        } 
    }
}
