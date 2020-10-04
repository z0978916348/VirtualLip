# VirtualLip-react-native
Utilize deep learning models to recognize face and detect lip position to find out the color and what brand of lipstick the person in the photo wears.

**Front-end Design**: React Native and Native Base

**Back-end Design**: PostgreSQL, Heroku, AWS

Demo Link: https://drive.google.com/file/d/1h7ojgBN3M4DHqhehQ7ZoYJWrB5uM_zYt/view
![image](https://github.com/VirtualLip/VirtualLip/blob/master/img/demo.PNG)
## Completeness Feature
1. Sign in/out (AWS Amplify)
Provide an login user interface for user
2. History (PostgreSQL)
Show users’ search history
3. Analyze (Facial Recognition Deep Learning Model)
Analyze the color of user’s lip, then show the lipstick that match the color

## Front-end Design
under the *Frontend* file

1. run <code>npm install</code>
2. run <code>npm run build</code>
3. run <code>npm start</code>

## Back-end Design
under the *Backend* file

For running locally with Unix like environment, 
1. run <code>sudo apt-get update</code>
2. run <code>sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y</code>
3. run <code>npm install</code>
4. run <code>npm run start</code>

For running on Docker container, run

<code>docker build . -t virtual_lip_backend</code>

<code>docker run -it --name virtual_lip_backend -p 2020:80 virtual_lip_backend</code>

The container will run at [http://192.168.99.100:2020](http://192.168.99.100:2020) for Windows.

As for Unix like environment, it will run at [http://localhost:2020](http://localhost:2020).

## Contributor
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/KelvinYang0320"><img src="https://avatars0.githubusercontent.com/u/49781698?s=400&u=f26fb2eb309f55c20eedde1de1727d176d8fabc2&v=4" width="100px;" alt=""/><br /><sub><b>KelvinYang0320</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/z0978916348"><img src="https://avatars3.githubusercontent.com/u/52773674?s=400&u=b860f2ba1def76e126f0b6a487b4831625f6ec12&v=4" width="100px;" alt=""/><br /><sub><b>Chuang-Kai-Yu</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/orgs/VirtualLip/people/FrankCCCCC"><img src="https://avatars3.githubusercontent.com/u/43928493?s=400&v=4" width="100px;" alt=""/><br /><sub><b>FrankCCCCC</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/kkeevin123456"><img src="https://avatars3.githubusercontent.com/u/55287979?s=400&v=4" width="100px;" alt=""/><br /><sub><b>kkeevin123456</b></sub></a><br /></td>
  </tr>
</table>
