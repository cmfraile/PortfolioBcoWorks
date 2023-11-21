clear;
echo 'Nombre del usuario que va a hospedar la base de datos';
read var1;
docker rm -f DB;
docker volume prune;
docker network prune;
rm -R /home/$var1/bicoartsVOL;

docker network create --subnet 172.10.0.0/24 --gateway 172.10.0.1 bicoarts;
docker run -d --name DB -p 27017:27017 --ip=172.10.0.13 --network=bicoarts --restart=always \
-v /home/$var1/bicoartsVOL/database:/data/db \
-e "MONGO_INITDB_ROOT_USERNAME=userDB" -e "MONGO_INITDB_ROOT_PASSWORD=passDB" \
mongo:latest;
mkdir /home/$var1/bicoartsVOL/storage;
chown -R $var1 /home/$var1/bicoartsVOL;
docker exec -it DB bash;


#mongosh -u bicoarts -p bicoarts;
#use bicoDB;
#db.createUser({user:'bicoarts',pwd:'bicoarts',roles:['readWrite']});
