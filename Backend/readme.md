# Virtual Lip Backend

For running locally with Unix like environment, run 

> git clone https://github.com/VirtualLip/virtual_lip_backend.git

> cd virtual_lip_backend
 
> sudo apt-get update
 
> sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y
 
> npm install
 
> npm run start

For running on Docker container, run

> git clone https://github.com/VirtualLip/virtual_lip_backend.git

> cd virtual_lip_backend

> docker build . -t virtual_lip_backend

> docker run -it --name virtual_lip_backend -p 2020:80 virtual_lip_backend

The container will run at [http://192.168.99.100:2020](http://192.168.99.100:2020) for Windows.

As for Unix like environment, it will run at [http://localhost:2020](http://localhost:2020).