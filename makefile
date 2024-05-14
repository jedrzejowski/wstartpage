
IMAGE_VERSION=0.0.19
IMAGE_NAME?=ajedrzejowski/wstartpage

image-build:
	docker build . --pull \
		--tag ${IMAGE_NAME}:${IMAGE_VERSION} \
		--tag ${IMAGE_NAME}:latest

image-push:
	docker push ${IMAGE_NAME}:${IMAGE_VERSION}
	docker push ${IMAGE_NAME}:latest
