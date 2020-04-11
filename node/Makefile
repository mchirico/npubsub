PROJECT = septapig
NAME = pubsub
TAG = latest


docker-build:
	rm -rf build
	(cd ../angular && ./updateDist.sh)
	docker build --no-cache -t gcr.io/$(PROJECT)/$(NAME):$(TAG) -f Dockerfile .


push:
	docker push gcr.io/$(PROJECT)/$(NAME):$(TAG) 

pull:
	docker pull gcr.io/$(PROJECT)/$(NAME):$(TAG) 


deploy:
	gcloud config set gcloudignore/enabled false --project septapig
	gcloud builds submit --tag gcr.io/septapig/npubsubcloud --project septapig --timeout 35m23s
	gcloud run deploy npubsubcloud --image gcr.io/septapig/npubsubcloud \
              --platform managed --allow-unauthenticated --project septapig \
              --region us-east1 --port 3000 --max-instances 3  --memory 128Mi



run:
	docker run -p 3000:3000 --rm -it -d --name $(NAME) gcr.io/$(PROJECT)/$(NAME):$(TAG) 



runnod:
	docker run -p 3000:3000 --rm -it --name $(NAME) gcr.io/$(PROJECT)/$(NAME):$(TAG) 

stop:
	docker stop $(NAME)

logs:
	docker logs $(NAME)



