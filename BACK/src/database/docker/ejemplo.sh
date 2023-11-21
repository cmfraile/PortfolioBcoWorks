docker volume prune;
docker network prune;
docker network create --subnet 172.10.0.0/24 --gateway 172.10.0.1 portfolio;

docker run -id --name FRONT -p 80:80 -p 443:443 --ip=172.10.0.11 --network=portfolio \
-v $(pwd)/vol/web:/usr/share/nginx/html:ro \
-v $(pwd)/vol/cert:/etc/ssl/webcert \
-v $(pwd)/vol/config:/etc/nginx/conf.d \
nginx;

docker run -id --name BACK -p 13017:13017 --ip=172.10.0.12 --network=portfolio \
-v $(pwd)/vol/storage:/storage \
-v $(pwd)/vol/backend:/backend \
node;

docker run -id --name DB -p 27017:27017 --ip=172.10.0.13 --network=portfolio --restart=always \
-v $(pwd)/vol/database:/data/db \
-e "MONGO_INITDB_ROOT_USERNAME=userDB" -e "MONGO_INITDB_ROOT_PASSWORD=passDB" \
mongo:latest;