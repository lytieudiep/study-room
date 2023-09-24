.PHONY: build
build:
	git pull
	npx next build

.PHONY: deploy
deploy: build
	sudo service study-room restart
	sudo service study-room status
	sudo service study-room-chat restart
	sudo service study-room-chat status