up:
	sudo docker-compose up -d

down:
	sudo docker-compose down

up-proq:
	sudo docker-compose -f docker-compose.yml -f docker-compose.proq.yml up -d