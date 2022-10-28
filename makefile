
PKG_VERSION=0.0.16
DOCKER_TAG?=ajedrzejowski/wstartpage

docker: docker-build docker-push

docker-build:
	docker build . --pull \
		--tag ${DOCKER_TAG}:${PKG_VERSION} \
		--tag ${DOCKER_TAG}:latest

docker-push:
	docker push ${DOCKER_TAG}:${PKG_VERSION}
	docker push ${DOCKER_TAG}:latest

docker-test:
	docker run --rm \
		-e WSTARTPAGE_DASHBOARD_ROOT=/volume/dashboards \
		-v $(shell pwd)/volume/dashboards:/volume/dashboards \
    -e WSTARTPAGE_IMAGE_ROOT=/volume/img \
		-v $(shell pwd)/volume/images:/volume/img \
		-p 3002:8080 \
		${DOCKER_TAG}:latest
