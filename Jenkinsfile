/* pipeline ���� ���� */
def DOCKER_IMAGE_NAME = "sktellecom/ms-test"   // �����ϴ� Docker image �̸�
def DOCKER_IMAGE_TAGS = "view-api"  // �����ϴ� Docker image �±�
def NAMESPACE = "ms-test"
def VERSION = "${env.BUILD_NUMBER}"
def DATE = new Date();
  
podTemplate(label: 'builder',
            containers: [
                containerTemplate(name: 'node', image: 'node:14', command: 'cat', ttyEnabled: true),
                containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
                containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.15.3', command: 'cat', ttyEnabled: true)
            ],
            volumes: [
                hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
                hostPathVolume(hostPath: '/tmp/default.conf', mountPath: '/nginx/default.conf')
            ]) {
    node('builder') {
        stage('Checkout') {
             checkout scm   // github�κ��� �ҽ� �ٿ�
        }
        stage('Build') {
            container('node') {
                // build node
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Docker build') {
            container('docker') {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-id',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD')]) {
                        sh "docker build -t ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAGS} ."
                        sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                        sh "docker push ${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAGS}"
                }
            }
        }
        stage('Run kubectl') {
            container('kubectl') {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-id',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD')]) {
                        /* namespace ���翩�� Ȯ��. ������� namespace ���� */
                        sh "kubectl get ns ${NAMESPACE}|| kubectl create ns ${NAMESPACE}"

                        /* secret ���翩�� Ȯ��. ������� secret ���� */
                        sh """
                            kubectl get secret my-secret -n ${NAMESPACE} || \
                            kubectl create secret docker-registry my-secret \
                            --docker-server=https://index.docker.io/v1/ \
                            --docker-username=${USERNAME} \
                            --docker-password=${PASSWORD} \
                            -n ${NAMESPACE}
                        """
                        /* k8s-deployment.yaml �� env���� �������ش�(DATE��). ������ ������ ������ ������ ����� ������ ���� �������� �ʴ´�. */
                        /*sh "echo ${VERSION}"
                        sh "sed -i.bak 's#VERSION_STRING#${VERSION}#' ./k8s/k8s-deployment.yaml"*/
                        sh "echo ${DATE}"
                        sh "sed -i.bak 's#DATE_STRING#${DATE}#' ./k8s/k8s-deployment.yaml"

                        /* yaml���Ϸ� ������ �����Ѵ� */
                        sh "kubectl apply -f ./k8s/k8s-deployment.yaml -n ${NAMESPACE}"
                        sh "kubectl apply -f ./k8s/k8s-service.yaml -n ${NAMESPACE}"
                }
            }
        }
    }
}
