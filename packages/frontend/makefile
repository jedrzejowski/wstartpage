clean:
	rm -rf node_modules dist

node_modules:
	npm ci --no-optional

build:
	npm run build

VOLUME_IMG:=../../volume/img
VOLUME_DASHBOARD:=../../volume/dashboard

dist/manifest.json: chrome-manifest.json
	cat chrome-manifest.json  \
	| jq '.name = ${shell jq .name package.json}' - \
	| jq '.version = ${shell jq .version package.json | sed s/-/./g}' - \
	| jq '.version_name = ${shell jq .version package.json | sed s/-/./g}' - \
	| jq '.author = ${shell jq .author package.json}' - \
	| jq '.description = ${shell jq .description package.json}' - \
	> dist/manifest.json

pack_zip=pack-${shell jq .version package.json -r}.zip
pack:
	#[ -f "${pack_zip}" ] && echo "plik ${pack_zip} instnieje" && exit 1

	$(eval TMP := $(shell mktemp -d)/startpage-${shell jq .version package.json})

	mkdir -p ${TMP}
	cp -r dist/* ${TMP}
	tree ${TMP}
	#zip -r pack-${shell jq .version package.json}.zip dist \
#		${VOLUME_IMG}

	#./node_modules/.bin/crx3
		#dist/

