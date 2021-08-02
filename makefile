
VERSION=0.0.1
DOCKER_TAG=ajedrzejowski/wstartpage

docker-build:
	docker build . \
		--tag ${DOCKER_TAG}:${VERSION} \
		--tag ${DOCKER_TAG}:latest

docker-push:
	docker push ${DOCKER_TAG}:${VERSION}
	docker push ${DOCKER_TAG}:latest

