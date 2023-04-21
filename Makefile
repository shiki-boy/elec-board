bash:
	@docker-compose exec backend bash

shell:
	@docker-compose exec backend bash -c "python manage.py shell_plus"

#backup:
#	@docker-compose exec postgres bash -c "export PGPASSWORD=$(POSTGRES_PASSWORD) && pg_dump -d $(POSTGRES_DB) -U $(POSTGRES_USER) > /tmp/$(FILE_NAME)" && docker cp peak-delivery_postgres_1:/tmp/$(FILE_NAME) .

dbshell:
	@docker-compose exec backend bash -c "python manage.py dbshell"

makemigrations:
	@docker-compose exec backend bash -c "python manage.py makemigrations"

makedatamigrations:
	@docker-compose exec backend bash -c "python manage.py makemigrations --empty $(app)"

migrate:
	@docker-compose exec backend bash -c "python manage.py migrate"

install_docker:
	@sh get-docker.sh
	@sudo apt-get install -y docker-compose

resetdb:
	@echo "Creating an empty database"
	@docker-compose rm -sf postgres
	@docker-compose up -d postgres

create_superuser:
	@docker-compose exec backend bash -c "python manage.py createsuperuser"

test:
	@docker-compose exec backend bash -c "python manage.py test"
