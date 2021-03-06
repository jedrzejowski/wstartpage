
PKG_VERSION=0.0.15
DOCKER_TAG?=ajedrzejowski/wstartpage

docker: docker-build docker-push

docker-build:
	docker build . --pull \
		--tag ${DOCKER_TAG}:${PKG_VERSION} \
		--tag ${DOCKER_TAG}:latest

docker-push:
	docker push ${DOCKER_TAG}:${PKG_VERSION}
	docker push ${DOCKER_TAG}:latest

