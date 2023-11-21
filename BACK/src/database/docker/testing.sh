docker network create --subnet 172.10.0.0/24 --gateway 172.10.0.1 nginxtest;
docker run -d --name nginx -p 80:80 -p 443:443 --ip 172.10.0.13 --network=nginxtest nginx:latest;
