try {
    process.env.DB_URL = `postgres://kevin:a123@db:5432/lipstick`;
} catch (err) {
    console.log(err, '\n\nError configuring the project. Have you set the environment veriables?');
}